import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { ModalBox as BaseModalBox } from '@Components/Modal/styles';

export {
  CancelButton,
  DoneButton,
  ModalActions,
  TextFieldLabel,
} from '@Components/Modal/styles';

export const ModalBox = styled(BaseModalBox)({
  maxWidth: 550,
  padding: 24,
});

export const ModalTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 4,
}));

export const ModalDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const ModalContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

export const ModalContent = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});
