import DragAndDrop from '@Components/DragAndDrop';
import { useCreateResource } from '@Utils/queries/studies';
import {
  FormLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
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
}

const resourceTypes = {
  'Consent Document': 'informed_consent',
};

const validationSchema = yup.object({
  type: yup.string().required('Type is required'),
  // if type is other, require 'name'
  name: yup.string().when('type', (type: string | string[], schema) => {
    return type === 'other' ? schema.required('Name is required') : schema;
  }),
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

const AddResourceModal = ({ open, onClose }: Props) => {
  const { id: studyId } = useParams();
  const createResource = useCreateResource();
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      file: null,
      type: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const resourceString = await (values.file as File).text();
      createResource.mutate({
        studyId,
        resource: JSON.parse(resourceString),
        name: formik.values.name.replace('.json', ''),
      });
    },
  });

  const handleTypeChange = (e: SelectChangeEvent) => {
    if (e.target.value === 'other') {
      formik.setFieldValue('name', '');
    }
    else {
      formik.setFieldValue('name', resourceTypes[e.target.value]);
    }
    formik.setFieldValue('type', e.target.value);
  };

  useEffect(() => {
    if (createResource.isSuccess) {
      onClose();
    }
  }, [createResource.isSuccess]);

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
          Add Resource
        </ModalTitle>
        <ModalDescription variant="h5" id="modal-modal-description">
          Give a name and upload resource. The file must be a JSON file.
        </ModalDescription>
        <ModalContainer>
          <ModalContent>
            <FormLabel required>Type</FormLabel>
            <Select
              value={formik.values.type}
              name="type"
              label="Type"
              onChange={handleTypeChange}
            >
              {Object.keys(resourceTypes).map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
              <MenuItem value="other">Other...</MenuItem>
            </Select>
            {formik.values.type === 'other' && (
              <>
                <FormLabel required>Name</FormLabel>
                <TextField
                  error={!!formik.errors.name}
                  variant="outlined"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  onBlur={formik.handleBlur}
                />
              </>
            )}
            <FormLabel required> Upload Resource</FormLabel>
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
            Add
          </DoneButton>
        </ModalActions>
      </ModalBox>
    </Modal>
  );
};

export default AddResourceModal;
