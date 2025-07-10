import DragAndDrop from '@Components/DragAndDrop';
import { useAddParticipants } from '@Utils/queries/participants';
import { Modal, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import {
  CancelButton,
  DoneButton,
  InvalidEmail,
  InvalidEmails,
  ModalActions,
  ModalBox,
  ModalContainer,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from './styles';

type Props = {
  open: boolean;
  onClose: () => void;
};
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const fileTypes = ['text/csv'];

const validationSchema = yup.object({
  file: yup
    .mixed()
    .required('File is required')
    .test(
      'fileFormat',
      'File must be a CSV file',
      (value: File) => value && fileTypes.includes(value.type),
    )
    .test(
      'validParticipantList',
      'Invalid participant list format',
      async (value: File) => {
        if (!value) return false;
        // const text = await value.text();
        try {
          // const json: Json = DefaultSerializer();
          // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          // const serializer = StudyProtocolSnapshot.Companion.serializer();
          // json.decodeFromString_awif5v$(serializer, text);
          return true;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (e) {
          return false;
        }
      },
    ),
});

const ImportParticipantsModal = ({ open, onClose }: Props) => {
  const { id: studyId } = useParams();
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [invalidEmails, setInvalidEmails] = useState<string[]>([]);
  const [validEmails, setValidEmails] = useState<string[]>([]);
  const addParticipants = useAddParticipants(studyId);
  const importEmailsFormik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema,
    onSubmit: () => {
      addParticipants.mutate(validEmails);
      // const newEmails: string[] = [];
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      // Papa.parse(values.file, {
      //   header: true, // assumes that the CSV file has a header row
      //   complete: results => {
      //     if (results.meta?.fields?.includes('email') || results.meta?.fields?.includes('emails')) { // check if the "email" field is present in the header row
      //       results.data?.forEach(d => {
      //         newEmails.push(d.email);
      //       });
      //       console.log('jksdfjds', newEmails);
      //       addParticipants.mutate(newEmails);
      //     }
      //   },
      //   // @ts-ignore: then doesn't exist in papa parse
      // }).then(() => {
      //   console.log('sdfsdf', newEmails);
      //   console.log(newEmails.length);
      // if (newEmails.length === 0) {
      /// /////////////////////////////////////////
      // Papa.parse(values.file, {
      //   header: false, // assumes that the CSV file has a header row
      //   complete: (results) => {
      //     results.data?.forEach((d) => {
      //       newEmails.push(d[Object.keys(d)[0]]);
      //     });
      //     const validEmails = [];
      //     const invalidEmails = [];
      //     for (const email of newEmails) {
      //       if (emailRegex.test(email)) {
      //         validEmails.push(email);
      //       } else {
      //         invalidEmails.push(email);
      //       }
      //     }
      //     console.log(validEmails);
      //     console.log(invalidEmails);

      //   },
      // });
      /// ///////////////////////
      // }
      // });
    },
  });

  useEffect(() => {
    return () => {
      setValidEmails([]);
      setInvalidEmails([]);
      importEmailsFormik.resetForm();
    };
  }, [open]);

  useEffect(() => {
    setValidEmails([]);
    setInvalidEmails([]);
    onClose();
  }, [addParticipants.isSuccess]);

  const handleChange = (theFile: File) => {
    setInvalidEmails([]);
    setValidEmails([]);
    setUploading(true);
    validationSchema.fields.file
      .validate(theFile)
      .then(async () => {
        await importEmailsFormik.setFieldTouched('file', true);
        await importEmailsFormik.setFieldValue('file', theFile);
        setFileName(theFile.name);
        theFile.text().then(async (text: string) => {
          await importEmailsFormik.setFieldTouched('emails', true);
          importEmailsFormik.setFieldValue('emails', text);
          const newEmails: string[] = [];
          Papa.parse(text, {
            header: false,
            complete: (results) => {
              results.data?.forEach((d) => {
                newEmails.push(d[Object.keys(d)[0]]);
              });
              const newValidEmails = [];
              const newInvalidEmails = [];
              for (const email of newEmails) {
                if (emailRegex.test(email)) {
                  newValidEmails.push(email);
                }
                else {
                  newInvalidEmails.push(email);
                }
              }
              setInvalidEmails(newInvalidEmails);
              setValidEmails(newValidEmails);
            },
          });
        });
      })
      .catch((err: yup.ValidationError) => {
        importEmailsFormik.setFieldError('file', err.message);
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
      onClose={onClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <ModalTitle variant="h2" id="modal-modal-title">
          Import participants list
        </ModalTitle>
        <ModalDescription variant="h5" id="modal-modal-description">
          Import participants list by uploading a file, on the right side will
          appear the invalid emails.
        </ModalDescription>
        <ModalContainer>
          <ModalContent>
            <Typography variant="h4">Upload a file*</Typography>
            <DragAndDrop
              handleChange={handleChange}
              fileTypes={fileTypes}
              name="file"
              formik={importEmailsFormik}
              uploading={uploading}
              fileName={fileName}
            />
          </ModalContent>
          <ModalContent>
            <Typography variant="h4">Invalid emails:</Typography>
            <InvalidEmails>
              {invalidEmails.map(email => (
                <InvalidEmail key={uuidv4()} variant="h5">
                  {email}
                </InvalidEmail>
              ))}
            </InvalidEmails>
          </ModalContent>
        </ModalContainer>
        <ModalActions>
          <CancelButton variant="text" onClick={onClose}>
            Cancel
          </CancelButton>
          <DoneButton
            disabled={!importEmailsFormik.dirty || !importEmailsFormik.isValid}
            variant="contained"
            sx={{ elevation: 0 }}
            onClick={() => importEmailsFormik.handleSubmit()}
          >
            Add
          </DoneButton>
        </ModalActions>
      </ModalBox>
    </Modal>
  );
};

export default ImportParticipantsModal;
