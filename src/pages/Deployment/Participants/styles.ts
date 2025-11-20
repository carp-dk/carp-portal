import { Stack, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const AccountIcon = styled('div')(({ theme }) => ({
  width: 28,
  height: 28,
  flexShrink: 0,
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

export const ParticipantRow = styled(Stack)({
  'gap': 16,
  'display': 'grid',
  'gridTemplateColumns': '25% 20% 20%',
  'cursor': 'pointer',
  'borderRadius': 16,
  ':hover': {
    backgroundColor: '#EDEDED',
  },
});
