import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import { useParticipantGroupsStatus } from "@Utils/queries/participants";
import carpDeployments from "@cachet/carp-deployments-core";
import carpStudies from "@cachet/carp-studies-core";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Typography } from "@mui/material";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSkeleton from "../LoadingSkeleton";
import {
  ParticipantsRow,
  StyledButton,
  StyledCard,
  StyledNumber,
  StyledTitle,
  Top,
} from "./styles";
import ParticipantGroupStatus = carpStudies.dk.cachet.carp.studies.application.users.ParticipantGroupStatus;

const { DeviceDeploymentStatus } =
  carpDeployments.dk.cachet.carp.deployments.application;

const { PrimaryDeviceConfiguration } =
  carpDeployments.dk.cachet.carp.common.application.devices;

const Participants = () => {
  const navigate = useNavigate();
  const { id: studyId } = useParams();
  const {
    data: participantsStatus,
    isLoading: participantsStatusLoading,
    error: participantsStatusError,
  } = useParticipantGroupsStatus(studyId);

  const numberOfRegisteredDevices = useMemo(() => {
    if (!participantsStatus) return 0;
    return participantsStatus
      .filter((ps) => ps instanceof ParticipantGroupStatus.InDeployment)
      .map((ps: ParticipantGroupStatus.InDeployment) => {
        return ps.studyDeploymentStatus.deviceStatusList
          .toArray()
          .filter(
            (device) =>
              device instanceof DeviceDeploymentStatus.Registered &&
              device.device instanceof PrimaryDeviceConfiguration,
          ).length;
      })
      .reduce((a, b) => a + b, 0);
  }, [participantsStatus]);

  const numberOfDeployedDevices = useMemo(() => {
    if (!participantsStatus) return 0;
    return participantsStatus
      .filter((ps) => ps instanceof ParticipantGroupStatus.InDeployment)
      .map((ps: ParticipantGroupStatus.InDeployment) => {
        return ps.studyDeploymentStatus.deviceStatusList
          .toArray()
          .filter(
            (device) =>
              device instanceof DeviceDeploymentStatus.Deployed &&
              device.device instanceof PrimaryDeviceConfiguration,
          ).length;
      })
      .reduce((a, b) => a + b, 0);
  }, [participantsStatus]);

  const numberOfUnregisteredDevices = useMemo(() => {
    if (!participantsStatus) return 0;
    return participantsStatus
      .filter((ps) => ps instanceof ParticipantGroupStatus.InDeployment)
      .map((ps: ParticipantGroupStatus.InDeployment) => {
        return ps.studyDeploymentStatus.deviceStatusList
          .toArray()
          .filter(
            (device) =>
              device instanceof DeviceDeploymentStatus.Unregistered &&
              device.device instanceof PrimaryDeviceConfiguration,
          ).length;
      })
      .reduce((a, b) => a + b, 0);
  }, [participantsStatus]);

  const numberOfNeedsRedeploymentDevices = useMemo(() => {
    if (!participantsStatus) return 0;
    return participantsStatus
      .filter((ps) => ps instanceof ParticipantGroupStatus.InDeployment)
      .map((ps: ParticipantGroupStatus.InDeployment) => {
        return ps.studyDeploymentStatus.deviceStatusList
          .toArray()
          .filter(
            (device) =>
              device instanceof DeviceDeploymentStatus.NeedsRedeployment &&
              device.device instanceof PrimaryDeviceConfiguration,
          ).length;
      })
      .reduce((a, b) => a + b, 0);
  }, [participantsStatus]);

  const numberOfParticipants = useMemo(() => {
    if (!participantsStatus) return 0;
    return participantsStatus
      .filter((ps) => ps instanceof ParticipantGroupStatus.InDeployment)
      .map((ps: ParticipantGroupStatus.InDeployment) => {
        return ps.studyDeploymentStatus.deviceStatusList
          .toArray()
          .filter((g) => g.device instanceof PrimaryDeviceConfiguration).length;
      })
      .reduce((a, b) => a + b, 0);
  }, [participantsStatus]);

  if (participantsStatusLoading) return <LoadingSkeleton />;
  if (participantsStatusError)
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading study status"
        error={participantsStatusError}
      />
    );

  return (
    <StyledCard elevation={2}>
      <Top>
        <StyledTitle variant="h2">Participants</StyledTitle>
        <StyledButton
          onClick={() =>
            navigate(`/studies/${studyId}/participants/deployments`)
          }
          variant="outlined"
        >
          <ManageAccountsIcon fontSize="small" color="primary" />
          <Typography variant="h5">Manage</Typography>
        </StyledButton>
      </Top>
      <ParticipantsRow isFirst>
        <StyledNumber status="Participants" variant="h3">
          {numberOfParticipants}
        </StyledNumber>
        <Typography variant="h4">Participants</Typography>
      </ParticipantsRow>
      <ParticipantsRow>
        <StyledNumber status="Deployed" variant="h3">
          {numberOfDeployedDevices}
        </StyledNumber>
        <Typography variant="h4">Deployed</Typography>
      </ParticipantsRow>
      <ParticipantsRow>
        <StyledNumber status="Registered" variant="h3">
          {numberOfRegisteredDevices}
        </StyledNumber>
        <Typography variant="h4">Registered</Typography>
      </ParticipantsRow>
      <ParticipantsRow>
        <StyledNumber status="Unregistered" variant="h3">
          {numberOfUnregisteredDevices}
        </StyledNumber>
        <Typography variant="h4">Unregistered</Typography>
      </ParticipantsRow>
      <ParticipantsRow>
        <StyledNumber status="NeedsRedeployment" variant="h3">
          {numberOfNeedsRedeploymentDevices}
        </StyledNumber>
        <Typography variant="h4">Needs Redeployment</Typography>
      </ParticipantsRow>
    </StyledCard>
  );
};

export default Participants;
