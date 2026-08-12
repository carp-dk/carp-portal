/* eslint-disable @typescript-eslint/no-explicit-any */
import { StackedBarChartWrapperProps } from '@Components/DataVisualizationTableWrapper';
import {
  DataStreamSummary,
  DataStreamType,
  DefaultSerializer,
  getSerializer,
  StudyProtocolSnapshot,
} from '@carp-dk/client';
import { LocalDateTime } from '@js-joda/core';

export const taskLabelColors = {
  Survey: '#3A82F7',
  Cognitive: '#B25FEA',
  Health: '#EB4B62',
  Audio: '#67CE67',
  Image: '#228B89',
  Video: '#81CFFA',
};

export const colors = [
  '#8A9251', // Olive green
  '#679C91', // Desaturated teal
  '#4B9BBE', // Sky blue
  '#377895', // Steel blue
  '#2E5F7D', // Dark blue-gray
  '#254765', // Charcoal navy
  '#1C314E', // Deep indigo
  '#131D37', // Midnight blue
];

export const chartConfigs: Partial<StackedBarChartWrapperProps>[] = [
  {
    title: 'Survey',
    subtitle: 'Number of Survey tasks done by this participant.',
    type: 'survey',
    headingColor: taskLabelColors['Survey'],
  },
  {
    title: 'Cognitive',
    subtitle: 'Number of Cognitive tasks done by this participant.',
    type: 'cognition',
    headingColor: taskLabelColors['Cognitive'],
  },
  {
    title: 'Health',
    subtitle: 'Number of Health tasks done by this participant.',
    type: 'health',
    headingColor: taskLabelColors['Health'],
  },
  {
    title: 'Audio',
    subtitle: 'Number of Audio tasks done by this participant.',
    type: 'audio',
    headingColor: taskLabelColors['Audio'],
  },
  {
    title: 'Image/Video',
    subtitle: 'Number of Image/Video tasks done by this participant.',
    type: 'image',
    headingColor: taskLabelColors['Image'],
  },
  {
    title: 'Sensing',
    subtitle: 'Number of Sensing tasks done by this participant.',
    type: 'sensing',
    headingColor: taskLabelColors['Video'],
  },
];

export function toUTCDate(localDateTime: LocalDateTime): Date {
  return new Date(
    Date.UTC(
      localDateTime.year(),
      localDateTime.monthValue() - 1,
      localDateTime.dayOfMonth(),
      localDateTime.hour(),
      localDateTime.minute(),
      localDateTime.second(),
      Math.floor(localDateTime.nano() / 1_000_000),
    ),
  );
}

function generateDateRange(startISO: string, endISO: string): string[] {
  const dates: string[] = [];

  const current = new Date(startISO);
  const end = new Date(endISO);

  while (current <= end) {
    dates.push(current.toLocaleDateString('en-CA').split('T')[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function mapDataToChartData(dataStreamSummary: DataStreamSummary) {
  let isThereAnyData = false;

  const uniqueTasks = Array.from(
    new Set(dataStreamSummary.data.map((item) => item.task)),
  );

  const groupedData = dataStreamSummary.data.reduce(
    (acc, { date, task, quantity }) => {
      const day = date.split('T')[0];

      if (!acc[day]) {
        acc[day] = { date: day };
        uniqueTasks.forEach((t) => (acc[day][t] = 0)); // initialize all tasks with 0
      }

      acc[day][task] = quantity;
      return acc;
    },
    {} as Record<string, Record<string, any>>,
  );

  const dates = generateDateRange(dataStreamSummary.from, dataStreamSummary.to);
  const mappedData = dates.map((day) => {
    if (groupedData[day]) {
      isThereAnyData = true;
      return groupedData[day];
    }

    const empty = { date: day };
    uniqueTasks.forEach((task) => (empty[task] = 0));
    return empty;
  });

  const mappedDataWithFancyDates = mappedData.map((item) => {
    // example of date now 2024-01-01
    const month = item.date.substring(5, 7);
    const day = item.date.substring(8, 10);
    return {
      ...item,
      date: `${day}/${month}`,
      dayOfWeek: new Date(item.date).toLocaleString('en-US', {
        weekday: 'short',
      }),
    };
  });

  return { mappedData: mappedDataWithFancyDates, isThereAnyData };
}

// User-facing tasks (AppTask / RPAppTask) carry their `type`
// (survey/cognition/health/…) and `name` as direct fields on the task; plain
// background sensing tasks (BackgroundTask) have no `type` and are ignored.
//
// We can't read those fields off the Kotlin task objects directly — their JS
// property names are compiler-mangled and shift on every core rebuild. That is
// what silently blanked the tables after the carp.core 1.3 upgrade: the old
// `x['u21_1']` key no longer resolved, so every task was dropped and the cards
// (and their /data-stream-service/summary calls) disappeared. Serialize the
// snapshot to canonical JSON instead and read the stable `type`/`name` fields.
export function getListOfTasksFromProtocolSnapshot(
  protocolSnapshot: StudyProtocolSnapshot,
): { type: string; name: string }[] {
  if (!protocolSnapshot) return [];

  let parsedSnapshot: any;
  try {
    const snapshotJson = DefaultSerializer.encodeToString(
      getSerializer(StudyProtocolSnapshot),
      protocolSnapshot,
    );
    parsedSnapshot = JSON.parse(snapshotJson);
  } catch {
    return [];
  }

  const tasks: any[] = parsedSnapshot?.tasks ?? [];
  return tasks.filter((task) => task?.type != null);
}

export function getUniqueTaskTypesFromProtocolSnapshot(
  protocolSnapshot: StudyProtocolSnapshot,
): string[] {
  const tasks = getListOfTasksFromProtocolSnapshot(protocolSnapshot);
  const uniqueTaskTypes = new Set<string>(tasks?.map((task: any) => task.type));

  uniqueTaskTypes.delete('one_time_sensing');
  uniqueTaskTypes.delete('informed_consent');
  uniqueTaskTypes.delete('video');
  uniqueTaskTypes.delete(undefined);
  uniqueTaskTypes.delete(null);

  return Array.from(uniqueTaskTypes);
}

export function getLegend(
  type: DataStreamType,
  tasks: object[],
): { label: string; color: string }[] {
  const tasksOfType = tasks.filter((task: any) => task.type === type);
  return tasksOfType.map((task: any, index) => {
    return {
      label: task.name,
      color: colors[index % colors.length], // 🎨 assign color cyclically
      stack: 'stack',
      labelMarkType: 'circle',
      dataKey: task.name,
    };
  });
}
