import { Checkbox, FormControlLabel, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import {
  ActionButton,
  BoldText,
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
  title: string;
  description: string;
  boldText: string;
  checkboxLabel: string;
  actionButtonLabel: string;
  onConfirm: () => void;
  onClose: () => void;
};

const DeleteConfirmationModal = ({
  open,
  title,
  description,
  boldText,
  checkboxLabel,
  actionButtonLabel,
  onConfirm,
  onClose,
}: Props) => {
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
        <Title variant="h2">{title}</Title>
        <DescriptionContainer>
          <Description variant="h4">{description}</Description>
          <BoldText variant="h4">{boldText}</BoldText>
        </DescriptionContainer>
        <Bottom>
          <FormControlLabel
            control={(
              <Checkbox
                onChange={() => setChecked(!checked)}
                checked={checked}
              />
            )}
            label={<Typography variant="h5">{checkboxLabel}</Typography>}
          />
          <ButtonsContainer>
            <CancelButton onClick={handleClose}>Cancel</CancelButton>
            <ActionButton
              variant="contained"
              color="error"
              disabled={!checked}
              onClick={onConfirm}
            >
              {actionButtonLabel}
            </ActionButton>
          </ButtonsContainer>
        </Bottom>
      </ModalBox>
    </Modal>
  );
};

export default DeleteConfirmationModal;
