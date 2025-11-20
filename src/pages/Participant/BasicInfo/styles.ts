import { Button, Card, Divider, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledCard = styled(Card)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 24px',
  marginBottom: 32,
  borderRadius: 8,
});

export const Left = styled('div')({
  display: 'grid',
  gridTemplateColumns: '48px 1fr auto auto auto',
  alignItems: 'center',
});

export const Right = styled('div')({
  'display': 'flex',
  'alignItems': 'center',
  'gap': 8,
  '& button': {
    paddingBottom: 10,
  },
});

export const AccountIcon = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: theme.palette.company.isotype,
  borderRadius: '50%',
  position: 'relative',
  marginRight: 8,
}));

export const Initials = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'absolute',
  top: '52%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  borderWidth: 1,
  width: 1,
  marginRight: 10,
  marginLeft: 10,
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

export const SecondaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
