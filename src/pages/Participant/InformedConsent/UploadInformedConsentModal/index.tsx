import DragAndDrop from "@Components/DragAndDrop";
import { Modal } from "@mui/material";
import { useFormik } from "formik";
import {
  ModalBox,
  ModalTitle,
  ModalDescription,
  ModalContainer,
  ModalContent,
  ModalActions,
  CancelButton,
  DoneButton,
} from "./styles";

type Props = {
  open: boolean;
  onClose: () => void;
};

const UploadInformedConsentModal = ({ open, onClose }: Props) => {
  const fileTypes = ["application/json", "application/pdf", "image/*"];
  const handleChange = () => {};
  const uploading = false;
  const fileName = "";

  const addProtocolFormik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: null,
    onSubmit: () => {},
  });

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <ModalTitle variant="h2" id="modal-modal-title">
          Upload Informed Consent
        </ModalTitle>
        <ModalDescription variant="h5" id="modal-modal-description">
          Upload a picture or PDF of the informed consent form.
        </ModalDescription>
        <ModalContainer>
          <ModalContent fixHeight>
            <DragAndDrop
              handleChange={handleChange}
              fileTypes={fileTypes}
              name="file"
              formik={addProtocolFormik}
              uploading={uploading}
              fileName={fileName}
            />
          </ModalContent>
        </ModalContainer>
        <ModalActions>
          <CancelButton variant="text" onClick={onClose}>
            Cancel
          </CancelButton>
          <DoneButton
            disabled={!addProtocolFormik.dirty || !addProtocolFormik.isValid}
            variant="contained"
            sx={{ elevation: 0 }}
            onClick={() => addProtocolFormik.handleSubmit()}
          >
            Add
          </DoneButton>
        </ModalActions>
      </ModalBox>
    </Modal>
  );
};

export default UploadInformedConsentModal;
