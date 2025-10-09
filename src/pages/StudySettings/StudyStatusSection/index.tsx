import CopyButton from "@Components/Buttons/CopyButton";
import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import DeleteConfirmationModal from "@Components/DeleteConfirmationModal";
import {
  useDeleteStudy,
  useSetStudyLive,
  useStudyDetails,
  useStudyStatus,
} from "@Utils/queries/studies";
import { formatDateTime } from "@Utils/utility";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Skeleton, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudyStatus } from "@carp-dk/client";
import StartStudyConfirmationModal from "../StartStudyConfirmationModal";
import {
  Container,
  CreationInfoContainer,
  DeleteStudyButton,
  GoLiveButton,
  HorizontalContainer,
  IDContainer,
  IDsContainer,
  InnerLeftContainer,
  Left,
  Right,
  Status,
  StatusDescription,
  StatusName,
  StyledDivider,
  StyledStatusDot,
} from "./styles";
import {useCurrentUser} from "@Utils/queries/auth";

const StudyStatusSectionSkeleton: React.FC = () => {
  const isDownMd = useMediaQuery("(max-width:1250px)");
  return (
    <Container>
      <Left>
        <HorizontalContainer>
          <Status>
            <Skeleton
              animation="wave"
              variant="circular"
              width={28}
              height={28}
            />
            <Skeleton animation="wave" variant="text" width={52} />
          </Status>
        </HorizontalContainer>
        <StatusDescription variant="h6">
          <Skeleton animation="wave" variant="text" width={400} />
          <Skeleton animation="wave" variant="text" width={320} />
        </StatusDescription>
      </Left>
      {isDownMd && <StyledDivider isHorizontal />}
      <Right>
        <InnerLeftContainer>
          <CreationInfoContainer>
            <Skeleton animation="wave" variant="text" width={70} />
            <Skeleton animation="wave" variant="text" width={110} />
          </CreationInfoContainer>
          <DeleteStudyButton disabled onClick={() => {}}>
            <Skeleton animation="wave" variant="text" width={70} />
          </DeleteStudyButton>
        </InnerLeftContainer>
        {!isDownMd && <StyledDivider />}
        <IDsContainer>
          <IDContainer>
            <Skeleton animation="wave" variant="text" width={60} />
            <Skeleton animation="wave" variant="text" width={256} />
          </IDContainer>
          <IDContainer>
            <Skeleton animation="wave" variant="text" width={60} />
            <Skeleton animation="wave" variant="text" width={256} />
          </IDContainer>
        </IDsContainer>
      </Right>
    </Container>
  );
};

