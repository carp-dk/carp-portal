import { ModalBox as BaseModalBox } from '@Components/Modal/styles';
import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export {
  CancelButton,
  DoneButton,
  ModalActions,
} from '@Components/Modal/styles';

export const ModalBox = styled(BaseModalBox)({
  padding: 24,
  maxWidth: 700,
});

export const ModalTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 4,
}));

export const ModalDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const ModalContent = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const SecondaryCellText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.common.white,
}));
