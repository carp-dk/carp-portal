import { ParticipantGroup } from '@carp-dk/client';
import CopyButton from '@Components/Buttons/CopyButton';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Skeleton, Typography } from '@mui/material';
import { getDeploymentDisplayName } from '@Utils/utility';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DateTooltip from '../DateTooltip';
import ParticipantRecord from '../ParticipantRecord';
import {
  DeploymentTooltip,
  HorizontalStatusContainer,
  IdContainer,
  MinimizeButton,
  Names,
  ParticipantsContainer,
  StyledCard,
  StyledDivider,
  StyledStatusDot,
  TopContainer,
} from './styles';

interface Props {
  deployment: ParticipantGroup;
  representationName?: string | null;
  openCardCount: number;
  allDeploymentCount: number;
  setOpenCardCount: (count: number) => void;
}

const DeploymentCard = ({
  deployment,
  representationName,
  openCardCount,
  setOpenCardCount,
  allDeploymentCount,
}: Props) => {
  const { id: studyId } = useParams();
  const navigate = useNavigate();

  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    if (openCardCount === allDeploymentCount) setIsCardOpen(true);
    if (openCardCount === 0) setIsCardOpen(false);
  }, [openCardCount]);

  const handleCardToggle = (event) => {
    event.stopPropagation();
    setIsCardOpen((prevIsCardOpen) => {
      const newOpenCardCount = prevIsCardOpen
        ? openCardCount - 1
        : openCardCount + 1;
      setOpenCardCount(newOpenCardCount);
      return !prevIsCardOpen;
    });
  };

  // Resolve the name (representation name → participant names → generated)
  // via the shared helper so the list and detail views stay consistent, then
  // truncate for the card layout.
  const { name, isGenerated } = useMemo(
    () => getDeploymentDisplayName(deployment, representationName),
    [deployment, representationName],
  );
  const displayName = name.length > 30 ? `${name.slice(0, 30)}...` : name;
  return (
    <StyledCard open={isCardOpen} elevation={2}>
      <TopContainer>
        <Names
          variant="h6"
          noWrap
          onClick={() =>
            navigate(
              `/studies/${studyId}/deployments/${deployment.participantGroupId}`,
            )
          }
        >
          {isGenerated ? <i>{displayName}</i> : displayName}
        </Names>
        <StyledDivider />
        <HorizontalStatusContainer>
          <Typography variant="h6">Deployment status:</Typography>
          <StyledStatusDot
            status={deployment.deploymentStatus.__type.split('.').pop()}
          />
          <Typography variant="h6">
            {deployment.deploymentStatus.__type
              .split('.')
              .pop()
              .replaceAll(/([a-z])([A-Z])/g, '$1 $2')}
          </Typography>
          <DateTooltip
            invitedAt={deployment.deploymentStatus.createdOn}
            startedAt={
              deployment.deploymentStatus.startedOn &&
              deployment.deploymentStatus.startedOn
            }
            stoppedAt={
              deployment.deploymentStatus.stoppedOn &&
              deployment.deploymentStatus.stoppedOn
            }
          />
        </HorizontalStatusContainer>
        <DeploymentTooltip
          title={
            <Typography variant="h6">
              Deployment ID: {deployment.participantGroupId}
            </Typography>
          }
          placement="top"
          arrow
        >
          <IdContainer>
            <Typography variant="h6">Deployment ID:</Typography>
            <Typography
              variant="h6"
              sx={{
                width: '105px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                direction: 'rtl',
                textAlign: 'left',
              }}
            >
              {deployment.participantGroupId}
            </Typography>
            <CopyButton
              textToCopy={deployment.participantGroupId}
              idType="Deployment"
            />
          </IdContainer>
        </DeploymentTooltip>
        <MinimizeButton
          disableRipple
          onClick={(event) => handleCardToggle(event)}
          open={isCardOpen}
        >
          <KeyboardArrowDownRoundedIcon
            sx={{
              transform: isCardOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.3s ease',
            }}
          />
        </MinimizeButton>
      </TopContainer>
      <ParticipantsContainer>
        {isCardOpen &&
          deployment.participants.map((participant) => (
            <ParticipantRecord
              key={participant.participantId}
              deploymentId={deployment.participantGroupId}
              participantData={participant}
              participantStatus={deployment.deploymentStatus.participantStatusList.find(
                (status) => status.participantId === participant.participantId,
              )}
              deviceStatusList={deployment.deploymentStatus.deviceStatusList}
            />
          ))}
      </ParticipantsContainer>
    </StyledCard>
  );
};

export const DeploymentSkeletonCard = () => {
  return (
    <StyledCard open={false} elevation={2}>
      <TopContainer>
        <Skeleton animation="wave" variant="text" width={280} height={24} />
        <StyledDivider />
        <HorizontalStatusContainer>
          <Skeleton animation="wave" variant="text" width={82} height={24} />
          <Skeleton animation="wave" variant="text" width={48} height={24} />
          <Skeleton
            animation="wave"
            variant="circular"
            width={14}
            height={14}
          />
        </HorizontalStatusContainer>
        <IdContainer>
          <Skeleton animation="wave" variant="text" width={56} height={24} />
          <Skeleton animation="wave" variant="text" width={260} height={24} />
          <Skeleton
            sx={{ ml: '2px' }}
            variant="rounded"
            animation="wave"
            width={14}
            height={19}
          />
        </IdContainer>
        <MinimizeButton disableRipple onClick={() => {}} open={false}>
          <KeyboardArrowDownRoundedIcon
            sx={{
              transform: 'rotate(-90deg)',
            }}
          />
        </MinimizeButton>
      </TopContainer>
      <ParticipantsContainer />
    </StyledCard>
  );
};

export default DeploymentCard;
