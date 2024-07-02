import { Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import {
  CancelButton,
  Content,
  DoneButton,
  HorizontalInputContainer,
  ModalActions,
  ModalBox,
  Title,
  VerticalInputContainer,
} from "./styles";

type Props = {
  open: boolean;
  onClose: () => void;
  to: string;
};

const SendReminderModal = ({ open, onClose, to }: Props) => {
  // const sendEmail = useSendEmail();

  const reminderFormik = useFormik({
    initialValues: {
      cc: "",
      message: `Dear Jakob Bardram,


      I am writing to remind you about the importance of uploading data to the Clinical Study, which is investigating the efficacy and safety in patients with cardiovascular disease. Your participation in this study contributes to our efforts in understanding and improving the treatment of cardiovascular disease.

      Kindly click on the link below to be redirected to the study:
      [Digital Tech Summit]
      
      If you have any questions or encounter any difficulties while uploading the data, please do not hesitate to reach out to us for assistance.
      
      [Researcher's Name][Researcher's Title/Position][Research Institution/Organization]
      ___________________________________________________
      Study invitation

      You are cordially invited to participate in the Clinical Study, investigating the efficacy and safety in patients with cardiovascular disease. Your participation in this study is important and will help us to better understand the potential benefits in treating cardiovascular disease.
      `,
      subject: "Reminder to participate in the XXX Study",
    },
    onSubmit: (values) => {
      // TODO: Send email
      // eslint-disable-next-line no-console
      console.log(values);
      // TODO: Delete this after implementing the send email functionality
      onClose();
    },
  });

  useEffect(() => {
    return () => {
      reminderFormik.resetForm();
    };
  }, [open]);

  useEffect(
    () => {
      onClose();
    },
    [
      /* sendEmail.isSuccess */
    ],
  );

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <Title variant="h2">Send a reminder</Title>
        <Content>
          <HorizontalInputContainer>
            <Typography variant="h5" width="56px">
              To:
            </Typography>
            <Typography variant="h5">{to}</Typography>
          </HorizontalInputContainer>
          <HorizontalInputContainer>
            <Typography variant="h5" width="56px">
              CC:
            </Typography>
            <TextField
              type="text"
              fullWidth
              size="small"
              name="cc"
              value={reminderFormik.values.cc}
              onChange={reminderFormik.handleChange}
            />
          </HorizontalInputContainer>
          <HorizontalInputContainer>
            <Typography variant="h5" width="56px">
              Subject:
            </Typography>
            <TextField
              type="text"
              fullWidth
              size="small"
              name="subject"
              value={reminderFormik.values.subject}
              onChange={reminderFormik.handleChange}
            />
          </HorizontalInputContainer>
          <VerticalInputContainer>
            <Typography variant="h5">Message:</Typography>
            <TextField
              type="text"
              name="message"
              fullWidth
              multiline
              rows={5}
              value={reminderFormik.values.message}
              onChange={reminderFormik.handleChange}
            />
          </VerticalInputContainer>
        </Content>
        <ModalActions>
          <CancelButton variant="text" onClick={onClose}>
            Cancel
          </CancelButton>
          <DoneButton
            variant="contained"
            sx={{ elevation: 0 }}
            onClick={() => {
              reminderFormik.handleSubmit();
            }}
          >
            Send
          </DoneButton>
        </ModalActions>
      </ModalBox>
    </Modal>
  );
};

export default SendReminderModal;
