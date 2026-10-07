import { ModalBox as BaseModalBox } from '@Components/Modal/styles';
import { Button, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export { CancelButton, ModalActions } from '@Components/Modal/styles';

export const ModalBox = styled(BaseModalBox)({
  padding: 24,
  maxWidth: 420,
  textAlign: 'center',
});

export const ModalTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 4,
}));

export const ModalDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const ViewButton = styled(Button)(({ theme }) => ({
  padding: 1,
  minWidth: 20,
  alignSelf: 'flex-start',
  color: theme.palette.primary.main,
  cursor: 'pointer',
}));

export const LargeImage = styled('img')({
  width: '100%',
  maxWidth: 280,
  margin: '16px auto 0',
  display: 'block',
});

export const SignupUrl = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  wordBreak: 'break-all',
  marginTop: 8,
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[700]}`,
  borderRadius: 18,
  textTransform: 'none',
  padding: '8px 18px',
  color: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 8,
}));
