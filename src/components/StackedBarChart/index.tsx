import * as React from 'react';
import {BarChart} from '@mui/x-charts/BarChart';
import {colors} from "@Components/StackedBarChartWrapper/helper";

interface StackedBarChartForDataStreamsSummaryProps {
    series: any[];
    data: any[];
}

const StackedBarChart = ({
                             series, data
                         }: StackedBarChartForDataStreamsSummaryProps) => {

    return (
        <BarChart
            borderRadius={10}
            skipAnimation={true}
            dataset={data}
            series={series}
            colors={colors}
            slotProps={{
                axisLine: {
                    visibility: 'hidden'
                },
                axisTick: {
                    visibility: 'hidden',
                },
            }}
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: 'date',
                },
            ]}
            hideLegend
            yAxis={[{width: 0}]}
        />
    )
};

export default StackedBarChart;