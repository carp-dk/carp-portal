import { countryInfos } from '@Assets/languageMap';
import Flag from '@Components/Flag';
import {
  Divider,
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

const SSNInput = ({ formik, editing }: Props) => {
  return (
    <FormControl fullWidth>
      <Stack direction="row" sx={{ gap: 2 }}>
        <div>
          <InputLabel id="countryCodeLabel" required disabled={!editing}>
            Country
          </InputLabel>
          <Select
            disabled={!editing}
            required
            name="ssn.country"
            error={
              getIn(formik.touched, 'ssn.country') &&
              !!getIn(formik.errors, 'ssn.country')
            }
            value={formik.values.ssn.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Country"
            labelId="countryCodeLabel"
            fullWidth
            sx={{
              height: '56px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            <MenuItem id="None" key="None" value="">
              Clear
            </MenuItem>
            <MenuItem id="Denmark" key="Denmark" value="DK">
              <Stack
                direction="row"
                sx={{
                  display: 'grid',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  gridTemplateColumns: '30px auto',
                  gap: 1,
                  alignItems: 'center',
                  justifyContent: 'start',
                }}
              >
                <Flag code="DK" width={30} /> Denmark
              </Stack>
            </MenuItem>
            <Divider />
            {countryInfos.map((country) => {
              return (
                <MenuItem
                  id={country.isoCode}
                  key={country.isoCode}
                  value={country.isoCode}
                >
                  <Stack
                    direction="row"
                    sx={{
                      display: 'grid',
                      gap: 1,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      alignItems: 'center',
                      justifyContent: 'start',
                      gridTemplateColumns: '30px auto',
                    }}
                  >
                    <Flag code={country.isoCode} width={30} />
                    {country.name}
                  </Stack>
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText error sx={{ width: '200px' }}>
            {getIn(formik.touched, 'ssn.country') &&
              getIn(formik.errors, 'ssn.country')}
          </FormHelperText>
        </div>
        <TextField
          disabled={!editing}
          type="text"
          name="ssn.socialSecurityNumber"
          label="Social Security Number"
          required
          fullWidth
          error={
            getIn(formik.touched, 'ssn.socialSecurityNumber') &&
            !!getIn(formik.errors, 'ssn.socialSecurityNumber')
          }
          value={formik.values.ssn.socialSecurityNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            getIn(formik.touched, 'ssn.socialSecurityNumber') &&
            getIn(formik.errors, 'ssn.socialSecurityNumber')
          }
        />
      </Stack>
    </FormControl>
  );
};

export default SSNInput;
