import React, {useEffect} from 'react';
import {StyledContainer, StyledTitle} from "./styles";
import {useParams} from "react-router-dom";
import {useStudyDetails} from "@Utils/queries/studies";
import {
    colors, fancyDateFromISOString, getUniqueTaskTypesFromProtocolSnapshot, mapDataToChartData, toUTCDate
} from "@Components/StackedBarChartWrapper/helper";
import {Skeleton} from "@mui/material";
import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import {LocalDate} from "@js-joda/core";
import {useDataStreamsSummaries} from "@Utils/queries/dataStreams";
import {DataStreamSummaryRequest} from "@carp-dk/client";
import {
    BulletPoint,
    ControlsAndChartWrapper, DateRangeLabel, NoDataLabel,
    RightWrapper, StyledCard,
    StyledControlButton,
    StyledLabel, StyledLi, StyledUl, UpperDiv, Wrapper
} from "@Components/StackedBarChartWrapper/styles";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import StackedBarChart from "@Components/StackedBarChart";

const DataVisualizationForStudy = () => {
    const {id: studyId} = useParams();

    const [toDate, setToDate] = React.useState(LocalDate.now());
    const fromDate = toDate.minusDays(14)

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

    const [requests, setRequests] = React.useState([]);

    const {
        data: studyDetails,
        isLoading: studyDetailsIsLoading,
        error: studyDetailsError,
    } = useStudyDetails(studyId);

    const summaries = useDataStreamsSummaries(requests, {enabled: requests.length > 0})

    useEffect(() => {
        if (studyDetails) {
            updateRequestsForQuery();
        }
    }, [studyDetails, toDate]);

    function updateRequestsForQuery() {
        const listOfTaskTypes = getUniqueTaskTypesFromProtocolSnapshot(studyDetails.protocolSnapshot);

        const requests: DataStreamSummaryRequest[] = listOfTaskTypes.map(type => ({
            study_id: studyId,
            scope: 'study',
            type: type,
            from: toUTCDate(fromDate.atStartOfDay()).toISOString(),
            to: toUTCDate(toDate.atTime(23, 59, 59, 999_000_000)).toISOString(),
        }))
        setRequests(requests);
    }

    const summariesError = summaries.find(summary => summary.isError);
    const error = studyDetailsError || summariesError;

    if (error) {
        return (
            <StyledContainer>
                <StyledTitle variant="h2">
                    Tasks
                </StyledTitle>
                <CarpErrorCardComponent
                    message={"An error occurred while loading tasks"}
                    error={studyDetailsError}
                />
            </StyledContainer>
        );
    }

    const loading = studyDetailsIsLoading || (summaries.some(summary => summary.isLoading)) || requests.length === 0;

    if (loading) return (
        <StyledContainer>
            <StyledTitle variant="h2">
                Tasks
            </StyledTitle>
            <Skeleton variant="rectangular" height={348} animation="wave"/>
        </StyledContainer>
    )

    const listOfTaskTypesFromProtocol = getUniqueTaskTypesFromProtocolSnapshot(studyDetails.protocolSnapshot);

    const legend = listOfTaskTypesFromProtocol.map((task, index) => ({
        label: task,
        color: colors[index % colors.length],
        stack: 'stack',
        labelMarkType: 'circle',
        dataKey: task,
    }));

    let summedGroups = [];
    let isThereAnyData = false;

    for (let i = 0; i < summaries.length; i++) {
        let summary = summaries[i].data;
        const {mappedData} = mapDataToChartData(summary);

        const output = mappedData.map(entry => {
            const {date, ...rest} = entry;
            const quantity = Object.values(rest).reduce((sum, value) => sum + value, 0);

            if (quantity > 0)
                isThereAnyData = true;
            return {date, [summary.type]: quantity};
        });

        summedGroups.push(output);
    }

    let data = summedGroups[0];
    for (let i = 1; i < summedGroups.length; i++) {
        const secondKey = Object.keys(summedGroups[i][0])[1];

        for (let j = 0; j < data.length; j++) {
            data[j][secondKey] = summedGroups[i][j][secondKey];
        }
    }

    const fancyDateFrom = fancyDateFromISOString(summaries[0].data.from);
    const fancyDateTo = fancyDateFromISOString(summaries[0].data.to);

    return (
        <StyledContainer>
            <StyledTitle variant="h2">
                Tasks
            </StyledTitle>

            <StyledCard>
                <Wrapper>
                    <StyledUl>
                        {legend.map((i => (
                            <StyledLi key={i.label}>
                                <BulletPoint style={{backgroundColor: i.color}}></BulletPoint>
                                <StyledLabel>{i.label}</StyledLabel>
                            </StyledLi>
                        )))}
                    </StyledUl>

                    <RightWrapper>
                        <UpperDiv>
                            <NoDataLabel style={{visibility: !isThereAnyData ? 'visible' : 'hidden'}}>No
                                data</NoDataLabel>
                            <DateRangeLabel>{fancyDateFrom} - {fancyDateTo}</DateRangeLabel>
                        </UpperDiv>
                        <ControlsAndChartWrapper>
                            <StyledControlButton onClick={() => handleLeftButtonClick()}>
                                <ChevronLeft></ChevronLeft>
                            </StyledControlButton>
                            <StackedBarChart
                                data={data}
                                series={legend}
                            />
                            <StyledControlButton disabled={isToDateSetToTheCurrentDay}
                                                 onClick={() => handleRightButtonClick()}>
                                <ChevronRight></ChevronRight>
                            </StyledControlButton>
                        </ControlsAndChartWrapper>
                    </RightWrapper>
                </Wrapper>
            </StyledCard>
        </StyledContainer>
    );
}

export default DataVisualizationForStudy;