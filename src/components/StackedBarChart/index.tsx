import * as React from 'react';
import {BarChart} from '@mui/x-charts/BarChart';

interface StackedBarChartForDataStreamsSummaryProps {
    series: any[];
    data: any[];
}

const StackedBarChart = ({
                             series, data
                         }: StackedBarChartForDataStreamsSummaryProps) => {

    function CustomAxisLine(props) {
        return <div/>;
    }

    return (
        <BarChart
            skipAnimation={true}
            dataset={data}
            series={series}
            slots={
                {
                    axisLine: CustomAxisLine,
                }
            }
            xAxis={[{scaleType: 'band', dataKey: 'date'}]}
        />
    )
};

export default StackedBarChart;