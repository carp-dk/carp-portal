import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CHART_HEIGHT, Stats, timeAxis, ViewProps } from './common';
import { getHeartRates, getStats } from './shapes';

const HEART_RATE_COLOR = '#EB4B62';

const HeartRateView = ({ points, from, to, bucket }: ViewProps) => {
  const { t } = useTranslation();
  const readings = useMemo(() => getHeartRates(points), [points]);
  const stats = getStats(readings.map((r) => r.bpm));
  if (!stats) return null;

  const bpm = (v: number) => `${Math.round(v)} bpm`;
  return (
    <>
      <Stats
        items={[
          { label: t('deployment:data_streams_card.min'), value: bpm(stats.min) },
          { label: t('deployment:data_streams_card.average'), value: bpm(stats.mean) },
          { label: t('deployment:data_streams_card.max'), value: bpm(stats.max) },
        ]}
      />
      <LineChart
        height={CHART_HEIGHT}
        xAxis={[
          { data: readings.map((r) => r.time), ...timeAxis(from, to, bucket) },
        ]}
        yAxis={[{ label: 'bpm' }]}
        series={[
          {
            data: readings.map((r) => r.bpm),
            label: t('deployment:data_streams_card.heart_rate'),
            color: HEART_RATE_COLOR,
            showMark: readings.length < 100,
            valueFormatter: (v) => (v == null ? '' : bpm(v)),
          },
        ]}
      />
    </>
  );
};

export default HeartRateView;
