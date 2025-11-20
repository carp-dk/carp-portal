import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div', {
  shouldForwardProp: prop =>
    prop !== 'open' && prop !== 'numberOfConnections',
})<{ open?: boolean; numberOfConnections: number }>(
  ({ open, numberOfConnections, theme }) => ({
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column',
    height: open ? `calc(${numberOfConnections}*52px)+42px` : '42px',
    overflow: 'hidden',
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
);

export const DropdownBar = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  borderBottom: `1px solid ${theme.palette.secondary.main}`,
  alignItems: 'center',
  marginBottom: 12,
  cursor: 'pointer',
}));

export const DeviceName = styled(Typography)(({ theme }) => ({
  flexGrow: 2,
  color: theme.palette.text.primary,
  marginLeft: 12,
}));

export const ExpandButton = styled('div', {
  shouldForwardProp: prop => prop !== 'open',
})<{ open?: boolean }>(({ open, theme }) => ({
  padding: 0,
  minWidth: 'auto',
  display: 'block',
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  transform: open ? 'rotateX(180deg)' : 'rotateX(0deg)',
}));

export const ConnectedDeviceItem = styled('div')({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
});

export const ConnectedDevicesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 24,
  gap: 12,
});
