import { languageLabels } from '@Assets/languageMap';
import DragAndDrop from '@Components/DragAndDrop';
import {
  useCreateResource,
  useCreateTranslation,
} from '@Utils/queries/studies';
import {
  Autocomplete,
  Box,
  FormLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as flags from 'react-flags-select';
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
  Translation: 'translation',
  'Informed Consent': 'informed_consent',
};

const validationSchema = yup.object({
  type: yup.string().required('Type is required'),
  name: yup.string().when('type', (type: string | string[], schema) => {
    const selectedType = Array.isArray(type) ? type[0] : type;

    return selectedType === 'other'
      ? schema.required('Name is required')
      : schema;
  }),
  language: yup.string().when('type', (type: string | string[], schema) => {
    const selectedType = Array.isArray(type) ? type[0] : type;

    return selectedType === 'Translation'
      ? schema.required('Language is required')
      : schema;
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
      } catch {
        return false;
      }
    }),
});

const AddResourceModal = ({ open, onClose }: Props) => {
  const { id: studyId } = useParams();
  const createResource = useCreateResource();
  const createTranslation = useCreateTranslation();
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      language: '',
      file: null,
      type: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const fileString = await (values.file as File).text();
      const document = JSON.parse(fileString);

      if (values.type === 'Translation') {
        createTranslation.mutate({
          studyId,
          translation: document,
          name: languageLabels[values.language].secondary,
        });
      } else {
        createResource.mutate({
          studyId,
          resource: document,
          name: formik.values.name.replace('.json', ''),
        });
      }
    },
  });

  const handleTypeChange = (e: SelectChangeEvent) => {
    if (e.target.value === 'other' || e.target.value === 'Translation') {
      formik.setFieldValue('name', '');
    } else {
      formik.setFieldValue('name', resourceTypes[e.target.value]);
    }
    formik.setFieldValue('language', '');
    formik.setFieldValue('type', e.target.value);
  };

  useEffect(() => {
    if (createResource.isSuccess || createTranslation.isSuccess) {
      onClose();
    }
  }, [createResource.isSuccess, createTranslation.isSuccess]);

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
          Add File
        </ModalTitle>
        <ModalDescription variant="h5" id="modal-modal-description">
          Choose a type and upload a JSON file.
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
              {Object.keys(resourceTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
              <MenuItem value="other">Other...</MenuItem>
            </Select>
            {formik.values.type === 'Translation' && (
              <>
                <FormLabel id="languageLabel" required>
                  Language
                </FormLabel>
                <Autocomplete
                  options={Object.keys(languageLabels)}
                  value={formik.values.language}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(_, newValue) => {
                    formik.setFieldTouched('language', true);
                    formik.setFieldValue('language', newValue || '', true);
                  }}
                  filterOptions={(options, params) => {
                    return options.filter((option) =>
                      languageLabels[option].primary
                        .toLowerCase()
                        .includes(params.inputValue.toLowerCase()),
                    );
                  }}
                  onBlur={formik.handleBlur}
                  fullWidth
                  getOptionLabel={(option) => {
                    if (!option || !languageLabels[option]) return '';
                    return `${languageLabels[option].primary} ${
                      languageLabels[option].secondary
                    }`;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Language"
                      size="small"
                    />
                  )}
                  renderOption={(props, option) => {
                    const { key } = props;
                    const optionProps = {
                      ...props,
                    } as typeof props & { key?: unknown; override?: unknown };
                    delete optionProps.key;
                    delete optionProps.override;
                    const countryCode =
                      option[0].toUpperCase() + option[1].toLowerCase();
                    let CountryFlag;
                    if (countryCode in flags) {
                      CountryFlag = flags[countryCode];
                    } else {
                      CountryFlag = 'div';
                    }
                    return (
                      <Box component="li" key={key} {...optionProps}>
                        <Stack
                          direction="row"
                          sx={{ alignItems: 'center', gap: 1 }}
                        >
                          <CountryFlag
                            name={option}
                            selected=""
                            onSelect={undefined}
                            width={30}
                          />
                          {languageLabels[option].primary}
                        </Stack>
                      </Box>
                    );
                  }}
                />
              </>
            )}
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
            <FormLabel required>Upload JSON File</FormLabel>
            <DragAndDrop
              handleChange={handleChange}
              fileTypes={['application/json']}
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
