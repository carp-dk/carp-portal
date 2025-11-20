import { Button, Card, Divider, Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { getDeviceStatusColor, getDeploymentStatusColor } from '@Utils/utility';
import { Link } from 'react-router-dom';

export const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '16px 24px',
  marginBottom: 32,
  borderRadius: 8,
  overflow: 'initial',
  position: 'relative',
});

export const Left = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export const Right = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 16,
});

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  borderWidth: 1,
  width: 1,
  marginRight: 0,
  marginLeft: 0,
  height: 20,
}));

export const RemindersContainer = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  textTransform: 'none',
});

export const ReminderText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const Name = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const Email = styled(Typography)(({ theme }) => ({
  marginLeft: 16,
  color: theme.palette.grey[500],
}));

export const PrimaryText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  color: theme.palette.primary.main,
}));

export const SecondaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const DeploymentStatusContainer = styled('div')({
  'display': 'flex',
  'alignItems': 'center',
  'gap': 4,
  'position': 'relative',
  '&:hover': {
    '& > div:last-of-type': {
      display: 'flex',
      width: 'auto',
    },
  },
});

export const DeploymentIdContainer = styled('div')({
  'display': 'flex',
  'alignItems': 'center',
  'gap': 8,
  '& > button:last-of-type': {
    paddingBottom: 0,
  },
});

export const NameContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

export const RoleContainer = styled('div')({
  alignItems: 'center',
  display: 'flex',
  gap: 6,
});

export const StatusContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const ActivityDataContainer = styled('div')({
  gridArea: 'graph',
  display: 'flex',
  justifyContent: 'space-between',
  gap: 46,
  marginTop: 26,
  width: '100%',
});

export const StyledDeploymentStatusDot = styled('div', {
  shouldForwardProp: prop => prop !== 'status',
})<{ status?: string }>(({ status }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: getDeploymentStatusColor(status),
  marginLeft: 6,
  flexShrink: 0,
}));

export const AccountIcon = styled('div')(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.company.isotype,
  borderRadius: '50%',
  position: 'relative',
}));

export const Initials = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'absolute',
  top: '52%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

export const StyledDeviceStatusDot = styled('div', {
  shouldForwardProp: prop => prop !== 'status',
})<{ status?: string }>(({ status }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: getDeviceStatusColor(status),
}));

export const TopContainer = styled('div')({
  borderRadius: '16px',
  display: 'grid',
  gridTemplateColumns: '20% 1fr',
  alignItems: 'center',
  marginBottom: 16,
  width: '100%',
  padding: '2px 0',
});

export const ParticipantsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const StyledContainer = styled(Link)({
  'display': 'grid',
  'gridTemplateColumns':
    '28px minmax(0px, 172px) minmax(0px, 172px) 0.75fr 1fr 1fr 2fr',
  'overflow': 'hidden',
  'alignItems': 'center',
  'columnGap': 15,
  'textDecoration': 'none',
  'color': 'inherit',
  'padding': '12px 4px',
  'borderRadius': 16,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

export const DownloadButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  textTransform: 'none',
  gap: 4,
}));
