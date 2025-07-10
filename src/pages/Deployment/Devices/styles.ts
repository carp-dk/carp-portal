import { Typography, Button, Stack } from '@mui/material';
import { styled } from '@Utils/theme';
import { getDeviceStatusColor } from '@Utils/utility';

export const StyledStatusDot = styled('div', {
  shouldForwardProp: prop => prop !== 'status',
})<{ status?: string }>(({ status }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: getDeviceStatusColor(status),
  flexShrink: 0,
  alignSelf: 'center',
}));

export const ModalBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  backgroundColor: theme.palette.common.white,
  borderRadius: 16,
  padding: 24,
  maxWidth: 550,
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 24,
}));

export const DescriptionContainer = styled('div')({
  marginBottom: 38,
});

export const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 400,
  display: 'inline',
}));

export const Bottom = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export const CancelButton = styled(Button)({
  textTransform: 'capitalize',
  borderRadius: 16,
  padding: '10px 24px',
});

export const ActionButton = styled(Button)({
  padding: '10px 24px',
  textTransform: 'capitalize',
  borderRadius: 16,
});

export const DeviceCard = styled(Stack)(({ theme }) => ({
  gap: '8px',
  border: '1px solid',
  borderColor: theme.palette.grey[300],
  borderRadius: '16px',
  display: 'flex',
  width: '100%',
  maxWidth: '25%',
  padding: '16px 16px',
}));

export const DeviceRow = styled(Stack)({
  gap: '16px',
  padding: '4px 8px 4px 4px',
  display: 'grid',
  gridTemplateColumns: '1fr 8px 16px',
  justifyContent: 'center',
});

export const SubDeviceRow = styled(Stack)({
  gap: '16px',
  padding: '4px 8px 4px 24px',
  display: 'grid',
  gridTemplateColumns: '1fr 8px 16px',
  justifyContent: 'center',
});

export const DeviceName = styled(Stack)({
  gap: '8px',
  display: 'grid',
  gridTemplateColumns: '18px 1fr',
});
