import { Button, CircularProgress, Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { ModalBox as BaseModalBox } from '@Components/Modal/styles';

export {
  CancelButton,
  ModalActions,
  TextFieldLabel,
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

export const ModalContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

export const ModalContent = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const DoneButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: '8px 24px',
  borderRadius: 16,
  '&.circle': {
    width: '20 px',
    height: '20 px',
  },
}));

export const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.common.white,
}));

export const SecondaryCellText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
