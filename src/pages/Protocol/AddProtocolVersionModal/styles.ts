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

export const ModalContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'fixHeight',
})<{ fixHeight?: boolean }>(({ fixHeight }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  '& > *:last-child': {
    flex: '1 0',
  },
  '& > *:last-child > div': {
    height: fixHeight ? '100%' : 150,
  },
}));
