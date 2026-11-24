import { colors } from '@Components/DataVisualizationTable/helper';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { useMemo } from 'react';
import { CHART_HEIGHT, timeAxis, ViewProps } from './common';
import { getEvents } from './shapes';

const ROW_HEIGHT = 40;

/** One row per state (screen on/off, app resumed/paused, WALKING/STILL, …), a dot per event. */
const EventTimelineView = ({ points, from, to, bucket }: ViewProps) => {
  const events = useMemo(() => getEvents(points), [points]);
  const states = useMemo(() => [...new Set(events.map((e) => e.state))].sort(), [events]);
  if (events.length === 0) return null;

  return (
    <ScatterChart
      height={Math.max(CHART_HEIGHT / 2, states.length * ROW_HEIGHT + 80)}
      xAxis={[
        // Short dates on the axis; the full time is in each dot's tooltip.
        timeAxis(from, to, bucket),
      ]}
      yAxis={[
        {
          min: -0.5,
          max: states.length - 0.5,
          tickInterval: states.map((_, i) => i),
          valueFormatter: (v: number) => states[v] ?? '',
          width: 140,
        },
      ]}
      series={states.map((state, i) => ({
        label: state,
        color: colors[(i * 2) % colors.length],
        markerSize: 4,
        data: events
          .filter((e) => e.state === state)
          .map((e, j) => ({ id: `${state}-${j}`, x: e.time.getTime(), y: i })),
        valueFormatter: (v) => (v ? `${state} · ${new Date(v.x).toLocaleString()}` : ''),
      }))}
    />
  );
};

export default EventTimelineView;
