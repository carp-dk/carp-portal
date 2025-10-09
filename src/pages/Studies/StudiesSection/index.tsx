import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import { useStudies } from "@Utils/queries/studies";
import { StudyOverview } from "@carp-dk/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudyActionCard from "../StudyActionCard";
import { CardsContainer, StyledContainer, Title } from "./styles";
import StudyCard, { SkeletonCard } from "../StudyCard";

import CreateStudyModal from "./CreateStudyModal";
import {useCurrentUser} from "@Utils/queries/auth";

const StudiesSection = () => {
  const {
    data: studies,
    isLoading: studiesLoading,
    error: studiesError,
  } = useStudies();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useCurrentUser();

  const selectStudyHandler = (studyId: string) => {
    navigate(`/studies/${studyId}/overview`);
  };

  const openCreateStudyModal = () => {
    setModalOpen(true);
  };

  const closeCreateStudyModal = () => {
    setModalOpen(false);
  };

  const getStudyStatus = (study: StudyOverview) => {
    if (study.canDeployToParticipants) {
      return "Live";
    }
    if (study.studyProtocolId) {
      return "Ready";
    }
    return "Draft";
  };

  const isResearcher = user?.role?.includes('RESEARCHER') ?? false;

  if (studiesError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading studies"
        error={studiesError}
      />
    );
  }

  return (
    <StyledContainer>
      <Title variant="h2">Your CARP studies</Title>
      <CardsContainer>
        {isResearcher && (
            <StudyActionCard
                actionText={"Add study"}
                onClick={openCreateStudyModal}
            />
        )}
        {studiesLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          studies
            ?.toSorted((a, b) => (a.createdOn < b.createdOn ? 1 : -1))
            .map((study: StudyOverview) => {
              return (
                <StudyCard
                  key={study.studyId}
                  study={study}
                  description={study.description}
                  status={getStudyStatus(study)}
                  onClick={() => selectStudyHandler(study.studyId)}
                />
              );
            })
        )}
      </CardsContainer>
      <CreateStudyModal onClose={closeCreateStudyModal} open={modalOpen} />
    </StyledContainer>
  );
};

export default StudiesSection;
