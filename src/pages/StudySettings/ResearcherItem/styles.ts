import { Button, Card, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  padding: 20,
  gap: 20,
});

export const Middle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 10,
});

export const CloseButton = styled(Button)({
  'padding': 8,
  'flexGrow': 0,
  'display': 'flex',
  'minWidth': 0,
  '&:disabled': {
    opacity: 0,
  },
});

export const AccountIcon = styled('div')(({ theme }) => ({
  width: 44,
  height: 44,
  backgroundColor: theme.palette.company.isotype,
  borderRadius: '50%',
  position: 'relative',
}));

export const Initials = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  textTransform: 'uppercase',
  position: 'absolute',
  top: '52%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));
