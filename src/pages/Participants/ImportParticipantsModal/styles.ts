import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export {
  CancelButton,
  DoneButton,
  ModalActions,
  ModalBox,
  ModalContainer,
  ModalTitle,
  TextFieldLabel,
} from '@Components/Modal/styles';

export const ModalDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: 36,
}));

export const Container = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
});

export const ModalContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'fixHeight',
})<{ fixHeight?: boolean }>(({ fixHeight }) => ({
  flexGrow: 1,
  gap: 8,
  display: 'flex',
  flexDirection: 'column',
  '& > *:last-child': {
    flex: '1 0',
  },
  '& > *:last-child > div': {
    height: fixHeight ? '100%' : 272,
  },
}));

export const InvalidEmail = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: 600,
}));

export const InvalidEmails = styled('div')({
  overflowY: 'auto',
  maxHeight: 272,
});
