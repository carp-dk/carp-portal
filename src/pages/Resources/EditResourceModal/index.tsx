import DragAndDrop from '@Components/DragAndDrop';
import { useUpdateResource } from '@Utils/queries/studies';
import { ResourceData } from '@carp-dk/client';
import { FormLabel, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import {
  CancelButton,
  DoneButton,
  ModalActions,
  ModalBox,
  ModalContainer,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from './styles';

interface Props {
  open: boolean;
  onClose: () => void;
  resource: ResourceData;
}

const validationSchema = yup.object({
  file: yup
    .mixed()
    .required('File is required')
    .test('fileSize', 'File must be smaller than 8MB', (value: File) => {
      if (!value) return true;
      const size = value.size / 1024 / 1024;
      return size < 8;
    })
    .test('validJson', 'Invalid JSON format', async (value: File) => {
      if (!value) return false;
      const text = await value.text();
      try {
        JSON.parse(text);
        return true;
      } catch {
        return false;
      }
    }),
});

const EditResourceModal = ({ open, onClose, resource }: Props) => {
  const { id: studyId } = useParams();
  const updateResource = useUpdateResource();
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const resourceString = await (values.file as File).text();
      updateResource.mutate({
        studyId,
        resourceId: resource.id as string,
        resource: JSON.parse(resourceString),
        name: resource.name as string,
      });
    },
  });

  useEffect(() => {
    if (updateResource.isSuccess) {
      onClose();
    }
  }, [updateResource.isSuccess]);

  useEffect(() => {
    return () => {
      formik.resetForm();
    };
  }, [open]);

  const handleChange = (theFile: File) => {
    // validate file with yup, and if it passes, set it to state
    setUploading(true);
    validationSchema.fields.file
      .validate(theFile)
      .then(async () => {
        await formik.setFieldTouched('file', true);
        await formik.setFieldValue('file', theFile);
        setFileName(theFile.name);
      })
      .catch((err: yup.ValidationError) => {
        formik.setFieldError('file', err.message);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <ModalTitle variant="h2" id="modal-modal-title">
          Update Resource
        </ModalTitle>
        <ModalDescription variant="h5" id="modal-modal-description">
          Provide a file to overwrite
          {' '}
          {resource.name as string}
          . The file must
          be a JSON file.
        </ModalDescription>
        <ModalContainer>
          <ModalContent>
            <FormLabel required>Upload Resource</FormLabel>
            <DragAndDrop
              handleChange={handleChange}
              name="file"
              formik={formik}
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
            disabled={!formik.dirty || !formik.isValid}
            variant="contained"
            sx={{ elevation: 0 }}
            onClick={() => formik.handleSubmit()}
          >
            Update
          </DoneButton>
        </ModalActions>
      </ModalBox>
    </Modal>
  );
};

export default EditResourceModal;
