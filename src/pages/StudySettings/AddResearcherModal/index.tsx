import { FormLabel, Modal, TextField } from "@mui/material";
import { useAddUserWithRole } from "@Utils/queries/studies";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import {
  CancelButton,
  DoneButton,
  ModalActions,
  ModalBox,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from "./styles";

type Props = {
  open: boolean;
  onClose: () => void;
};

const validationSchema = yup.object({
  email: yup.string().required("Email is required"),
});

const AddResearcherModal = ({ open, onClose }: Props) => {
  const { id: studyId } = useParams();
  const addResearcher = useAddUserWithRole(studyId);

  const addResearcherFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      addResearcher.mutate({ email: values.email, role: "RESEARCH_ASSISTANT"});
    },
  });

  useEffect(() => {
    return () => {
      addResearcherFormik.resetForm();
    };
  }, [open]);

  useEffect(() => {
    onClose();
  }, [addResearcher.isSuccess]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <ModalTitle variant="h2" id="modal-modal-title">
          Add researcher
        </ModalTitle>
        <ModalDescription variant="h6" id="modal-modal-description">
          Type researcher&lsquo;s email to add
        </ModalDescription>
        <ModalContent>
          <FormLabel required>Email</FormLabel>
          <TextField
            error={!!addResearcherFormik.errors.email}
            variant="outlined"
            name="email"
            type="email"
            value={addResearcherFormik.values.email}
            onChange={addResearcherFormik.handleChange}
            fullWidth
            helperText={
              addResearcherFormik.touched.email &&
              addResearcherFormik.errors.email
            }
            onBlur={addResearcherFormik.handleBlur}
          />
        </ModalContent>
        <ModalActions>
          <CancelButton variant="text" onClick={onClose}>
            Cancel
          </CancelButton>
          <DoneButton
            disabled={
              !addResearcherFormik.dirty || !addResearcherFormik.isValid
            }
            variant="contained"
            sx={{ elevation: 0 }}
            onClick={() => addResearcherFormik.handleSubmit()}
          >
            Add
          </DoneButton>
        </ModalActions>
      </ModalBox>
    </Modal>
  );
};

export default AddResearcherModal;
