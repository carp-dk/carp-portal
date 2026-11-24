import { StreamPoint } from '../helper';

export type Bucket = 'hour' | 'day';

export type ViewKind = 'map' | 'heartRate' | 'steps' | 'tasks' | 'events' | 'generic';

const typeName = (dataType: string) => dataType.slice(dataType.lastIndexOf('.') + 1);

/**
 * Which view a data type gets. Matched on the type's last segment, so the same view serves
 * every namespace that uses that name (e.g. dk.cachet.carp.movesense.hr and ….movisens.hr).
 */
export const getViewKind = (dataType: string): ViewKind => {
  switch (typeName(dataType)) {
    case 'geolocation': // carp.core
    case 'location': // CAMS context package; extends Geolocation
    case 'currentlocation': // CAMS
      return 'map';
    case 'heartrate': // carp.core, field "bpm"
    case 'hr': // Movesense / Movisens, field "hr"
      return 'heartRate';
    case 'stepcount': // carp.core / CAMS pedometer
    case 'stepevent': // CAMS pedometer
      return 'steps';
    case 'completedtask': // carp.core
    case 'completedapptask': // CAMS
      return 'tasks';
    case 'screenevent':
    case 'applifecycleevent':
    case 'activity':
      return 'events';
    default:
      return 'generic';
  }
};

/** Floors to the start of the bucket (local time). */
export const bucketStart = (d: Date, bucket: Bucket) => {
  const copy = new Date(d);
  if (bucket === 'day') copy.setHours(0, 0, 0, 0);
  else copy.setMinutes(0, 0, 0);
  return copy;
};

const nextBucket = (d: Date, bucket: Bucket) => {
  const copy = new Date(d);
  if (bucket === 'day') copy.setDate(copy.getDate() + 1);
  else copy.setHours(copy.getHours() + 1);
  return copy;
};

/** Every bucket start from `from` to `to`, so empty hours/days still get a bar. */
export const bucketStarts = (from: Date, to: Date, bucket: Bucket): Date[] => {
  const starts: Date[] = [];
  for (let d = bucketStart(from, bucket); d <= to; d = nextBucket(d, bucket)) {
    starts.push(d);
  }
  return starts;
};

/** Sums `valueOf(point)` per bucket, aligned with `bucketStarts(from, to, bucket)`. */
export const sumPerBucket = <T extends { time: Date }>(
  items: T[],
  from: Date,
  to: Date,
  bucket: Bucket,
  valueOf: (item: T) => number,
): { start: Date; value: number }[] => {
  const sums = new Map<number, number>();
  items.forEach((item) => {
    const key = bucketStart(item.time, bucket).getTime();
    sums.set(key, (sums.get(key) ?? 0) + valueOf(item));
  });
  return bucketStarts(from, to, bucket).map((start) => ({
    start,
    value: sums.get(start.getTime()) ?? 0,
  }));
};

const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);

/** Points that have a latitude and longitude, in time order. */
export const getLocations = (points: StreamPoint[]) =>
  points.flatMap((p) => {
    const lat = num(p.data.latitude);
    const lng = num(p.data.longitude);
    return lat === undefined || lng === undefined ? [] : [{ time: p.time, lat, lng }];
  });

/**
 * Heart rate readings: "bpm" in carp.core, "hr" in the Movesense/Movisens packages, and a list of
 * { hr } samples in the Polar package. Polar samples carry no time of their own, so they take
 * their measurement's time.
 */
export const getHeartRates = (points: StreamPoint[]) =>
  points.flatMap((p) => {
    const samples = Array.isArray(p.data.samples)
      ? (p.data.samples as Record<string, unknown>[])
      : [p.data];
    return samples.flatMap((sample) => {
      const bpm = num(sample?.bpm) ?? num(sample?.hr);
      // 0 is what some sensors send without skin contact; it isn't a heart rate.
      return bpm === undefined || bpm <= 0 ? [] : [{ time: p.time, bpm }];
    });
  });

export const getStats = (values: number[]) => {
  if (values.length === 0) return undefined;
  const sum = values.reduce((a, b) => a + b, 0);
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    mean: sum / values.length,
  };
};

/**
 * Phone pedometers report the running total since the last reboot, not steps per reading.
 * Steps taken = the increase between consecutive readings; a drop means the phone rebooted
 * and the counter restarted from 0, so the new reading itself is the increase. The first
 * reading only sets the baseline, as we can't know what came before it.
 */
export const getStepIncrements = (points: StreamPoint[]) => {
  const readings = points.flatMap((p) => {
    const steps = num(p.data.steps);
    return steps === undefined ? [] : [{ time: p.time, steps }];
  });
  return readings.slice(1).map((r, i) => {
    const previous = readings[i].steps;
    return { time: r.time, steps: r.steps >= previous ? r.steps - previous : r.steps };
  });
};

/** Completed tasks: CAMS adds taskType (survey, cognition, …); carp.core only has taskName. */
export const getTasks = (points: StreamPoint[]) =>
  points.map((p) => ({
    time: p.time,
    name: typeof p.data.taskName === 'string' ? p.data.taskName : '?',
    type: typeof p.data.taskType === 'string' ? p.data.taskType : 'task',
  }));

const EVENT_FIELDS = ['screenEvent', 'state', 'type'];

/** The state each event reports: screen on/off, app resumed/paused, WALKING/STILL, …. */
export const getEvents = (points: StreamPoint[]) =>
  points.flatMap((p) => {
    const field = EVENT_FIELDS.find((f) => typeof p.data[f] === 'string');
    return field ? [{ time: p.time, state: p.data[field] as string }] : [];
  });
