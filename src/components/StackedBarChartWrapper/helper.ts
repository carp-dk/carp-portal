import {DataStreamSummary} from "../../../../carp-client-ts/src";

export function mapDataToChartData(dataStreamSummary: DataStreamSummary) {
    const uniqueTasks = Array.from(new Set(dataStreamSummary.data.map(item => item.task)));

    const groupedData = dataStreamSummary.data.reduce((acc, {date, task, quantity}) => {
        const day = date.split('T')[0];

        if (!acc[day]) {
            acc[day] = {date: day};
            uniqueTasks.forEach(t => acc[day][t] = 0); // initialize all tasks with 0
        }

        acc[day][task] = quantity;
        return acc;
    }, {} as Record<string, Record<string, any>>);

    const dates = generateDateRange(
        dataStreamSummary.from,
        dataStreamSummary.to
    );

    const mappedData = dates.map(day => {
        if (groupedData[day]) {
            return groupedData[day];
        }

        const empty = {date: day};
        uniqueTasks.forEach(task => empty[task] = 0);
        return empty;
    });


    let series = Array.from(uniqueTasks).map((task) => ({
        label: task,
        dataKey: task,
        stack: '',
    }));

    return {series, mappedData}
}

function generateDateRange(startISO: string, endISO: string): string[] {
    const dates: string[] = [];

    const current = new Date(startISO);
    const end = new Date(endISO);

    while (current <= end) {
        dates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
    }

    return dates;
}