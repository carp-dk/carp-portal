import { BarChart } from '@mui/x-charts/BarChart';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Note } from '../styles';
import { bucketAxis, CHART_HEIGHT, Stats, ViewProps } from './common';
import { getStepIncrements, sumPerBucket } from './shapes';

const STEPS_COLOR = '#67CE67';

const StepsView = ({ points, from, to, bucket }: ViewProps) => {
  const { t } = useTranslation();
  const buckets = useMemo(
    () => sumPerBucket(getStepIncrements(points), from, to, bucket, (i) => i.steps),
    [points, from, to, bucket],
  );
  const total = buckets.reduce((sum, b) => sum + b.value, 0);

  return (
    <>
      <Stats
        items={[
          {
            label: t('deployment:data_streams_card.total_steps'),
            value: total.toLocaleString(),
          },
        ]}
      />
      <BarChart
        height={CHART_HEIGHT}
        xAxis={[bucketAxis(buckets.map((b) => b.start), bucket)]}
        series={[
          {
            data: buckets.map((b) => b.value),
            label: t('deployment:data_streams_card.steps'),
            color: STEPS_COLOR,
          },
        ]}
      />
      <Note variant="caption">{t('deployment:data_streams_card.steps_note')}</Note>
    </>
  );
};

export default StepsView;
