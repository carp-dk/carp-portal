import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import {
  useSetStudyInvitation,
  useStudyDetails,
  useStudyStatus,
} from '@Utils/queries/studies';
import { getApplicationDataJson } from '@Utils/utility';
import { StudyStatus } from '@carp-dk/client';
import { FormLabel, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import * as yup from 'yup';
import StudySetupSkeleton from '../StudySetupSkeleton';
import { Heading, StyledCard, Subheading } from '../styles';

const studyInvitationValidationSchema = yup.object({
  invitationName: yup.string(),
  invitationDescription: yup.string(),
});

const Invitations = () => {
  const { id: studyId } = useParams();
  const {
    data: studyDetails,
    isLoading: studyDetailsLoading,
    error: studyDetailsError,
  } = useStudyDetails(studyId);
  const {
    data: studyStatus,
    isLoading: studyStatusIsLoading,
    error: studyStatusError,
  } = useStudyStatus(studyId);
  const setStudyInvitation = useSetStudyInvitation();

  const studyInvitationFormik = useFormik({
    initialValues: {
      invitationName: studyDetails?.invitation.name ?? '',
      invitationDescription: studyDetails?.invitation.description ?? '',
    },
    validationSchema: studyInvitationValidationSchema,
    onSubmit: (values) => {
      // `invitation.applicationData` is a carp.core `ApplicationData` object
      // (JSON in `.data`), so read it via the helper and preserve its payload
      // while keeping the authoritative studyId.
      const applicationDataJson = getApplicationDataJson(
        studyDetails?.invitation.applicationData,
      );
      let applicationData: { studyId: string; [key: string]: string };
      try {
        applicationData = applicationDataJson
          ? { ...JSON.parse(applicationDataJson), studyId }
          : { studyId };
      } catch {
        applicationData = { studyId };
      }
      setStudyInvitation.mutate({
        studyId,
        invitationName: values.invitationName,
        invitationDescription: values.invitationDescription,
        applicationData,
      });
    },
  });

  const handleInvitationBlur = (e) => {
    studyInvitationFormik.handleBlur(e);
    studyInvitationFormik.handleSubmit();
  };

  if (studyDetailsLoading || studyStatusIsLoading)
    return <StudySetupSkeleton />;

  if (studyDetailsError || studyStatusError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading study details"
        error={studyDetailsError ?? studyStatusError}
      />
    );
  }

  return (
    <StyledCard elevation={2}>
      <Heading
        disabled={!(studyStatus instanceof StudyStatus.Configuring)}
        variant="h2"
      >
        Invitation
      </Heading>
      <Subheading
        disabled={!(studyStatus instanceof StudyStatus.Configuring)}
        variant="h6"
      >
        This is a template for the email that will be send to the participants
        part of the study to join the study.
      </Subheading>
      <FormLabel disabled={!(studyStatus instanceof StudyStatus.Configuring)}>
        Name
      </FormLabel>
      <TextField
        disabled={!(studyStatus instanceof StudyStatus.Configuring)}
        variant="outlined"
        fullWidth
        error={!!studyInvitationFormik.errors.invitationName}
        name="invitationName"
        value={studyInvitationFormik.values.invitationName}
        onChange={studyInvitationFormik.handleChange}
        helperText={
          studyInvitationFormik.touched.invitationName &&
          studyInvitationFormik.errors.invitationName
        }
        onBlur={handleInvitationBlur}
      />
      <FormLabel disabled={!(studyStatus instanceof StudyStatus.Configuring)}>
        Description
      </FormLabel>
      <TextField
        disabled={!(studyStatus instanceof StudyStatus.Configuring)}
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        error={!!studyInvitationFormik.errors.invitationDescription}
        name="invitationDescription"
        value={studyInvitationFormik.values.invitationDescription}
        onChange={studyInvitationFormik.handleChange}
        helperText={
          studyInvitationFormik.touched.invitationDescription &&
          studyInvitationFormik.errors.invitationDescription
        }
        onBlur={handleInvitationBlur}
      />
    </StyledCard>
  );
};

export default Invitations;
