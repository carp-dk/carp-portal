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
  Typography,
} from '@mui/material';
import { getIn, useFormik } from 'formik';

type Props = {
  formik: ReturnType<typeof useFormik>;
  editing: boolean;
};

const PhoneNumberInput = ({ formik, editing }: Props) => {
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
            name="phone_number.isoCode"
            error={
              getIn(formik.touched, 'phone_number.countryCode') &&
              !!getIn(formik.errors, 'phone_number.countryCode')
            }
            value={formik.values.phone_number.isoCode}
            onChange={(e) => {
              formik.setFieldValue(
                'phone_number.countryCode',
                countryInfos.find((ci) => ci.isoCode === e.target.value)
                  ?.dialCode ?? '',
              );
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            label="Country"
            labelId="countryCodeLabel"
            sx={{
              width: '300px',
              height: '56px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            <MenuItem id="None" key="None" value="">
              Clear
            </MenuItem>
            <MenuItem id="Dk" key="Dk" value="Dk">
              <Stack
                direction="row"
                sx={{
                  display: 'grid',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  gap: 1,
                  alignItems: 'center',
                  gridTemplateColumns: '30px 50px auto',
                }}
              >
                <Flag code="DK" width={30} /> <Typography>+45</Typography>
                <Typography>Denmark</Typography>
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
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      gap: 1,
                      alignItems: 'center',
                      gridTemplateColumns: '30px 50px auto',
                    }}
                  >
                    <Flag code={country.isoCode} width={30} />
                    <Typography>{country.dialCode}</Typography>
                    <Typography>{country.name}</Typography>
                  </Stack>
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText error sx={{ width: '110px' }}>
            {getIn(formik.touched, 'phone_number.countryCode') &&
              getIn(formik.errors, 'phone_number.countryCode')}
          </FormHelperText>
        </div>
        <TextField
          disabled={!editing}
          required
          type="text"
          name="phone_number.number"
          label="Phone Number"
          fullWidth
          error={
            getIn(formik.touched, 'phone_number.number') &&
            !!getIn(formik.errors, 'phone_number.number')
          }
          value={formik.values.phone_number.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            getIn(formik.touched, 'phone_number.number') &&
            getIn(formik.errors, 'phone_number.number')
          }
        />
      </Stack>
    </FormControl>
  );
};

export default PhoneNumberInput;
