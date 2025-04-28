import * as React from 'react';
import {BarChart} from '@mui/x-charts/BarChart';
import {legendClasses} from "@mui/x-charts";
import {borderRadius} from "@mui/system";

interface StackedBarChartForDataStreamsSummaryProps {
    series: any[];
    data: any[];
}

const colors = [
    "#8A9251", // Olive green
    "#679C91", // Desaturated teal
    "#4B9BBE", // Sky blue
    "#377895", // Steel blue
    "#2E5F7D", // Dark blue-gray
    "#254765", // Charcoal navy
    "#1C314E", // Deep indigo
    "#131D37"  // Midnight blue
];


const StackedBarChart = ({
                             series, data
                         }: StackedBarChartForDataStreamsSummaryProps) => {

    console.log(series)
    console.log(data)

    function CustomAxisLine(props) {
        return <div/>;
    }

    return (
        <BarChart
            borderRadius={10}
            skipAnimation={true}
            dataset={data}
            series={series}
            colors={colors}
            slotProps={{
                legend: {
                    direction: 'vertical',
                    position: {
                        vertical: 'top',
                        horizontal: 'start'
                    },
                    sx: {
                        gap: 2,
                        fontSize: 14,
                        fontWeight: 700,
                        ['.MuiChartsLegend-series']: {
                            gap: '5px',
                        },
                        [`.${legendClasses.mark}`]: {
                            height: 14,
                            width: 14,
                        },
                        maxWidth: 186,
                        minWidth: 186,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }
                }
            }}
            slots={
                {
                    // axisLine: CustomAxisLine,
                }
            }
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: 'date',
                },
            ]}
            yAxis={[{width: 0}]}
        />
    )
};

export default StackedBarChart;