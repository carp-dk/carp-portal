import GeneratedAccountLabel from '@Components/GeneratedAccountLabel';
import {
  calculateDaysPassedFromDate,
  getDeviceIcon,
  getRandomNumber,
} from '@Utils/utility';
import {
  DeviceStatus,
  ParticipantDataInput,
  ParticipantStatus,
} from '@carp-dk/client';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PersonIcon from '@mui/icons-material/Person';
import { Skeleton, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  AccountIcon,
  EmailContainer,
  Initials,
  NameContainer,
  RoleContainer,
  StatusContainer,
  StyledContainer,
  StyledStatusDot,
} from './styles';

type Props = {
  participantData: ParticipantDataInput;
  deploymentId: string;
  participantStatus: ParticipantStatus;
  deviceStatusList: DeviceStatus[];
};

const ParticipantRecord = ({
  participantData,
  deploymentId,
  participantStatus,
  deviceStatusList,
}: Props) => {
  const { t } = useTranslation();
  const { id: studyId } = useParams();

  const participantRole
    = participantStatus.assignedParticipantRoles.roleNames[0];
  const participantDeviceRoleName
    = participantStatus.assignedPrimaryDeviceRoleNames[0];
  const primaryDevice = deviceStatusList.find(
    device => device.device.roleName === participantDeviceRoleName,
  );
  const participantDeviceType = primaryDevice.device.__type;
  const deviceStatus = primaryDevice.__type.split('.').pop();

  const lastDataUpload = useMemo(() => {
    const lastData = participantData.dateOfLastDataUpload;
    if (!lastData) {
      return '';
    }
    const elapsedDays = calculateDaysPassedFromDate(lastData.toString());
    return t('common:last_data', { count: elapsedDays });
  }, [participantData.dateOfLastDataUpload]);

  return (
    <StyledContainer
      to={`/studies/${studyId}/deployments/${deploymentId}/participants/${participantData.participantId}`}
    >
      <EmailContainer>
        <AccountIcon>
          <Initials variant="h4">
            {!participantData.firstName
              ? participantRole[0]
              : `${participantData.firstName[0]}${participantData.lastName[0]}`}
          </Initials>
        </AccountIcon>
        <Typography variant="h6" noWrap>
          {participantData.email ?? <GeneratedAccountLabel />}
        </Typography>
      </EmailContainer>
      <NameContainer>
        <>
          <PersonIcon fontSize="small" />
          {participantData.firstName && (
            <Typography variant="h6" noWrap>
              {participantData.firstName}
              {' '}
              {participantData.lastName}
            </Typography>
          )}
        </>
      </NameContainer>
      <RoleContainer>
        <ContactPageIcon fontSize="small" />
        <Typography variant="h6">{participantRole}</Typography>
      </RoleContainer>
      <RoleContainer>
        {getDeviceIcon(participantDeviceType)}
        <Typography variant="h6">{participantDeviceRoleName}</Typography>
      </RoleContainer>
      <StatusContainer>
        <StyledStatusDot status={deviceStatus} />
        <Typography variant="h6">{deviceStatus}</Typography>
      </StatusContainer>
      <Typography variant="h6">{lastDataUpload}</Typography>
    </StyledContainer>
  );
};

export const ParticipantRecordSkeleton = () => {
  return (
    <StyledContainer to="">
      <Skeleton animation="wave" variant="circular" width={36} height={36} />
      <Skeleton
        animation="wave"
        variant="text"
        width={`${getRandomNumber(40, 80)}%`}
        height={20}
      />
      <NameContainer>
        <Skeleton animation="wave" variant="circular" width={14} height={14} />
        <Skeleton
          animation="wave"
          variant="text"
          width={getRandomNumber(50, 100)}
          height={20}
        />
      </NameContainer>
      <RoleContainer>
        <Skeleton animation="wave" variant="circular" width={14} height={14} />
        <Skeleton
          animation="wave"
          variant="text"
          width={getRandomNumber(30, 60)}
          height={20}
        />
      </RoleContainer>
      <RoleContainer>
        <Skeleton animation="wave" variant="circular" width={14} height={14} />
        <Skeleton
          animation="wave"
          variant="text"
          width={getRandomNumber(30, 60)}
          height={20}
        />
      </RoleContainer>
      <StatusContainer>
        <Skeleton
          sx={{ m: '0px 8px 0px 4px' }}
          animation="wave"
          variant="circular"
          width={20}
          height={20}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width={getRandomNumber(30, 60)}
          height={20}
        />
      </StatusContainer>
      <Skeleton animation="wave" variant="text" width={120} height={20} />
    </StyledContainer>
  );
};

export default ParticipantRecord;
