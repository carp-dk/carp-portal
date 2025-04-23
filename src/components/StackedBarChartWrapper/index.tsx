import {StyledCard, StyledTitle, StyledDescription, WrapperForControlsAndChart} from "./styles";
import {Skeleton, Box} from "@mui/material";
import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import StackedBarChart from "@Components/StackedBarChart";
import {mapDataToChartData} from "@Components/StackedBarChartWrapper/helper";
import React from "react";
import {LocalDate, LocalDateTime} from "@js-joda/core";
import {useDataStreamsSummary} from "@Utils/queries/dataStreams";
import {DataStreamScope, DataStreamSummaryRequest, DataStreamType} from "@carp-dk/client";

export interface StackedBarChartWrapperProps {
    studyId: string;
    deploymentId?: string;
    participantId?: string;
    title: string;
    subtitle: string;
    type: DataStreamType;
    scope: DataStreamScope;
    headingColor: string;
}

const taskColors = {
    "Survey": "#3A82F7",
    "Cognitive": "#B25FEA",
    "Health": "#EB4B62",
    "Audio": "#67CE67",
    "Image": "#228B89",
    "Video": "#81CFFA"
}

const StackedBarChartWrapper = (props: StackedBarChartWrapperProps) => {
    const [toDate, setToDate] = React.useState(LocalDate.now());
    const fromDate = toDate.minusDays(14)
    const [expanded, setExpanded] = React.useState(false);

    function toUTCDate(localDateTime: LocalDateTime): Date {
        return new Date(Date.UTC(
            localDateTime.year(),
            localDateTime.monthValue() - 1,
            localDateTime.dayOfMonth(),
            localDateTime.hour(),
            localDateTime.minute(),
            localDateTime.second(),
            Math.floor(localDateTime.nano() / 1_000_000)
        ));
    }

    const dataStreamSummaryRequest: DataStreamSummaryRequest = {
        study_id: props.studyId,
        deployment_id: props.deploymentId,
        participant_id: props.participantId,
        scope: props.scope,
        type: props.type,
        from: toUTCDate(fromDate.atStartOfDay()).toISOString(),
        to: toUTCDate(toDate.atTime(23, 59, 59, 999_000_000)).toISOString(),
    }

    function toggleExpanded() {
        setExpanded(prev => !prev);
    }

    // if (!expanded) {
    //     return (
    //         <StyledCard>
    //             <StyledTitle variant="h2" customcolor={taskColors[props.title]}>
    //                 {props.title}
    //             </StyledTitle>
    //             <button onClick={() => toggleExpanded()}>
    //                 s
    //             </button>
    //         </StyledCard>
    //     )
    // }

    const {
        data,
        isLoading,
        error,
    } = useDataStreamsSummary(dataStreamSummaryRequest);

    const isToDateSetToTheCurrentDay = toDate.equals(LocalDate.now());

    function handleLeftButtonClick() {
        setToDate(prev => prev.minusDays(14));
    }

    function handleRightButtonClick() {
        if (isToDateSetToTheCurrentDay) return;

        if (isToDateSetToTheCurrentDay) return;

        const newToDate = toDate.plusDays(14);
        const today = LocalDate.now();

        // Don't go beyond today
        setToDate(newToDate.isAfter(today) ? today : newToDate);
    }

    if (error) {
        return (
            <CarpErrorCardComponent
                message={"An error occurred while loading " + props.title + " tasks"}
                error={error}
            />
        )
    }

    if (isLoading) {
        return (
            <StyledCard>
                <StyledTitle variant="h2" customcolor={taskColors[props.title]}>
                    {props.title}
                </StyledTitle>
                <StyledDescription variant="h6">
                    {props.subtitle}
                </StyledDescription>
                <Box sx={{m: 1.5}}/>
                <Skeleton variant="rectangular" height={'100px'} animation="wave"/>
            </StyledCard>
        );
    }

    const {series, mappedData} = mapDataToChartData(data);

    return (
        <StyledCard>
            <StyledTitle variant="h2" customcolor={taskColors[props.title]}>
                {props.title}
            </StyledTitle>
            <StyledDescription variant="h6">
                {props.subtitle}
            </StyledDescription>
            <Box sx={{m: 1.5}}/>
            <span>From: {data.from}</span>
            <span>To: {data.to}</span>
            <WrapperForControlsAndChart>
                <button onClick={() => handleLeftButtonClick()}>-</button>
                <StackedBarChart
                    data={mappedData}
                    series={series}
                />
                <button onClick={() => handleRightButtonClick()}>+</button>
            </WrapperForControlsAndChart>
        </StyledCard>
    );
};

export default StackedBarChartWrapper;