import { Modal } from '@mui/material';
import {
  ActionButton,
  Bottom,
  CancelButton,
  Description,
  DescriptionContainer,
  ModalBox,
  Title,
} from './styles';

type Props = {
  open: boolean;
  title: string;
  description: string;
  actionButtonLabel: string;
  onConfirm: () => void;
  onClose: () => void;
};

const ActionNeededModal = ({
  open,
  title,
  description,
  actionButtonLabel,
  onConfirm,
  onClose,
}: Props) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <Title variant="h2">{title}</Title>
        <DescriptionContainer>
          <Description variant="h5">{description}</Description>
        </DescriptionContainer>
        <Bottom>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ActionButton variant="contained" color="primary" onClick={onConfirm}>
            {actionButtonLabel}
          </ActionButton>
        </Bottom>
      </ModalBox>
    </Modal>
  );
};

export default ActionNeededModal;