const StudyStatusSection: React.FC = () => {
  const draftStudyStatusDescription =
    "In order to go live study you need to fill out all the required data and invitation.";
  const readyStudyStatusDescription =
    "Once the study is live you will not be able to change the study settings.";
  const liveStudyStatusDescription = "";
  let currentStudyStatus: "Draft" | "Ready" | "Live" = "Draft";
  let currentStudyStatusDescription = "";

  const navigate = useNavigate();
  const isDownMd = useMediaQuery("(max-width:1250px)");
  const { id: studyId } = useParams();
  const {
    data: studyStatus,
    isLoading: studyStatusIsLoading,
    error: studyStatusError,
  } = useStudyStatus(studyId);
  const {
    data: studyDetails,
    isLoading: studyDetailsIsLoading,
    error: studyDetailsError,
  } = useStudyDetails(studyId);
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const setStudyLive = useSetStudyLive();
  const deleteStudy = useDeleteStudy();
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);
  const [openStartStudyConfirmationModal, setOpenStartStudyConfirmationModal] =
    useState(false);

  useEffect(() => {
    if (deleteStudy.isSuccess) {
      navigate("/studies");
    }
  }, [deleteStudy.isSuccess]);

  if (studyStatusIsLoading || studyDetailsIsLoading) {
    return <StudyStatusSectionSkeleton />;
  }

  if (studyStatusError || studyDetailsError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading study status"
        error={studyDetailsError ?? studyStatusError}
      />
    );
  }

  if (studyStatus instanceof StudyStatus.Configuring) {
    if (studyStatus.canGoLive) {
      currentStudyStatus = "Ready";
      currentStudyStatusDescription = readyStudyStatusDescription;
    } else {
      currentStudyStatus = "Draft";
      currentStudyStatusDescription = draftStudyStatusDescription;
    }
  } else {
    currentStudyStatus = "Live";
    currentStudyStatusDescription = liveStudyStatusDescription;
  }

  const handleDeleteStudy = () => {
    setOpenDeleteConfirmationModal(false);
    deleteStudy.mutateAsync(studyId).then(() => navigate("/studies"));
  };

  const handleStartStudy = () => {
    setOpenStartStudyConfirmationModal(false);
    setStudyLive.mutate(studyId);
  };

  const confirmationModalProps = {
    open: openDeleteConfirmationModal,
    onClose: () => setOpenDeleteConfirmationModal(false),
    onConfirm: handleDeleteStudy,
    title: "Delete Study",
    description:
      "The study will be permanently deleted and will no longer appear on your Study page.",
    boldText: "You can not undo this action.",
    checkboxLabel: "I'm sure I want to delete it",
    actionButtonLabel: "Delete",
  };

  const isStudyOwner = studyDetails?.ownerId?.stringRepresentation
      && user?.accountId?.stringRepresentation &&
      studyDetails?.ownerId?.stringRepresentation == user?.accountId?.stringRepresentation

  return (
    <Container>
      <Left>
        <HorizontalContainer>
          <Status status={currentStudyStatus}>
            <StyledStatusDot status={currentStudyStatus} />
            <StatusName variant="h6" status={currentStudyStatus}>
              {currentStudyStatus}
            </StatusName>
          </Status>
          <GoLiveButton
            disabled={currentStudyStatus !== "Ready"}
            onClick={() => setOpenStartStudyConfirmationModal(true)}
          >
            <PlayArrowRoundedIcon fontSize="small" />
            <Typography variant="h5">GO LIVE</Typography>
          </GoLiveButton>
        </HorizontalContainer>
        <StatusDescription variant="h6">
          {currentStudyStatusDescription}
        </StatusDescription>
      </Left>
      {isDownMd && <StyledDivider isHorizontal />}
      <Right>
        <InnerLeftContainer>
          <CreationInfoContainer>
            <Typography variant="h6">Created on</Typography>
            <Typography variant="h6">
              {formatDateTime(studyStatus.createdOn.toEpochMilliseconds())}
            </Typography>
          </CreationInfoContainer>
          {isStudyOwner && (
              <DeleteStudyButton
                  onClick={() => setOpenDeleteConfirmationModal(true)}
              >
                <DeleteForeverRoundedIcon fontSize="small" />
                <Typography variant="h5">Delete Study</Typography>
              </DeleteStudyButton>
          )}
        </InnerLeftContainer>
        {!isDownMd && <StyledDivider />}
        <IDsContainer>
          <IDContainer>
            <Typography variant="h6">Owner ID:</Typography>
            <Typography variant="h6">
              {studyDetails.ownerId.stringRepresentation}
            </Typography>
            <CopyButton
              textToCopy={studyDetails.ownerId.stringRepresentation}
              idType="Owner"
            />
          </IDContainer>
          <IDContainer>
            <Typography variant="h6">Study ID:</Typography>
            <Typography variant="h6">{studyId}</Typography>
            <CopyButton textToCopy={studyId} idType="Study" />
          </IDContainer>
        </IDsContainer>
      </Right>
      <DeleteConfirmationModal
        open={confirmationModalProps.open}
        title={confirmationModalProps.title}
        description={confirmationModalProps.description}
        boldText={confirmationModalProps.boldText}
        checkboxLabel={confirmationModalProps.checkboxLabel}
        actionButtonLabel={confirmationModalProps.actionButtonLabel}
        onClose={confirmationModalProps.onClose}
        onConfirm={confirmationModalProps.onConfirm}
      />
      <StartStudyConfirmationModal
        open={openStartStudyConfirmationModal}
        onClose={() => setOpenStartStudyConfirmationModal(false)}
        onConfirm={() => handleStartStudy()}
      />
    </Container>
  );
};

export default StudyStatusSection;
