import {
    StyledCard,
    StyledTitle,
    StyledDescription,
    Wrapper,
    StyledLi,
    BulletPoint,
    StyledUl,
    StyledLabel,
    RightWrapper,
    DateRangeLabel,
    ControlsAndChartWrapper,
    StyledControlButton,
    NotExpandedStyledCard, ChevronDown, FlexRowBetween, ChevronUp, UpperDiv, NoDataLabel
} from "./styles";
import {Skeleton, Box} from "@mui/material";
import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import StackedBarChart from "@Components/StackedBarChart";
import {
    fancyDateFromISOString,
    mapDataToChartData,
    taskLabelColors,
    toUTCDate
} from "@Components/StackedBarChartWrapper/helper";
import React from "react";
import {LocalDate} from "@js-joda/core";
import {useDataStreamsSummary} from "@Utils/queries/dataStreams";
import {DataStreamScope, DataStreamSummaryRequest, DataStreamType} from "@carp-dk/client";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

export interface StackedBarChartWrapperProps {
    deploymentId?: string;
    headingColor: string;
    initiallyExtended: boolean;
    participantId?: string;
    scope: DataStreamScope;
    studyId: string;
    subtitle: string;
    title: string;
    type: DataStreamType;
    legend: Object[];
}

const StackedBarChartWrapper = (props: StackedBarChartWrapperProps) => {
    const [toDate, setToDate] = React.useState(LocalDate.now());
    const fromDate = toDate.minusDays(14)
    const [expanded, setExpanded] = React.useState(props.initiallyExtended);

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

    const {data, isLoading, error,} = useDataStreamsSummary(dataStreamSummaryRequest, {enabled: expanded});

    const isToDateSetToTheCurrentDay = toDate.equals(LocalDate.now());

    function handleLeftButtonClick() {
        setToDate(prev => prev.minusDays(14));
    }


    function handleRightButtonClick() {
        if (isToDateSetToTheCurrentDay) return;

        const newToDate = toDate.plusDays(14);
        const today = LocalDate.now();

        // Don't go beyond today
        setToDate(newToDate.isAfter(today) ? today : newToDate);
    }

    if (!expanded) {
        return (
            <NotExpandedStyledCard>
                <StyledTitle variant="h2" customcolor={taskLabelColors[props.title]}>
                    {props.title}
                </StyledTitle>

                <StyledControlButton onClick={() => toggleExpanded()}>
                    <ChevronDown></ChevronDown>
                </StyledControlButton>
            </NotExpandedStyledCard>
        )
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
                <FlexRowBetween>
                    <StyledTitle variant="h2" customcolor={taskLabelColors[props.title]}>
                        {props.title}
                    </StyledTitle>
                    <StyledControlButton>
                        <ChevronUp></ChevronUp>
                    </StyledControlButton>
                </FlexRowBetween>
                <StyledDescription variant="h6">
                    {props.subtitle}
                </StyledDescription>
                <Box sx={{m: 1.5}}/>
                <Skeleton variant="rectangular" height={'300px'} animation="wave"/>
            </StyledCard>
        );
    }

    const {mappedData, isThereAnyData} = mapDataToChartData(data);

    return (
        <StyledCard>
            <FlexRowBetween>
                <StyledTitle variant="h2" customcolor={taskLabelColors[props.title]}>
                    {props.title}
                </StyledTitle>
                <StyledControlButton onClick={() => toggleExpanded()}>
                    <ChevronUp></ChevronUp>
                </StyledControlButton>
            </FlexRowBetween>
            <StyledDescription variant="h6">
                {props.subtitle}
            </StyledDescription>
            <Box sx={{m: 1.5}}/>
            <Wrapper>
                <StyledUl>
                    {props.legend.map((i => (
                        <StyledLi key={i.label}>
                            <BulletPoint style={{backgroundColor: i.color}}></BulletPoint>
                            <StyledLabel>{i.label}</StyledLabel>
                        </StyledLi>
                    )))}
                </StyledUl>

                <RightWrapper>
                    <UpperDiv>
                        <NoDataLabel style={{visibility: !isThereAnyData ? 'visible' : 'hidden'}}>No data</NoDataLabel>
                        <DateRangeLabel>{fancyDateFromISOString(data.from)} - {fancyDateFromISOString(data.to)}</DateRangeLabel>
                    </UpperDiv>
                    <ControlsAndChartWrapper>
                        <StyledControlButton onClick={() => handleLeftButtonClick()}>
                            <ChevronLeft></ChevronLeft>
                        </StyledControlButton>
                        <StackedBarChart
                            data={mappedData}
                            series={props.legend}
                        />
                        <StyledControlButton disabled={isToDateSetToTheCurrentDay}
                                             onClick={() => handleRightButtonClick()}>
                            <ChevronRight></ChevronRight>
                        </StyledControlButton>
                    </ControlsAndChartWrapper>
                </RightWrapper>
            </Wrapper>
        </StyledCard>
    );
};

export default StackedBarChartWrapper;