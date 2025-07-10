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
import { countryInfos } from '@Assets/languageMap';
import * as flags from 'react-flags-select';

type Props = {
  formik: ReturnType<typeof useFormik>;
  editing: boolean;
};

const SSNInput = ({ formik, editing }: Props) => {
  const DanishFlag = flags.Dk;

  return (
    <FormControl fullWidth>
      <Stack direction="row" gap={2}>
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
            <MenuItem id="Denmark" key="Denmark" value="Denmark">
              <Stack
                gap={1}
                direction="row"
                alignItems="center"
                justifyContent="start"
                sx={{
                  display: 'grid',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
                gridTemplateColumns="30px auto"
              >
                <DanishFlag name="Denmark" onSelect={undefined} width={30} />
                {' '}
                Denmark
              </Stack>
            </MenuItem>
            <Divider />
            {countryInfos.map((country) => {
              const countryCode =
                country.isoCode[0].toUpperCase() +
                country.isoCode[1].toLowerCase();
              let CountryFlag;
              if (countryCode in flags) {
                CountryFlag = flags[countryCode];
              } else {
                CountryFlag = 'div';
              }
              return (
                <MenuItem
                  id={country.isoCode}
                  key={country.isoCode}
                  value={country.name}
                >
                  <Stack
                    gap={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="start"
                    sx={{
                      display: 'grid',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                    gridTemplateColumns="30px auto"
                  >
                    <CountryFlag
                      name={country.isoCode}
                      selected=""
                      onSelect={undefined}
                      width={30}
                    />
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
