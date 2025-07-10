import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import { useCurrentUser } from '@Utils/queries/auth';
import { useResearchers, useStudyDetails } from '@Utils/queries/studies';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ResearcherItem, { ResearcherItemSkeleton } from '../ResearcherItem';
import {
  AddResearcherButton,
  ResearchersContainer,
  StyledCard,
  Subtitle,
  Title,
  Top,
} from './styles';

type Props = {
  setOpenAddResearcherModal: () => void;
};

const StudyResearchers = ({ setOpenAddResearcherModal }: Props) => {
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
  const { data: user, isLoading: userLoading } = useCurrentUser();

  if (researchersError || studyDetailsError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading researchers"
        error={researchersError ?? studyDetailsError}
      />
    );
  }

  return (
    <StyledCard elevation={2}>
      <Top>
        <div>
          <Title variant="h2">Researchers</Title>
          <Subtitle variant="h6">
            See all the researchers that are part of the study.
          </Subtitle>
        </div>
        <div>
          <AddResearcherButton onClick={setOpenAddResearcherModal}>
            <GroupAddRoundedIcon fontSize="small" />
            <Typography variant="h5">Add researcher</Typography>
          </AddResearcherButton>
        </div>
      </Top>
      <ResearchersContainer>
        {researchersLoading || studyDetailsLoading || userLoading
          ? [0, 1, 2].map(() => <ResearcherItemSkeleton key={uuidv4()} />)
          : researchers?.map(researcher => (
              <ResearcherItem
                disabled={
                  researcher.id === studyDetails.ownerId.stringRepresentation
                  // CARP core type defines accountId it as UUID, after serialization it will be string
                  || researcher.id === (user.accountId as unknown as string)
                }
                key={uuidv4()}
                researcher={researcher}
              />
            ))}
      </ResearchersContainer>
    </StyledCard>
  );
};

export default StudyResearchers;
