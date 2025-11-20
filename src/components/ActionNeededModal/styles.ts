import { Button, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

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
  maxWidth: 420,
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: 16,
}));

export const DescriptionContainer = styled('div')({
  marginBottom: 24,
});

export const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'inline',
}));

export const Bottom = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
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
