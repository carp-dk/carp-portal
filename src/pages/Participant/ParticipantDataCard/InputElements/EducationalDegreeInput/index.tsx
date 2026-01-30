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

const EducationalDegreeInput = ({ formik, editing }: Props) => {
  return (
    <FormControl fullWidth>
      <Stack direction="column" gap={2}>
        <div>
          <InputLabel id="educationalDegreeLabel" required disabled={!editing}>
            Level
          </InputLabel>
          <Select
            fullWidth
            label="Level"
            labelId="educationalDegreeLabel"
            name="educational_degree.level"
            value={getIn(formik.values, 'educational_degree.level') || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!editing}
            error={
              getIn(formik.touched, 'educational_degree.level') &&
              Boolean(getIn(formik.errors, 'educational_degree.level'))
            }
            sx={{
              height: '56px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="ISCED_0">
              ISCED 0 - Early childhood education
            </MenuItem>
            <MenuItem value="ISCED_1">ISCED 1 - Primary education</MenuItem>
            <MenuItem value="ISCED_2">
              ISCED 2 - Lower secondary education
            </MenuItem>
            <MenuItem value="ISCED_3">
              ISCED 3 - Upper secondary education
            </MenuItem>
            <MenuItem value="ISCED_4">
              ISCED 4 - Post-secondary non-tertiary education
            </MenuItem>
            <MenuItem value="ISCED_5">
              ISCED 5 - Short-cycle tertiary education
            </MenuItem>
            <MenuItem value="ISCED_6">
              ISCED 6 - Bachelor's or equivalent level
            </MenuItem>
            <MenuItem value="ISCED_7">
              ISCED 7 - Master's or equivalent level
            </MenuItem>
            <MenuItem value="ISCED_8">
              ISCED 8 - Doctoral or equivalent level
            </MenuItem>
          </Select>
          <FormHelperText error sx={{ width: '100%' }}>
            {getIn(formik.touched, 'educational_degree.level') &&
              getIn(formik.errors, 'educational_degree.level')}
          </FormHelperText>
        </div>
        <TextField
          fullWidth
          label="Details"
          name="educational_degree.details"
          value={getIn(formik.values, 'educational_degree.details') || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editing}
          error={
            getIn(formik.touched, 'educational_degree.details') &&
            Boolean(getIn(formik.errors, 'educational_degree.details'))
          }
          helperText={
            getIn(formik.touched, 'educational_degree.details') &&
            getIn(formik.errors, 'educational_degree.details')
          }
        />
      </Stack>
    </FormControl>
  );
};

export default EducationalDegreeInput;
