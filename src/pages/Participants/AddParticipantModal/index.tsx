import { Modal } from '@mui/material';
import AddAnonymousParticipantsContent from './AddAnonymousParticipantsContent';
import AddParticipantContent from './AddParticipantContent';
import { ModalBox } from './styles';

export type AddParticipantModalMode = 'participant' | 'anonymous';

type Props = {
  open: boolean;
  onClose: () => void;
  mode: AddParticipantModalMode;
};

const AddParticipantModal = ({ open, onClose, mode }: Props) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        {mode === 'participant' ? (
          <AddParticipantContent open={open} onClose={onClose} />
        ) : (
          <AddAnonymousParticipantsContent open={open} onClose={onClose} />
        )}
      </ModalBox>
    </Modal>
  );
};

export default AddParticipantModal;
