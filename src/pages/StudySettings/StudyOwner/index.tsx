import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import { Skeleton } from '@mui/material';
import { useResearchers, useStudyDetails } from '@Utils/queries/studies';
import { useParams } from 'react-router-dom';
import ResearcherItem from '../ResearcherItem';
import { ResearchersContainer } from '../StudyResearchers/styles';
import { Heading, StyledCard, Subheading } from '../styles';

const StudyOwner = () => {
  const { id: studyId } = useParams();
  const {
    data: researchers,
    isLoading: researchersLoading,
    error: researchersError,
  } = useResearchers(studyId);

  const {
    data: studyDetails,
    isLoading: studyDetailsLoading,
    error: studyDetailsError,
  } = useStudyDetails(studyId);

  if (researchersLoading || studyDetailsLoading) {
    return <Skeleton height="68px" width="220px" animation="wave" />;
  }

  if (researchersError || studyDetailsError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading study owner details"
        error={researchersError ?? studyDetailsError}
      />
    );
  }

  const studyOwner = researchers.find(
    (researcher) => researcher.id == studyDetails.ownerId.stringRepresentation,
  );

  return (
    <StyledCard
      elevation={2}
      sx={{
        gridColumn: 'span 2',
      }}
    >
      <Heading variant="h2">Study Owner</Heading>
      <Subheading variant="h6">Study owner can manage the study.</Subheading>
      <ResearchersContainer>
        <ResearcherItem
          disabled={true}
          key={studyOwner.id}
          researcher={studyOwner}
        />
      </ResearchersContainer>
    </StyledCard>
  );
};

export default StudyOwner;
