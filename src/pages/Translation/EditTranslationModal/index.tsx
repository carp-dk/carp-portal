import { getCountry } from '@Assets/languageMap';
import DragAndDrop from '@Components/DragAndDrop';
import { ResourceData } from '@carp-dk/client';
import { FormLabel, Modal } from '@mui/material';
import { useUpdateTranslation } from '@Utils/queries/studies';
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
  translation: ResourceData;
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
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      catch (e) {
        return false;
      }
    }),
});

const fileTypes = ['application/json'];

const EditTranslationModal = ({ open, onClose, translation }: Props) => {
  const { id: studyId } = useParams();
  const updateTranslation = useUpdateTranslation();
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const translationString = JSON.parse(
        await (values.file as File).text(),
      ) as { [key: string]: unknown };
      updateTranslation.mutate({
        studyId,
        translationId: translation.id as string,
        translation: {
          ...translation,
          ...translationString,
        } as ResourceData,
      });
    },
  });

  useEffect(() => {
    if (updateTranslation.isSuccess) {
      onClose();
    }
  }, [updateTranslation.isSuccess]);

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
          Update Translation
        </ModalTitle>
        <ModalDescription variant="h5" id="modal-modal-description">
          Provide a file to overwrite the
          {' '}
          {getCountry(translation.name as string)}
          {' '}
          translation. The file must be
          a JSON file.
        </ModalDescription>
        <ModalContainer>
          <ModalContent>
            <FormLabel required>Upload Translation</FormLabel>
            <DragAndDrop
              handleChange={handleChange}
              fileTypes={fileTypes}
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

export default EditTranslationModal;
