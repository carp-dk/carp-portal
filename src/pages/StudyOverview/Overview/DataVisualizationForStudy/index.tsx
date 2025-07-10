import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStudyDetails } from '@Utils/queries/studies';
import {
  colors, getUniqueTaskTypesFromProtocolSnapshot, mapDataToChartData, toUTCDate,
} from '@Components/DataVisualizationTable/helper';
import { Skeleton } from '@mui/material';
import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import { LocalDate } from '@js-joda/core';
import { useDataStreamsSummaries } from '@Utils/queries/dataStreams';
import { DataStreamSummaryRequest } from '@carp-dk/client';
import DataVisualizationTable from '@Components/DataVisualizationTable';
import CarpAccordion from '@Components/CarpAccordion';

const DataVisualizationForStudy = () => {
  const { id: studyId } = useParams();

  const [toDate, setToDate] = React.useState(LocalDate.now());
  const fromDate = toDate.minusDays(13);
  const [isExpanded, setIsExpanded] = React.useState(true);

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
  const [displayBlank, setDisplayBlank] = React.useState(false);

  const {
    data: studyDetails,
    isLoading: studyDetailsIsLoading,
    error: studyDetailsError,
  } = useStudyDetails(studyId);

  const summaries = useDataStreamsSummaries(requests, { enabled: requests.length > 0 });

  useEffect(() => {
    if (studyDetails) {
      if (studyDetails.protocolSnapshot == null) {
        setDisplayBlank(true);
      }
      else {
        updateRequestsForQuery();
      }
    }
  }, [studyDetails, toDate]);

  function updateRequestsForQuery() {
    const listOfTaskTypes = getUniqueTaskTypesFromProtocolSnapshot(studyDetails.protocolSnapshot);
    if (listOfTaskTypes.length === 0) {
      setDisplayBlank(true);
      return;
    }

    const [requests, setRequests] = React.useState([]);
    const [displayBlank, setDisplayBlank] = React.useState(false);

    const {
      data: studyDetails,
      isLoading: studyDetailsIsLoading,
      error: studyDetailsError,
    } = useStudyDetails(studyId);

    const summaries = useDataStreamsSummaries(requests, { enabled: requests.length > 0 });

    useEffect(() => {
      if (studyDetails) {
        if (studyDetails.protocolSnapshot == null) {
          setDisplayBlank(true);
        }
        else {
          updateRequestsForQuery();
        }
      }
    }, [studyDetails, toDate]);

    function updateRequestsForQuery() {
      const listOfTaskTypes = getUniqueTaskTypesFromProtocolSnapshot(studyDetails.protocolSnapshot);
      if (listOfTaskTypes.length === 0) {
        setDisplayBlank(true);
        return;
      }
      const requests: DataStreamSummaryRequest[] = listOfTaskTypes.map(type => ({
        study_id: studyId,
        scope: 'study',
        type: type,
        from: toUTCDate(fromDate.atStartOfDay()).toISOString(),
        to: toUTCDate(toDate.atTime(23, 59, 59, 999_000_000)).toISOString(),
      }));
      setRequests(requests);
    }

    const summariesError = summaries.find(summary => summary.isError);
    const error = studyDetailsError || summariesError;

    if (displayBlank) {
      return null;
    }

    if (error) {
      return (
        <CarpErrorCardComponent
          message="An error occurred while loading tasks"
          error={studyDetailsError}
        />
      );
    }

    const loading = studyDetailsIsLoading || (summaries.some(summary => summary.isLoading)) || requests.length === 0;
    const loadingSkeletonHeight = 70 + 16 + (requests?.length * 40);

    if (loading) return (
      <CarpAccordion title="Tasks" isExpanded={isExpanded}>
        <Skeleton
          sx={{ borderRadius: '10px' }}
          variant="rectangular"
          height={loadingSkeletonHeight}
          animation="wave"
        />
      </CarpAccordion>
    );

    const listOfTaskTypesFromProtocol = getUniqueTaskTypesFromProtocolSnapshot(studyDetails.protocolSnapshot);

    const legend = listOfTaskTypesFromProtocol.map((task, index) => ({
      label: task,
      color: colors[index % colors.length],
      stack: 'stack',
      labelMarkType: 'circle',
      dataKey: task,
    }));
    setRequests(requests);
  }

  const summariesError = summaries.find(summary => summary.isError);
  const error = studyDetailsError || summariesError;

  if (displayBlank) {
    return null;
  }

  if (error) {
    return (
      <CarpAccordion title="Tasks" isExpanded={isExpanded}>
        <DataVisualizationTable
          data={data}
          handleLeftButtonClick={handleLeftButtonClick}
          handleRightButtonClick={handleRightButtonClick}
          legend={legend}
          isToDateSetToTheCurrentDay={isToDateSetToTheCurrentDay}
        />
      </CarpAccordion>
    );
  }

  const loading = studyDetailsIsLoading || (summaries.some(summary => summary.isLoading)) || requests.length === 0;

  if (loading) return (
    <StyledContainer>
      <StyledTitle variant="h2">
        Tasks
      </StyledTitle>
      <Skeleton variant="rectangular" height={348} animation="wave" />
    </StyledContainer>
  );

  const listOfTaskTypesFromProtocol = getUniqueTaskTypesFromProtocolSnapshot(studyDetails.protocolSnapshot);

  const legend = listOfTaskTypesFromProtocol.map((task, index) => ({
    label: task,
    color: colors[index % colors.length],
    stack: 'stack',
    labelMarkType: 'circle',
    dataKey: task,
  }));

  const summedGroups = [];

  for (let i = 0; i < summaries.length; i++) {
    const summary = summaries[i].data;
    const { mappedData } = mapDataToChartData(summary);

    const output = mappedData.map((entry) => {
      const { date, dayOfWeek, ...rest } = entry;
      const quantity = Object.values(rest).reduce((sum, value) => sum + value, 0);

      return { date, [summary.type]: quantity, dayOfWeek };
    });

    summedGroups.push(output);
  }

  const data = summedGroups[0];
  for (let i = 1; i < summedGroups.length; i++) {
    const secondKey = Object.keys(summedGroups[i][0])[1];

    for (let j = 0; j < data.length; j++) {
      data[j][secondKey] = summedGroups[i][j][secondKey];
    }
  }

  return (
    <StyledContainer>
      <StyledTitle variant="h2">
        Tasks
      </StyledTitle>
      <StyledCard>
        <DataVisualizationTable
          data={data}
          handleLeftButtonClick={handleLeftButtonClick}
          handleRightButtonClick={handleRightButtonClick}
          legend={legend}
          isToDateSetToTheCurrentDay={isToDateSetToTheCurrentDay}
        />
      </StyledCard>
    </StyledContainer>
  );
};

export default DataVisualizationForStudy;
