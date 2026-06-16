import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export {
  CancelButton,
  DoneButton,
  ModalActions,
  ModalBox,
  ModalContainer,
  ModalContent,
  ModalTitle,
  TextFieldLabel,
} from '@Components/Modal/styles';

export const ModalDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.dark,
}));
