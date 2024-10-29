import {Modal, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import {useEffect} from "react";
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
import * as yup from "yup";
import {GenericEmailRequest} from "../../../../carp-client-ts/src/models/Email";
import {usePostEmailSendGeneric} from "@Utils/queries/participants";

type Props = {
    open: boolean,
    onClose: () => void,
    to: string,
    initials: string
    researcherEmail: string,
    researcherName: string,
    studyName: string
};

const ccLabelStyling = {
    marginTop: "10px",
    marginBottom: "auto"
}

const subjectLabelStyling = ccLabelStyling;

const ccHorizontalInputContainerStyling = {
    height: "auto",
}

const subjectHorizontalInputContainerStyling = ccHorizontalInputContainerStyling;

const SendReminderModal = ({open, onClose, to, initials, researcherEmail, researcherName, studyName}: Props) => {
    const postEmailSendGeneric = usePostEmailSendGeneric();

    const validationSchema = yup.object({
        message: yup.string().required("Message (email content) is required"),
        subject: yup.string().required("Subject is required"),
        cc: yup.array().transform(function (value, originalValue) {
            if (this.isType(value) && value !== null) {
                return value;
            }
            return originalValue ? originalValue.split(/[\s,]+/) : [];
        })
            .of(yup.string().email(({value}) => `${value} is not a valid email`)),
    });

    const reminderFormik = useFormik({
        initialValues: {
            cc: researcherEmail,
            message: `Dear ${initials},

You have recently been invited to participate in the "${studyName}" study.

However, it appears that you have not yet joined the study on your phone. Your participation in this study is important to us and we would really appreciate your contribution.

If you haven't yet registered as a user or want to reset the password, please do it on this link - https://carp.computerome.dk/

If you have any questions, don't hesitate to contact me at this email address.

Kind regards,

${researcherName}



Kære ${initials},

Du er fornylig blevet inviteret til at deltage i "${studyName}" studiet.

Vi kan dog se, at du ikke har startet studiet på din telefon og vi vil meget gerne have at du kommer i gang. Studiet er vigtigt for os og det er vigtigt at du også deltager.

Hvis du endnu ikke er oprettet som bruger, eller hvis du har glemt din password, kan du gøre det her - https://carp.computerome.dk/

Hvis du har spørgsmål, så er du velkommen til at skrive til mig på denne mail adresse.

Med venlig hilsen

${researcherName}`,
            subject: studyName,
        },
        onSubmit: (values) => {
            let genericEmailRequest: GenericEmailRequest = {
                recipient: to,
                subject: values.subject,
                message: convertTextareaInputToHtml(values.message),
                cc: values.cc.split(/[\s,]+/).filter(Boolean),
            }
            postEmailSendGeneric.mutate(genericEmailRequest)
        },
        validationSchema
    });

    function convertTextareaInputToHtml(str: string): string {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urlsWrappedIntoAnchorTags = str.replace(urlRegex, url => `<a href="${url}">${url}</a>`);
        let withAddedBr = urlsWrappedIntoAnchorTags.replace(/\n/g, "<br>");
        let wrappedInPre = `<pre style="white-space: pre-wrap;">${withAddedBr}</pre>`;

        return wrappedInPre;
    }

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
            postEmailSendGeneric.isSuccess
        ],
    );

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={onClose}
        >
            <ModalBox sx={{boxShadow: 24}}>
                <Title variant="h2">Send a reminder</Title>
                <Content>
                    <HorizontalInputContainer>
                        <Typography variant="h5" width="56px">
                            To:
                        </Typography>
                        <Typography variant="h5">{to}</Typography>
                    </HorizontalInputContainer>
                    <HorizontalInputContainer sx={ccHorizontalInputContainerStyling}>
                        <Typography variant="h5" width="56px" sx={ccLabelStyling}>
                            CC:
                        </Typography>
                        <TextField
                            type="text"
                            fullWidth
                            size="small"
                            name="cc"
                            placeholder={"e.g. \"alice@gmail.com, bob@gmail.com\""}
                            helperText={reminderFormik.errors.cc}
                            error={!!reminderFormik.errors.cc}
                            value={reminderFormik.values.cc}
                            onChange={reminderFormik.handleChange}
                        />
                    </HorizontalInputContainer>
                    <HorizontalInputContainer sx={subjectHorizontalInputContainerStyling}>
                        <Typography variant="h5" width="56px" sx={subjectLabelStyling}>
                            Subject:
                        </Typography>
                        <TextField
                            type="text"
                            fullWidth
                            size="small"
                            name="subject"
                            helperText={reminderFormik.errors.subject}
                            error={!!reminderFormik.errors.subject}
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
                            rows={9}
                            helperText={reminderFormik.errors.message}
                            error={!!reminderFormik.errors.message}
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
                        disabled={postEmailSendGeneric.isPending}
                        variant="contained"
                        sx={{elevation: 0}}
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
