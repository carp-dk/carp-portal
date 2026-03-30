import DragAndDrop from '@Components/DragAndDrop';
import {
  useProtocolDetails,
  useUpdateProtocol,
} from '@Utils/queries/protocols';
import {
  DefaultSerializer,
  getSerializer,
  Json,
  StudyProtocol,
  StudyProtocolSnapshot,
} from '@carp-dk/client';
import { FormLabel, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import LoadingSkeleton from 'src/pages/Deployment/LoadingSkeleton';
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
  originalProtocolId: string;
  onClose: () => void;
}
const fileTypes = ['application/json'];

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  versionTag: yup.string().required('Version tag is required'),
  description: yup.string(),
  file: yup
    .mixed()
    .required('File is required')
    .test(
      'fileFormat',
      'File must be a JSON file',
      (value: File) => value && fileTypes.includes(value.type),
    )
    .test('validJson', 'Invalid JSON format', async (value: File) => {
      if (!value) return false;
      const text = await value.text();
      try {
        JSON.parse(text);
        return true;
      } catch {
        return false;
      }
    })
    .test('validProtocol', 'Invalid protocol format', async (value: File) => {
      if (!value) return false;
      const text = await value.text();
      try {
        const json: Json = DefaultSerializer;

        const serializer = getSerializer(StudyProtocolSnapshot);
        json.decodeFromString(serializer, text);
        return true;
      } catch {
        return false;
      }
    }),
});

const AddProtocolVersionModal = ({
  originalProtocolId,
  open,
  onClose,
}: Props) => {
  const versionTagRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const updateProtocol = useUpdateProtocol(originalProtocolId);
  const { data: originalProtocol, isLoading: originalProtocolLoading } =
    useProtocolDetails(originalProtocolId);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

  const addProtocolFormik = useFormik({
    initialValues: {
      name: originalProtocol?.name ?? '',
      description: originalProtocol?.description ?? '',
      versionTag: '',
      file: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const protocol = JSON.parse(
        await (values.file as File).text(),
      ) as StudyProtocol;
      updateProtocol.mutate({
        name: values.name,
        description: values.description,
        protocol,
        versionTag: values.versionTag,
      });
    },
  });

  useEffect(() => {
    if (updateProtocol.isSuccess) {
      onClose();
    }
  }, [updateProtocol.isSuccess]);

  useEffect(() => {
    return () => {
      addProtocolFormik.resetForm();
    };
  }, [open]);

  const handleChange = (theFile: File) => {
    // validate file with yup, and if it passes, set it to state
    setUploading(true);
    validationSchema.fields.file
      .validate(theFile)
      .then(async () => {
        await addProtocolFormik.setFieldTouched('file', true);
        await addProtocolFormik.setFieldValue('file', theFile);
        theFile.text().then(async (text: string) => {
          await addProtocolFormik.setFieldTouched('protocol', true);
          addProtocolFormik.setFieldValue('protocol', text);
          // automatically populate the ``name`` field from the uploaded protocol if it's empty
          setFileName(theFile.name);
        });
      })
      .catch((err: yup.ValidationError) => {
        addProtocolFormik.setFieldError('file', err.message);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  if (originalProtocolLoading) {
    <LoadingSkeleton></LoadingSkeleton>;
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <ModalTitle variant="h2" id="modal-modal-title">
          Add Version
        </ModalTitle>
        <ModalDescription variant="h5" id="modal-modal-description">
          Give a name, description and upload protocol.
        </ModalDescription>
        <ModalContainer>
          <ModalContent>
            <FormLabel>Name</FormLabel>
            <TextField
              disabled
              variant="outlined"
              name="name"
              value={addProtocolFormik.values.name}
              fullWidth
            />
            <FormLabel required>Version Tag</FormLabel>
            <TextField
              error={!!addProtocolFormik.errors.versionTag}
              variant="outlined"
              name="versionTag"
              value={addProtocolFormik.values.versionTag}
              onChange={addProtocolFormik.handleChange}
              fullWidth
              helperText={
                addProtocolFormik.touched.versionTag &&
                addProtocolFormik.errors.versionTag
              }
              onBlur={addProtocolFormik.handleBlur}
              inputRef={versionTagRef}
            />
            <FormLabel>Description</FormLabel>
            <TextField
              variant="outlined"
              name="description"
              value={addProtocolFormik.values.description}
              onChange={addProtocolFormik.handleChange}
              fullWidth
              onBlur={addProtocolFormik.handleBlur}
              size="small"
              multiline
              rows={5}
              inputRef={descriptionRef}
            />
          </ModalContent>
          <ModalContent fixHeight>
            <FormLabel required>Upload Protocol</FormLabel>
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

export default AddProtocolVersionModal;
