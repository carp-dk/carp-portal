import { styled } from '@Utils/theme';
import { Typography } from '@mui/material';
import { StreamPoint } from '../helper';
import { Bucket } from './shapes';

export const CHART_HEIGHT = 280;

export type ViewProps = {
  points: StreamPoint[];
  from: Date;
  to: Date;
  bucket: Bucket;
};

export const formatBucket = (d: Date, bucket: Bucket) =>
  bucket === 'hour'
    ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : d.toLocaleDateString([], { day: 'numeric', month: 'short' });

const MAX_TICK_LABELS = 8;
// The axis' default height is too short for the theme's tick labels, and @mui/x-charts then
// truncates every label to nothing. 40px fits one line of 12px labels.
const X_AXIS_HEIGHT = 40;
const BUCKET_MS = { hour: 3_600_000, day: 86_400_000 };

/** A continuous time x-axis over the window, ticking at most once per hour/day. */
export const timeAxis = (from: Date, to: Date, bucket: Bucket) => ({
  scaleType: 'time' as const,
  min: from,
  max: to,
  valueFormatter: (d: Date | number) => formatBucket(new Date(d), bucket),
  tickMinStep: BUCKET_MS[bucket],
  height: X_AXIS_HEIGHT,
});

/**
 * A band x-axis with one bar per bucket. With 30 days of bars the labels don't fit and the chart
 * drops them all, so only every nth bar is labelled.
 */
export const bucketAxis = (starts: Date[], bucket: Bucket) => {
  const every = Math.max(1, Math.ceil(starts.length / MAX_TICK_LABELS));
  return {
    data: starts,
    scaleType: 'band' as const,
    valueFormatter: (d: Date) => formatBucket(d, bucket),
    tickLabelInterval: (_: Date, index: number) => index % every === 0,
    height: X_AXIS_HEIGHT,
  };
};

const StatRow = styled('div')({
  display: 'flex',
  gap: 32,
  flexWrap: 'wrap',
});

const StatValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontVariantNumeric: 'tabular-nums',
}));

/** A row of labelled numbers above a chart, e.g. min / avg / max heart rate. */
export const Stats = ({ items }: { items: { label: string; value: string }[] }) => (
  <StatRow>
    {items.map((item) => (
      <div key={item.label}>
        <Typography variant="caption" color="text.secondary">
          {item.label}
        </Typography>
        <StatValue variant="h3">{item.value}</StatValue>
      </div>
    ))}
  </StatRow>
);
