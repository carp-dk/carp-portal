import { colors, taskLabelColors } from '@Components/DataVisualizationTable/helper';
import { BarChart } from '@mui/x-charts/BarChart';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { bucketAxis, CHART_HEIGHT, Stats, ViewProps } from './common';
import { bucketStarts, getTasks, sumPerBucket } from './shapes';

// Same colours as the Tasks charts above, keyed by the CAMS taskType.
const TYPE_COLORS: Record<string, string> = {
  survey: taskLabelColors.Survey,
  cognition: taskLabelColors.Cognitive,
  health: taskLabelColors.Health,
  audio: taskLabelColors.Audio,
  image: taskLabelColors.Image,
  video: taskLabelColors.Video,
};

const TasksView = ({ points, from, to, bucket }: ViewProps) => {
  const { t } = useTranslation();
  const tasks = useMemo(() => getTasks(points), [points]);
  const types = useMemo(() => [...new Set(tasks.map((task) => task.type))].sort(), [tasks]);
  const starts = useMemo(() => bucketStarts(from, to, bucket), [from, to, bucket]);

  return (
    <>
      <Stats
        items={[
          {
            label: t('deployment:data_streams_card.tasks_completed'),
            value: String(tasks.length),
          },
          {
            label: t('deployment:data_streams_card.different_tasks'),
            value: String(new Set(tasks.map((task) => task.name)).size),
          },
        ]}
      />
      <BarChart
        height={CHART_HEIGHT}
        xAxis={[bucketAxis(starts, bucket)]}
        series={types.map((type, i) => ({
          data: sumPerBucket(
            tasks.filter((task) => task.type === type),
            from,
            to,
            bucket,
            () => 1,
          ).map((b) => b.value),
          label: type,
          stack: 'tasks',
          color: TYPE_COLORS[type] ?? colors[i % colors.length],
        }))}
      />
    </>
  );
};

export default TasksView;
