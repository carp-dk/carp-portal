import { FormLabel, Modal, TextField } from '@mui/material';
import { useCreateStudy } from '@Utils/queries/studies';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as yup from 'yup';
import {
  CancelButton,
  DoneButton,
  ModalActions,
  ModalBox,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from './styles';

type Props = {
  open: boolean;
  onClose: () => void;
};

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string(),
});

const CreateStudyModal = ({ open, onClose }: Props) => {
  const createStudy = useCreateStudy();
  const createStudyFormik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (!createStudy.isLoading) {
        createStudy.mutate({
          name: values.name,
          description: values.description,
        });
      }
    },
  });

  useEffect(() => {
    return () => {
      createStudyFormik.resetForm();
    };
  }, [open]);

  useEffect(() => {
    onClose();
  }, [createStudy.isSuccess]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <ModalTitle variant="h2" id="modal-modal-title">
          Add Study
        </ModalTitle>
        <ModalDescription variant="h5" id="modal-modal-description">
          Give a name and description of the study.
        </ModalDescription>
        <ModalContent>
          <FormLabel required>Name</FormLabel>
          <TextField
            error={!!createStudyFormik.errors.name}
            variant="outlined"
            name="name"
            value={createStudyFormik.values.name}
            onChange={createStudyFormik.handleChange}
            fullWidth
            helperText={
              createStudyFormik.touched.name && createStudyFormik.errors.name
            }
            onBlur={createStudyFormik.handleBlur}
            autoFocus
          />
          <FormLabel>Description</FormLabel>
          <TextField
            variant="outlined"
            name="description"
            value={createStudyFormik.values.description}
            onChange={createStudyFormik.handleChange}
            fullWidth
            helperText={
              createStudyFormik.touched.description &&
              createStudyFormik.errors.description
            }
            onBlur={createStudyFormik.handleBlur}
            size="small"
            multiline
            rows={7}
          />
        </ModalContent>
        <ModalActions>
          <CancelButton variant="text" onClick={onClose}>
            Cancel
          </CancelButton>
          <DoneButton
            disabled={!createStudyFormik.dirty || !createStudyFormik.isValid}
            variant="contained"
            sx={{ elevation: 0 }}
            onClick={() => createStudyFormik.handleSubmit()}
          >
            Add
          </DoneButton>
        </ModalActions>
      </ModalBox>
    </Modal>
  );
};

export default CreateStudyModal;
