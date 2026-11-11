import {
  CancelButton,
  DoneButton,
  ModalActions,
  ModalBox,
  ModalDescription,
  ModalTitle,
  TextFieldLabel,
} from '@Components/Modal/styles';
import { Modal, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useInviteResearcher } from '@Utils/queries/auth';
import { useFormik } from 'formik';
import * as yup from 'yup';

type Props = {
  open: boolean;
  onClose: () => void;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
});

/**
 * Goes through the CARP backend invite, which grants the researcher role to an
 * existing account or creates one and emails the new user.
 */
const InviteResearcherModal = ({ open, onClose }: Props) => {
  const queryClient = useQueryClient();
  const inviteResearcher = useInviteResearcher();

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: (values) => {
      inviteResearcher.mutate(values.email, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['admin'] });
          handleClose();
        },
      });
    },
  });

  function handleClose() {
    formik.resetForm();
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="invite-title">
      <ModalBox sx={{ boxShadow: 24, maxWidth: 480 }}>
        <ModalTitle variant="h2" id="invite-title">
          Add researcher
        </ModalTitle>
        <ModalDescription variant="h6">
          Existing accounts get the researcher role. New accounts are created
          and receive an email to set a password.
        </ModalDescription>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <TextFieldLabel>Email</TextFieldLabel>
          <TextField
            autoFocus
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
          <ModalActions>
            <CancelButton variant="text" onClick={handleClose}>
              Cancel
            </CancelButton>
            <DoneButton
              variant="contained"
              type="submit"
              disabled={!formik.dirty || !formik.isValid}
              loading={inviteResearcher.isPending}
            >
              Add
            </DoneButton>
          </ModalActions>
        </form>
      </ModalBox>
    </Modal>
  );
};

export default InviteResearcherModal;
