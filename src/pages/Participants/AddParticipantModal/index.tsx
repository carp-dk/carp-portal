import { TabContext, TabPanel } from '@mui/lab';
import { Modal, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import AddAnonymousParticipantsContent from './AddAnonymousParticipantsContent';
import AddParticipantContent from './AddParticipantContent';
import { ModalBox } from './styles';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddParticipantModal = ({ open, onClose }: Props) => {
  const [value, setValue] = useState('Participant');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <TabContext value={value}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Add participant" value="Participant" />
            <Tab label="Add anonymous participants" value="Anonymous" />
          </Tabs>
          <TabPanel value="Participant">
            <AddParticipantContent open={open} onClose={onClose} />
          </TabPanel>
          <TabPanel value="Anonymous">
            <AddAnonymousParticipantsContent open={open} onClose={onClose} />
          </TabPanel>
        </TabContext>
      </ModalBox>
    </Modal>
  );
};

export default AddParticipantModal;
