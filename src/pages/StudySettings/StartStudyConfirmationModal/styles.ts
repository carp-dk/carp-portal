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
  fontWeight: 600,
  display: 'inline',
}));

export const BoldText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'inline',
  marginLeft: 4,
}));

export const Bottom = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export const ButtonsContainer = styled('div')({
  display: 'flex',
  gap: 16,
});

export const CancelButton = styled(Button)({
  textTransform: 'capitalize',
  borderRadius: 16,
  padding: '10px 24px',
});

export const ActionButton = styled(Button)({
  padding: '10px 24px',
  borderRadius: 16,
  textTransform: 'uppercase',
});
