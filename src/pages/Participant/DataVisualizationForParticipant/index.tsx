import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import {
  chartConfigs as configs,
  getLegend,
  getListOfTasksFromProtocolSnapshot,
  getUniqueTaskTypesFromProtocolSnapshot,
} from '@Components/DataVisualizationTable/helper';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import { useStudyDetails } from '@Utils/queries/studies';
import React from 'react';
import { useParams } from 'react-router-dom';
import DataVisualizationTableWrapper from 'src/components/DataVisualizationTableWrapper';
import { StyledContainer, StyledTitle } from './styles';

const DataVisualizationForParticipant = () => {
  const { id: studyId, deploymentId, participantId } = useParams();

  const {
    data: studyDetails,
    isLoading: studyDetailsIsLoading,
    error: studyDetailsError,
  } = useStudyDetails(studyId);

  // All charts until the protocol is known, then only its task types.
  const chartConfigs = React.useMemo(() => {
    if (!studyDetails) return configs;
    const listOfTaskTypes = getUniqueTaskTypesFromProtocolSnapshot(
      studyDetails.protocolSnapshot,
    );
    return configs.filter((cfg) => listOfTaskTypes.includes(cfg.type));
  }, [studyDetails]);

  if (studyDetailsIsLoading)
    return (
      <StyledContainer>
        <StyledTitle variant="h2">Tasks</StyledTitle>
        <Skeleton variant="rectangular" height={100} animation="wave" />
      </StyledContainer>
    );

  if (studyDetailsError) {
    return (
      <StyledContainer>
        <StyledTitle variant="h2">Tasks</StyledTitle>
        <CarpErrorCardComponent
          message="An error occurred while loading tasks"
          error={studyDetailsError}
        />
      </StyledContainer>
    );
  }

  const listOfTasksFromProtocol = getListOfTasksFromProtocolSnapshot(
    studyDetails.protocolSnapshot,
  );

  if (listOfTasksFromProtocol.length === 0) {
    return null;
  }

  return (
    <StyledContainer>
      {chartConfigs.length > 0 && <StyledTitle variant="h2">Tasks</StyledTitle>}
      {chartConfigs.map((cfg) => (
        <React.Fragment key={cfg.type}>
          <DataVisualizationTableWrapper
            legend={getLegend(cfg.type, listOfTasksFromProtocol)}
            studyId={studyId}
            deploymentId={deploymentId}
            participantId={participantId}
            type={cfg.type}
            title={cfg.title}
            subtitle={cfg.subtitle}
            headingColor={cfg.headingColor}
            scope="participant"
            initiallyExtended={true}
          />
          <Box sx={{ p: 2.5 }} />
        </React.Fragment>
      ))}
      <Box sx={{ p: 2.5 }} />
    </StyledContainer>
  );
};

export default DataVisualizationForParticipant;
