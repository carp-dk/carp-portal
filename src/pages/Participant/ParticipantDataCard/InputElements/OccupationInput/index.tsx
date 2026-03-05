import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { getIn, useFormik } from 'formik';

type Props = {
  formik: ReturnType<typeof useFormik>;
  editing: boolean;
};

const OccupationInput = ({ formik, editing }: Props) => {
  return (
    <FormControl fullWidth>
      <Stack direction="column" spacing={2}>
        <div>
          <InputLabel id="rolesLabel" required disabled={!editing}>
            Roles
          </InputLabel>
          <Select
            fullWidth
            label="Roles"
            labelId="rolesLabel"
            name="occupation.roles"
            value={formik.values.occupation.roles || []}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!editing}
            multiple
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Employed">Employed</MenuItem>
            <MenuItem value="Unemployed">Unemployed</MenuItem>
            <MenuItem value="Retired">Retired</MenuItem>
            <MenuItem value="Homemaker">Homemaker</MenuItem>
            <MenuItem value="Engineer">Engineer</MenuItem>
            <MenuItem value="Researcher">Researcher</MenuItem>
            <MenuItem value="Healthcare Professional">
              Healthcare Professional
            </MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <FormHelperText error sx={{ width: '100%' }}>
            {getIn(formik.touched, 'occupation.roles') &&
              getIn(formik.errors, 'occupation.roles')}
          </FormHelperText>
        </div>
        {formik.values.occupation?.roles &&
          formik.values.occupation?.roles.includes('Other') && (
            <div>
              <TextField
                fullWidth
                label="Other"
                name="occupation.other"
                value={formik.values.occupation.other || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!editing}
                error={
                  getIn(formik.touched, 'occupation.other') &&
                  Boolean(getIn(formik.errors, 'occupation.other'))
                }
                helperText={
                  getIn(formik.touched, 'occupation.other') &&
                  getIn(formik.errors, 'occupation.other')
                }
              />
            </div>
          )}
      </Stack>
    </FormControl>
  );
};

export default OccupationInput;
