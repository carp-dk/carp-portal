import CopyButton from "@Components/Buttons/CopyButton";
import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import GeneratedAccountLabel from "@Components/GeneratedAccountLabel";
import SendReminderModal from "@Components/SendReminderModal";
import { useParticipantGroupsAccountsAndStatus } from "@Utils/queries/participants";
import { ParticipantData } from "@carp-dk/client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSkeleton from "../LoadingSkeleton";
import NotificationsIcon from "@mui/icons-material/NotificationsSharp";

import {
  AccountIcon,
  Email,
  Initials,
  Left,
  Name, RemindersContainer, ReminderText,
  Right,
  SecondaryText,
  StyledCard,
  StyledDivider,
} from "./styles";
import {getUser} from "@carp-dk/authentication-react";
import {useStudyDetails} from "@Utils/queries/studies";

const BasicInfo = () => {
  const [open, setOpen] = useState(false);
  const { participantId, deploymentId, id: studyId } = useParams();

  const {
    data: participantData,
    isLoading: participantDataLoading,
    error: participantError,
  } = useParticipantGroupsAccountsAndStatus(studyId);

  const {
    data: studyDetailsData,
    isLoading: studyDetailsLoading,
    error: studyDetailsError,
  } = useStudyDetails(studyId);

  const [participant, setParticipant] = useState<ParticipantData | null>(null);
  const [studyDetails, setStudyDetails] = useState<any>(null);

  useEffect(() => {
    if (!participantDataLoading && participantData && participantData.groups) {
      setParticipant(
        participantData.groups
          .find((g) => g.participantGroupId === deploymentId)
          .participants.find((p) => p.participantId === participantId),
      );
    }
  }, [participantData, participantDataLoading, participantId, deploymentId]);

  useEffect(() => {
    if (!studyDetailsLoading && studyDetailsData) {
      setStudyDetails(studyDetailsData);
    }
  }, [studyDetailsData, studyDetailsLoading, studyId]);

  const initials = useMemo(() => {
    if (participant && (participant.firstName || participant.lastName)) {
      return participant.firstName[0] + participant.lastName[0];
    }
    if (participant && participant.role) {
      return participant.role[0];
    }
    return "?";
  }, [participant]);

  const name = useMemo(() => {
    if (!participant) return "";
    return participant.email ? (
      <Name variant="h3">
        {participant.firstName ?? ""} {participant.lastName ?? ""}
      </Name>
    ) : (
      <GeneratedAccountLabel />
    );
  }, [participant]);

  if (participantDataLoading || !participant || studyDetailsLoading || !studyDetails) return <LoadingSkeleton />;

  if (participantError)
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading participant data"
        error={participantError}
      />
    );

  if (studyDetailsError)
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading study details"
        error={studyDetailsError}
      />
    );

  return (
    <StyledCard elevation={2}>
      <Left>
        <AccountIcon>
          <Initials variant="h3">{initials}</Initials>
        </AccountIcon>
        {name}
        <Email variant="h6">{participant.email}</Email>
        <StyledDivider />
        <RemindersContainer onClick={() => setOpen(true)}>
          <ReminderText variant="h6">Send a reminder</ReminderText>
          <NotificationsIcon fontSize="small" color="primary" />
        </RemindersContainer>
      </Left>
      <Right>
        <SecondaryText variant="h5">Account ID: {participantId}</SecondaryText>
        <CopyButton textToCopy={participantId} idType="Account" />
      </Right>
      <SendReminderModal
        onClose={() => setOpen(false)}
        open={open}
        to={participant.email}
        initials={initials}
        researcherEmail={getUser()?.profile?.email || ''}
        researcherName={getUser()?.profile?.name || ''}
        studyName={studyDetails?.name || ''}
      />
    </StyledCard>
  );
};

export default BasicInfo;
