import { FormControl, Stack, TextField } from '@mui/material';
import { getIn, useFormik } from 'formik';

type Props = {
  formik: ReturnType<typeof useFormik>;
  editing: boolean;
};

const OnboardingResearcherInput = ({ formik, editing }: Props) => {
  return (
    <FormControl fullWidth>
      <Stack direction="column" gap={2}>
        <TextField
          fullWidth
          label="Researcher ID"
          name="onboarding_researcher.researcherId"
          value={
            getIn(formik.values, 'onboarding_researcher.researcherId') || ''
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editing}
          error={
            getIn(formik.touched, 'onboarding_researcher.researcherId') &&
            Boolean(getIn(formik.errors, 'onboarding_researcher.researcherId'))
          }
          helperText={
            getIn(formik.touched, 'onboarding_researcher.researcherId') &&
            getIn(formik.errors, 'onboarding_researcher.researcherId')
          }
        />
        <TextField
          fullWidth
          label="Researcher Name"
          name="onboarding_researcher.researcherName"
          value={
            getIn(formik.values, 'onboarding_researcher.researcherName') || ''
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editing}
          error={
            getIn(formik.touched, 'onboarding_researcher.researcherName') &&
            Boolean(
              getIn(formik.errors, 'onboarding_researcher.researcherName'),
            )
          }
          helperText={
            getIn(formik.touched, 'onboarding_researcher.researcherName') &&
            getIn(formik.errors, 'onboarding_researcher.researcherName')
          }
        />
        <TextField
          fullWidth
          label="Institution"
          name="onboarding_researcher.institutionName"
          value={
            getIn(formik.values, 'onboarding_researcher.institutionName') || ''
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editing}
          error={
            getIn(formik.touched, 'onboarding_researcher.institutionName') &&
            Boolean(
              getIn(formik.errors, 'onboarding_researcher.institutionName'),
            )
          }
          helperText={
            getIn(formik.touched, 'onboarding_researcher.institutionName') &&
            getIn(formik.errors, 'onboarding_researcher.institutionName')
          }
        />
      </Stack>
    </FormControl>
  );
};

export default OnboardingResearcherInput;
