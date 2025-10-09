import DeleteConfirmationModal from "@Components/DeleteConfirmationModal";
import { User } from "@carp-dk/client";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Skeleton, Typography } from "@mui/material";
import { useRemoveResearcherAssistantFromStudy } from "@Utils/queries/studies";
import { getRandomNumber } from "@Utils/utility";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AccountIcon,
  CloseButton,
  Initials,
  Middle,
  StyledCard,
} from "./styles";

type Props = {
  researcher: User;
  disabled?: boolean;
};

const ResearcherItem = ({ researcher, disabled }: Props) => {
  const { id: studyId } = useParams();
  const removeResearcher = useRemoveResearcherAssistantFromStudy(studyId);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);

  const handleRemoveResearcher = () => {
    removeResearcher.mutate(researcher.email);
  };

  const confirmationModalProps = {
    open: openDeleteConfirmationModal,
    onClose: () => setOpenDeleteConfirmationModal(false),
    onConfirm: handleRemoveResearcher,
    title: "Remove a Researcher",
    description:
      "The researcher will be permanently removed and will no longer be part of the Study.",
    boldText: "You can not undo this action.",
    checkboxLabel: "I'm sure I want to remove it",
    actionButtonLabel: "Remove",
  };

  return (
    <StyledCard elevation={2}>
      <AccountIcon>
        <Initials variant="h3">
          {!researcher.firstName || !researcher.lastName
            ? researcher.role[0]
            : `${researcher.firstName[0]}${researcher.lastName[0]}`}
        </Initials>
      </AccountIcon>
      <Middle>
        <Typography variant="h4">
          {researcher.firstName} {researcher.lastName}
        </Typography>
        <Typography variant="h5">{researcher.email}</Typography>
      </Middle>
      <CloseButton
        disabled={disabled}
        color="error"
        onClick={() => setOpenDeleteConfirmationModal(true)}
      >
        <CloseRoundedIcon color="error" fontSize="small" />
      </CloseButton>
      <DeleteConfirmationModal
        open={confirmationModalProps.open}
        onClose={confirmationModalProps.onClose}
        onConfirm={confirmationModalProps.onConfirm}
        title={confirmationModalProps.title}
        description={confirmationModalProps.description}
        boldText={confirmationModalProps.boldText}
        checkboxLabel={confirmationModalProps.checkboxLabel}
        actionButtonLabel={confirmationModalProps.actionButtonLabel}
      />
    </StyledCard>
  );
};

export const ResearcherItemSkeleton = () => {
  return (
    <StyledCard elevation={2}>
      <Skeleton
        animation="wave"
        variant="circular"
        width={40}
        height={40}
        sx={{ mr: "8px", ml: "6px" }}
      />
      <Middle>
        <Skeleton
          animation="wave"
          variant="text"
          width={`${getRandomNumber(40, 80)}%`}
          height={26}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width={`${getRandomNumber(40, 80)}%`}
          height={18}
        />
      </Middle>
      <CloseButton />
    </StyledCard>
  );
};

export default ResearcherItem;
