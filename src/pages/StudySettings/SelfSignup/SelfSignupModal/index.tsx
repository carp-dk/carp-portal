import { useRedirectUriMap } from '@Utils/queries/auth';
import { useEnableSelfSignup } from '@Utils/queries/studies';
import { patternToRegex } from '@Utils/utility';
import { SelfSignupConfig, StudyDetails } from '@carp-dk/client';
import {
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { FormEvent, useEffect } from 'react';
import * as yup from 'yup';
import {
  CancelButton,
  DoneButton,
  ModalActions,
  ModalBox,
  ModalContent,
  ModalDescription,
  ModalTitle,
  SecondaryCellText,
  Spinner,
} from './styles';

type Props = {
  open: boolean;
  onClose: () => void;
  studyId: string;
  studyDetails: StudyDetails;
  config?: SelfSignupConfig;
};

const MAX_LINK_LIFETIME_DAYS = 30;

const validationSchema = yup.object({
  role: yup.string().required('Role is required'),
  maxParticipants: yup
    .number()
    .transform((value, original) => (original === '' ? null : value))
    .nullable()
    .integer('Maximum participants must be a whole number')
    .min(1, 'Maximum participants must be at least 1'),
  linkLifetimeDays: yup
    .number()
    .required('Link lifetime is required')
    .integer('Link lifetime must be a whole number')
    .min(1, 'Link lifetime must be at least 1 day')
    .max(
      MAX_LINK_LIFETIME_DAYS,
      `Link lifetime must be at most ${MAX_LINK_LIFETIME_DAYS} days`,
    ),
  redirectUri: yup
    .string()
    .test('is-url', 'Redirect URI must be a valid URL', (value) => {
      try {
        new URL(value);
      } catch {
        return false;
      }
      return true;
    })
    .required('Redirect URI is required'),
  clientId: yup.string().required('Application Type is required'),
});

const SelfSignupModal = ({
  open,
  onClose,
  studyId,
  studyDetails,
  config,
}: Props) => {
  const { redirectURIs, preDefinedUriMap, notMappedClientNames, isLoading } =
    useRedirectUriMap();
  const enableSelfSignup = useEnableSelfSignup(studyId);

  const selfSignupFormik = useFormik({
    initialValues: {
      role: config?.participantRoleName ?? '',
      maxParticipants: config?.maxParticipants ?? '',
      linkLifetimeDays: MAX_LINK_LIFETIME_DAYS,
      redirectUri: '',
      clientId: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (
        !redirectURIs[values.clientId]?.some((uri) =>
          patternToRegex(uri).test(values.redirectUri),
        )
      ) {
        selfSignupFormik.setFieldError(
          'redirectUri',
          'Redirect URI must contain one of the predefined URIs',
        );
        return;
      }

      enableSelfSignup.mutate({
        participantRoleName: values.role,
        clientId: values.clientId.toString(),
        redirectUri: values.redirectUri.toString(),
        // An empty field means no lifetime cap on how many can sign up.
        maxParticipants:
          values.maxParticipants === '' ? null : Number(values.maxParticipants),
        expirationSeconds: values.linkLifetimeDays * 24 * 60 * 60,
      });
    },
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    selfSignupFormik.handleSubmit();
  };

  useEffect(() => {
    return () => {
      selfSignupFormik.resetForm();
    };
  }, [open]);

  useEffect(() => {
    if (enableSelfSignup.isSuccess) {
      onClose();
    }
  }, [enableSelfSignup.isSuccess]);

  if (isLoading) return null;

  const needsManualRedirectUri = notMappedClientNames.includes(
    selfSignupFormik.values.clientId,
  );

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <ModalTitle variant="h2" id="modal-modal-title">
          {config ? 'Edit self sign-up' : 'Set up self sign-up'}
        </ModalTitle>
        <ModalDescription variant="h6" id="modal-modal-description">
          Participants who enter the short code get an account and a magic link
          into the study, without an invitation.
        </ModalDescription>
        <ModalContent>
          <form onSubmit={handleFormSubmit}>
            <Grid
              container
              columnSpacing={4}
              rowSpacing={1}
              align-item="center"
            >
              <Grid size={{ xs: 6 }}>
                <FormLabel required>Role</FormLabel>
                <TextField
                  select
                  sx={{ width: '100%' }}
                  variant="outlined"
                  id="self-signup-role-select"
                  name="role"
                  error={!!selfSignupFormik.errors.role}
                  onBlur={selfSignupFormik.handleBlur}
                  helperText={selfSignupFormik.errors.role}
                  value={selfSignupFormik.values.role}
                  onChange={selfSignupFormik.handleChange}
                >
                  {studyDetails.protocolSnapshot.participantRoles
                    .toArray()
                    .map((participantRole) => (
                      <MenuItem
                        key={participantRole.role}
                        value={participantRole.role}
                      >
                        <SecondaryCellText variant="h5">
                          {participantRole.role}
                        </SecondaryCellText>
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <FormLabel>Maximum participants</FormLabel>
                <TextField
                  sx={{ width: '100%' }}
                  error={!!selfSignupFormik.errors.maxParticipants}
                  variant="outlined"
                  name="maxParticipants"
                  type="number"
                  value={selfSignupFormik.values.maxParticipants}
                  onChange={selfSignupFormik.handleChange}
                  helperText={
                    selfSignupFormik.errors.maxParticipants ??
                    'Leave empty for no limit'
                  }
                  onBlur={selfSignupFormik.handleBlur}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormLabel required>
                  Magic link lifetime in days (max: {MAX_LINK_LIFETIME_DAYS})
                </FormLabel>
                <TextField
                  sx={{ width: '100%' }}
                  error={!!selfSignupFormik.errors.linkLifetimeDays}
                  variant="outlined"
                  name="linkLifetimeDays"
                  type="number"
                  value={selfSignupFormik.values.linkLifetimeDays}
                  onChange={selfSignupFormik.handleChange}
                  helperText={
                    selfSignupFormik.touched.linkLifetimeDays &&
                    selfSignupFormik.errors.linkLifetimeDays
                  }
                  onBlur={selfSignupFormik.handleBlur}
                />
              </Grid>
              <Grid size={{ xs: needsManualRedirectUri ? 6 : 12 }}>
                <FormLabel required>Application Type</FormLabel>
                <Select
                  sx={{ width: '100%' }}
                  error={!!selfSignupFormik.errors.clientId}
                  variant="outlined"
                  name="clientId"
                  value={selfSignupFormik.values.clientId}
                  onChange={async (value) => {
                    await selfSignupFormik.setFieldValue(
                      'redirectUri',
                      preDefinedUriMap[value.target.value] || '',
                    );
                    selfSignupFormik.handleChange(value);
                  }}
                  onBlur={selfSignupFormik.handleBlur}
                >
                  {Object.keys(redirectURIs).map((uri) => (
                    <MenuItem key={uri} value={uri}>
                      {uri}
                    </MenuItem>
                  ))}
                </Select>
                {selfSignupFormik.touched.clientId &&
                  selfSignupFormik.errors.clientId && (
                    <FormHelperText error>
                      {selfSignupFormik.errors.clientId}
                    </FormHelperText>
                  )}
              </Grid>
              <Grid size={{ xs: 6 }} hidden={!needsManualRedirectUri}>
                <FormLabel required>Redirect URI</FormLabel>
                <TextField
                  sx={{ width: '100%' }}
                  error={!!selfSignupFormik.errors.redirectUri}
                  variant="outlined"
                  name="redirectUri"
                  type="url"
                  value={selfSignupFormik.values.redirectUri}
                  onChange={selfSignupFormik.handleChange}
                  helperText={
                    selfSignupFormik.touched.redirectUri &&
                    selfSignupFormik.errors.redirectUri
                  }
                  onBlur={selfSignupFormik.handleBlur}
                />
              </Grid>
            </Grid>
          </form>
        </ModalContent>
        <ModalActions>
          <CancelButton variant="text" onClick={onClose}>
            Cancel
          </CancelButton>
          {enableSelfSignup.isPending ? (
            <DoneButton variant="contained" sx={{ elevation: 0 }}>
              <Spinner size={20} />
            </DoneButton>
          ) : (
            <DoneButton
              disabled={!selfSignupFormik.dirty || !selfSignupFormik.isValid}
              variant="contained"
              sx={{ elevation: 0 }}
              onClick={() => selfSignupFormik.handleSubmit()}
            >
              {config ? 'Save' : 'Enable'}
            </DoneButton>
          )}
        </ModalActions>
      </ModalBox>
    </Modal>
  );
};

export default SelfSignupModal;
