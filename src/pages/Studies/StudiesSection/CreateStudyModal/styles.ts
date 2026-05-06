import { styled } from '@Utils/theme';
import { ModalBox as BaseModalBox } from '@Components/Modal/styles';

export {
  CancelButton,
  DoneButton,
  ModalActions,
  ModalDescription,
  ModalTitle,
  TextFieldLabel,
} from '@Components/Modal/styles';

export const ModalBox = styled(BaseModalBox)({
  maxWidth: 550,
});

export const ModalContent = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});
