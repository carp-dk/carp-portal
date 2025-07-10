import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Checkbox, FormControlLabel, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import {
  ActionButton,
  Bottom,
  ButtonsContainer,
  CancelButton,
  Description,
  DescriptionContainer,
  ModalBox,
  Title,
} from './styles';

type Props = {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const StartStudyConfirmationModal = ({ open, onConfirm, onClose }: Props) => {
  const [checked, setChecked] = useState(false);

  const handleClose = () => {
    onClose();
    setChecked(false);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <Title variant="h2">Confirmation to go live</Title>
        <DescriptionContainer>
          <Description variant="h4">
            Once the study is live you will only be able to change the study
            name and description. You can not undo this action.
          </Description>
        </DescriptionContainer>
        <Bottom>
          <FormControlLabel
            control={(
              <Checkbox
                onChange={() => setChecked(!checked)}
                checked={checked}
              />
            )}
            label={(
              <Typography variant="h5">
                I&apos;m sure I want to &apos;Go live&apos;
              </Typography>
            )}
          />
          <ButtonsContainer>
            <CancelButton onClick={handleClose}>Cancel</CancelButton>
            <ActionButton
              startIcon={<PlayArrowRoundedIcon />}
              variant="contained"
              color="primary"
              disabled={!checked}
              onClick={onConfirm}
            >
              Go Live
            </ActionButton>
          </ButtonsContainer>
        </Bottom>
      </ModalBox>
    </Modal>
  );
};

export default StartStudyConfirmationModal;
