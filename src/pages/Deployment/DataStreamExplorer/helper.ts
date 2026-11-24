/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DefaultSerializer,
  getSerializer,
  StudyProtocolSnapshot,
} from '@carp-dk/client';
import CarpDataStreamBatch from '@carp-dk/client/shared/models/carpDataStreamBatch';

export type ExpectedStream = { deviceRoleName: string; dataType: string };
export type StreamPoint = { time: Date; data: Record<string, unknown> };

const DATA_STREAM_MEASURE = 'dk.cachet.carp.common.application.tasks.Measure.DataStream';

/**
 * The (device, data type) pairs the protocol makes devices collect: every data-stream
 * measure of a task, on the device each trigger sends that task to.
 */
export const getExpectedStreams = (
  protocolSnapshot: StudyProtocolSnapshot,
): ExpectedStream[] => {
  if (!protocolSnapshot) return [];

  let snapshot: any;
  try {
    snapshot = JSON.parse(
      DefaultSerializer.encodeToString(
        getSerializer(StudyProtocolSnapshot),
        protocolSnapshot,
      ),
    );
  } catch {
    return [];
  }

  const measuresByTask = new Map<string, string[]>(
    (snapshot?.tasks ?? []).map((task: any) => [
      task.name,
      (task.measures ?? [])
        .filter((m: any) => m.__type === DATA_STREAM_MEASURE)
        .map((m: any) => m.type),
    ]),
  );

  const streams = new Map<string, ExpectedStream>();
  (snapshot?.taskControls ?? []).forEach((control: any) => {
    (measuresByTask.get(control.taskName) ?? []).forEach((dataType) => {
      const deviceRoleName = control.destinationDeviceRoleName;
      streams.set(`${deviceRoleName}|${dataType}`, { deviceRoleName, dataType });
    });
  });

  return [...streams.values()].sort(
    (a, b) =>
      a.deviceRoleName.localeCompare(b.deviceRoleName) ||
      a.dataType.localeCompare(b.dataType),
  );
};

/**
 * sensorStartTime is microseconds since epoch from the phone apps, but milliseconds from
 * some clients (e.g. the ICAT web app). Present-day values are ~1.8e15 µs vs ~1.8e12 ms,
 * so anything below 1e14 (year 5138 in ms, 1973 in µs) is taken as milliseconds.
 */
const sensorTimeToDate = (sensorStartTime: unknown): Date => {
  const value = Number(String(sensorStartTime));
  return new Date(value < 1e14 ? value : value / 1000);
};

/** Flattens a batch into points ordered by measurement time. */
export const getPoints = (batch: CarpDataStreamBatch): StreamPoint[] =>
  batch.sequences
    .flatMap((sequence) =>
      sequence.measurements.asJsReadonlyArrayView().map((measurement) => ({
        time: sensorTimeToDate(measurement.sensorStartTime),
        data: (measurement.data ?? {}) as Record<string, unknown>,
      })),
    )
    .sort((a, b) => a.time.getTime() - b.time.getTime());

const COORDINATES = ['latitude', 'longitude'];

/**
 * Data fields holding a number in at least one point, e.g. "bpm" for heart rate. Coordinates
 * go last: air quality and weather carry the place they're for, which is rarely what to plot.
 */
export const getNumericFields = (points: StreamPoint[]): string[] => {
  const fields = new Set<string>();
  points.forEach((point) =>
    Object.entries(point.data).forEach(([key, value]) => {
      if (typeof value === 'number') fields.add(key);
    }),
  );
  return [...fields].sort(
    (a, b) => Number(COORDINATES.includes(a)) - Number(COORDINATES.includes(b)),
  );
};

/** Number of points per bucket; buckets are hours or days in local time. */
export const countPerBucket = (
  points: StreamPoint[],
  from: Date,
  to: Date,
  bucket: 'hour' | 'day',
): { start: Date; count: number }[] => {
  const floor = (d: Date) => {
    const copy = new Date(d);
    if (bucket === 'day') copy.setHours(0, 0, 0, 0);
    else copy.setMinutes(0, 0, 0);
    return copy;
  };
  const next = (d: Date) => {
    const copy = new Date(d);
    if (bucket === 'day') copy.setDate(copy.getDate() + 1);
    else copy.setHours(copy.getHours() + 1);
    return copy;
  };

  const counts = new Map<number, number>();
  points.forEach((p) => {
    const key = floor(p.time).getTime();
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  const buckets: { start: Date; count: number }[] = [];
  for (let d = floor(from); d <= to; d = next(d)) {
    buckets.push({ start: d, count: counts.get(d.getTime()) ?? 0 });
  }
  return buckets;
};

export const formatDataType = (dataType: string) =>
  dataType.slice(dataType.lastIndexOf('.') + 1);
