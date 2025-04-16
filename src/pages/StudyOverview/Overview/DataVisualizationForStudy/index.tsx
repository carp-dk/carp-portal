import React from 'react';
import {StyledContainer, StyledTitle} from "./styles";
import {useParams} from "react-router-dom";
import {useDataStreamsSummary} from "@Utils/queries/dataStreams";
import {DataStreamSummaryRequest} from "../../../../../../carp-client-ts/src";
import StackedBarChartWrapper from "@Components/StackedBarChartWrapper";
import {Box} from '@mui/system';
import {startOfDay, endOfDay, subWeeks, addWeeks, isSameDay, addDays} from 'date-fns';

const DataVisualizationForStudy = () => {
    function getStartOfDayUTC(date: Date): Date {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
    }

    function getEndOfDayUTC(date: Date): Date {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));
    }

    const {id: studyId} = useParams();

    const [toDate, setToDate] = React.useState(() => getEndOfDayUTC(new Date()));
    const fromDateISO = getStartOfDayUTC(subWeeks(toDate, 2)).toISOString();
    const toDateISO = getEndOfDayUTC(toDate).toISOString();

    const dataStreamSummaryRequest: DataStreamSummaryRequest = {
        study_id: studyId,
        deployment_id: undefined,
        participant_id: undefined,
        scope: "study",
        type: "survey",
        from: fromDateISO,
        to: toDateISO,
    }

    const {
        data: dataStreamSummary,
        isLoading: isDataStreamSummaryLoading,
        error: dataStreamSummaryError,
    } = useDataStreamsSummary(dataStreamSummaryRequest);

    // const dataStreamSummaryRequest2: DataStreamSummaryRequest = {
    //     study_id: studyId,
    //     deployment_id: undefined,
    //     participant_id: undefined,
    //     scope: "study",
    //     type: "survey",
    //     from: "2025-03-10T14:48:00.000Z",
    //     to: "2025-03-20T14:48:00.000Z",
    // }
    //
    // const {
    //     data: dataStreamSummary2,
    //     isLoading: isDataStreamSummaryLoading2,
    //     error: dataStreamSummaryError2,
    // } = useDataStreamsSummary(dataStreamSummaryRequest2);

    const isToDateSetToTheCurrentDay = isSameDay(new Date(), toDate);

    function handleLeftButtonClick() {
        setToDate(prev => getEndOfDayUTC(subWeeks(prev, 2)));
    }

    function handleRightButtonClick() {
        if (isToDateSetToTheCurrentDay) return;

        setToDate(prev => {
            const advanced = addDays(prev, 14);
            console.log(advanced)
            const now = new Date();
            return (isSameDay(advanced, now) || advanced > now)
                ? getEndOfDayUTC(now)
                : getEndOfDayUTC(advanced);
        });
    }


    return (
        <StyledContainer>
            <StyledTitle variant="h2">
                Tasks
            </StyledTitle>
            <StackedBarChartWrapper
                title={"Survey"}
                subtitle={"Number of Survey tasks done by this participant."}
                dataStreamSummary={dataStreamSummary}
                isLoading={isDataStreamSummaryLoading}
                errorMessage={dataStreamSummaryError}
                onLeftButtonClick={handleLeftButtonClick}
                onRightButtonClick={handleRightButtonClick}
            />
            <Box sx={{p: 2.5}}/>
            {/*<StackedBarChartWrapper*/}
            {/*    title={"Cognitive"}*/}
            {/*    subtitle={"Number of Cognitive tasks done by this participant."}*/}
            {/*    dataStreamSummary={dataStreamSummary2}*/}
            {/*    isLoading={isDataStreamSummaryLoading2}*/}
            {/*    errorMessage={dataStreamSummaryError2}*/}
            {/*/>*/}
        </StyledContainer>
    );
}

export default DataVisualizationForStudy;