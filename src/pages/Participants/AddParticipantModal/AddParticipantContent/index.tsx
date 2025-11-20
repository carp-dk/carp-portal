import { useAddParticipantByEmail } from '@Utils/queries/participants';
import { FormLabel, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import {
  CancelButton,
  DoneButton,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from '../styles';

type Props = {
  open: boolean;
  onClose: () => void;
};

const validationSchema = yup.object({
  email: yup.string().required('Email is required'),
});

const AddParticipantContent = ({ open, onClose }: Props) => {
  const { id: studyId } = useParams();

  const addParticipant = useAddParticipantByEmail(studyId);

  const addParticipantFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      addParticipant.mutate(values.email);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addParticipantFormik.handleSubmit();
  };

  useEffect(() => {
    return () => {
      addParticipantFormik.resetForm();
    };
  }, [open]);

  useEffect(() => {
    if (addParticipant.isSuccess) {
      onClose();
    }
  }, [addParticipant.isSuccess]);

  return (
    <>
      <ModalTitle variant="h2" id="modal-modal-title">
        Add participant
      </ModalTitle>
      <ModalDescription variant="h6" id="modal-modal-description">
        Type participant&lsquo;s email to add
      </ModalDescription>
      <ModalContent>
        <form onSubmit={handleFormSubmit}>
          <FormLabel required>Email</FormLabel>
          <TextField
            autoFocus
            error={!!addParticipantFormik.errors.email}
            variant="outlined"
            name="email"
            type="email"
            value={addParticipantFormik.values.email}
            onChange={addParticipantFormik.handleChange}
            fullWidth
            helperText={
              addParticipantFormik.touched.email
              && addParticipantFormik.errors.email
            }
            onBlur={addParticipantFormik.handleBlur}
          />
        </form>
      </ModalContent>
      <ModalActions>
        <CancelButton variant="text" onClick={onClose}>
          Cancel
        </CancelButton>
        <DoneButton
          disabled={
            !addParticipantFormik.dirty || !addParticipantFormik.isValid
          }
          variant="contained"
          sx={{ elevation: 0 }}
          type="submit"
          onClick={() => addParticipantFormik.handleSubmit()}
        >
          Add
        </DoneButton>
      </ModalActions>
    </>
  );
};

export default AddParticipantContent;
