import { MenuItem, Select } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { countPerBucket, getNumericFields } from '../helper';
import { bucketAxis, CHART_HEIGHT, timeAxis, ViewProps } from './common';

/** Any data type without its own view: numeric fields as a line, otherwise points per bucket. */
const GenericView = ({ points, from, to, bucket }: ViewProps) => {
  const { t } = useTranslation();
  const numericFields = useMemo(() => getNumericFields(points), [points]);
  const [chosenField, setChosenField] = useState<string>();
  const field = numericFields.includes(chosenField)
    ? chosenField
    : numericFields[0];

  if (field) {
    const plotted = points.filter((p) => typeof p.data[field] === 'number');
    return (
      <>
        {numericFields.length > 1 && (
          <Select
            size="small"
            value={field}
            onChange={(e) => setChosenField(e.target.value)}
            sx={{ alignSelf: 'flex-start' }}
          >
            {numericFields.map((f) => (
              <MenuItem key={f} value={f}>
                {f}
              </MenuItem>
            ))}
          </Select>
        )}
        <LineChart
          height={CHART_HEIGHT}
          xAxis={[
            { data: plotted.map((p) => p.time), ...timeAxis(from, to, bucket) },
          ]}
          series={[
            {
              data: plotted.map((p) => p.data[field] as number),
              label: field,
              showMark: plotted.length < 100,
            },
          ]}
        />
      </>
    );
  }

  // No numeric values to plot: show when data arrived instead.
  const buckets = countPerBucket(points, from, to, bucket);
  return (
    <BarChart
      height={CHART_HEIGHT}
      xAxis={[bucketAxis(buckets.map((b) => b.start), bucket)]}
      series={[
        {
          data: buckets.map((b) => b.count),
          label: t('deployment:data_streams_card.points'),
        },
      ]}
    />
  );
};

export default GenericView;
