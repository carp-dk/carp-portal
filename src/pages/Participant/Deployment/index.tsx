import CopyButton from '@Components/Buttons/CopyButton';
import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import GeneratedAccountLabel from '@Components/GeneratedAccountLabel';
import { useParticipantGroupsAccountsAndStatus } from '@Utils/queries/participants';
import { useCreateSummary } from '@Utils/queries/studies';
import { calculateDaysPassedFromDate, getDeviceIcon } from '@Utils/utility';
import { ParticipantDataInput } from '@carp-dk/client';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DateTooltip from '../../Deployments/DateTooltip';
import LoadingSkeleton from '../LoadingSkeleton';
import {
  AccountIcon,
  DeploymentIdContainer,
  DeploymentStatusContainer,
  DownloadButton,
  Initials,
  NameContainer,
  ParticipantsContainer,
  PrimaryText,
  Right,
  RoleContainer,
  SecondaryText,
  StatusContainer,
  StyledCard,
  StyledContainer,
  StyledDeploymentStatusDot,
  StyledDeviceStatusDot,
  StyledDivider,
  TopContainer,
} from './styles';

const Deployment = () => {
  const { id: studyId, deploymentId } = useParams();

  const {
    data: deployment,
    isLoading: deploymentIsLoading,
    error: deploymentError,
  } = useParticipantGroupsAccountsAndStatus(studyId);
  const createSummary = useCreateSummary();
  const [deploymentInformation, setDeploymentInformation] = useState<{
    groupStatus: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deploymentStatus: any;
    participants: {
      participant: ParticipantDataInput & { lastUpload: string };
      roleName: string;
      deviceInfo: {
        deviceStatus: string;
        deviceRole: string;
        deviceType: string;
      };
    }[];
  } | null>(null);

  const createAndDownloadSummary = async (event) => {
    event.stopPropagation();
    createSummary.mutateAsync({ studyId, deploymentIds: [deploymentId] });
  };

  const lastDataUpload = (lastData: Date) => {
    if (!lastData) {
      return '';
    }
    if (calculateDaysPassedFromDate(lastData.toString()) === 0) {
      return 'Last data: Today';
    }
    return `Last data: ${calculateDaysPassedFromDate(lastData.toString())} days ago`;
  };

  useEffect(() => {
    if (!deploymentIsLoading && deployment && deployment.groups) {
      const deploymentStatus = deployment.groupStatuses.find(
        gs => gs.id === deploymentId,
      );
      const group = deployment.groups.find(
        g => g.participantGroupId === deploymentId,
      );
      const participants = group.participants.map(
        (p) => {
          const participantStatus
            = group.deploymentStatus.participantStatusList.find(
              psl => psl.participantId === p.participantId,
            );
          const roleName
            = participantStatus.assignedParticipantRoles.roleNames[0];
          const deviceRole
            = participantStatus.assignedPrimaryDeviceRoleNames[0];
          const device = group.deploymentStatus.deviceStatusList.find(
            d => d.device.roleName === deviceRole && d.device.isPrimaryDevice,
          );
          // TODO: Fix this type assertion in client
          const lastUpload = lastDataUpload(
            p.dateOfLastDataUpload as unknown as Date,
          );
          return {
            participant: { ...p, lastUpload },
            roleName,
            deviceInfo: {

              deviceStatus: device.__type.split('.').pop(),
              deviceRole,

              deviceType: device.device.__type,
            },
          };
        },
        [deploymentId, deployment, deploymentIsLoading],
      );

      setDeploymentInformation({

        groupStatus: group.deploymentStatus.__type.split('.').pop(),
        deploymentStatus,
        participants,
      });
    }
  }, [deployment, deploymentIsLoading]);

  const getParticipantInitials = (participant: ParticipantDataInput) => {
    if (
      participant.firstName === ''
      || participant.lastName === ''
      || !participant.firstName
      || !participant.lastName
    ) {
      return participant.role ? participant.role[0] : '?';
    }
    return `${participant.firstName[0]}${participant.lastName[0]}`;
  };

  if (deploymentIsLoading || !deploymentInformation) return <LoadingSkeleton />;

  if (deploymentError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading deployments"
        error={deploymentError}
      />
    );
  }

  return (
    <StyledCard>
      <TopContainer>
        <PrimaryText variant="h3">Deployment</PrimaryText>
        <Right>
          <DeploymentStatusContainer>
            <SecondaryText variant="h6">Deployment status:</SecondaryText>
            <StyledDeploymentStatusDot
              status={deploymentInformation.groupStatus}
            />
            <SecondaryText variant="h6">
              {deploymentInformation.groupStatus.replace(
                /([a-z])([A-Z])/g,
                '$1 $2',
              )}
            </SecondaryText>
            <DateTooltip
              invitedAt={deploymentInformation.deploymentStatus.invitedOn}
              startedAt={deploymentInformation.deploymentStatus.startedOn}
              stoppedAt={deploymentInformation.deploymentStatus.stoppedOn}
            />
          </DeploymentStatusContainer>
          <DeploymentIdContainer>
            <SecondaryText variant="h6">
              Deployment ID:
              {' '}
              {deploymentId}
            </SecondaryText>
            <CopyButton textToCopy={deploymentId} idType="Deployment" />
          </DeploymentIdContainer>
          <StyledDivider />
          <DownloadButton onClick={createAndDownloadSummary}>
            <Typography variant="h6">Export Data</Typography>
            <FileDownloadOutlinedIcon fontSize="small" />
          </DownloadButton>
        </Right>
      </TopContainer>
      <ParticipantsContainer>
        {deploymentInformation.participants?.map(p => (
          <StyledContainer
            to={`/studies/${studyId}/deployments/${deploymentId}/participants/${p.participant.participantId}`}
            key={p.participant.participantId}
          >
            <AccountIcon>
              <Initials variant="h4">
                {getParticipantInitials(p.participant)}
              </Initials>
            </AccountIcon>
            <Typography variant="h6" noWrap maxWidth={172}>
              {p.participant.email ?? <GeneratedAccountLabel />}
            </Typography>
            <NameContainer>
              {p.participant.firstName && (
                <>
                  <PersonIcon fontSize="small" />
                  <Typography variant="h6">
                    {p.participant.firstName}
                    {' '}
                    {p.participant.lastName}
                  </Typography>
                </>
              )}
            </NameContainer>
            <RoleContainer>
              <ContactPageIcon fontSize="small" />
              <Typography variant="h6">{p.roleName}</Typography>
            </RoleContainer>
            <RoleContainer>
              {getDeviceIcon(p.deviceInfo.deviceType)}
              <Typography variant="h6">{p.deviceInfo.deviceRole}</Typography>
            </RoleContainer>
            <StatusContainer>
              <StyledDeviceStatusDot status={p.deviceInfo.deviceStatus} />
              <Typography variant="h6">{p.deviceInfo.deviceStatus}</Typography>
            </StatusContainer>
            <Right>
              <Typography variant="h6">{p.participant.lastUpload}</Typography>
            </Right>
          </StyledContainer>
        ))}
      </ParticipantsContainer>
    </StyledCard>
  );
};

export default Deployment;
