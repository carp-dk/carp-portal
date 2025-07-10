import { countryInfos } from '@Assets/languageMap';
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { getIn, useFormik } from 'formik';
import * as flags from 'react-flags-select';

type Props = {
  formik: ReturnType<typeof useFormik>;
  editing: boolean;
};

const AddressInput = ({ formik, editing }: Props) => {
  const DanishFlag = flags.Dk;
  return (
    <Stack direction="column" gap={2}>
      <TextField
        disabled={!editing}
        type="text"
        name="address.address1"
        label="Address 1"
        error={!!formik.errors.address1}
        value={formik.values.address.address1}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={
          formik.touched.address1 && (formik.errors.address1 as string)
        }
      />
      <TextField
        disabled={!editing}
        type="text"
        name="address.address2"
        label="Address 2"
        error={!!formik.errors.address2}
        value={formik.values.address.address2}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={
          formik.touched.address2 && (formik.errors.address2 as string)
        }
      />
      <TextField
        disabled={!editing}
        type="text"
        name="address.street"
        label="Street"
        error={!!formik.errors.street}
        value={formik.values.address.street}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.street && (formik.errors.street as string)}
      />
      <Stack direction="row" gap={2}>
        <TextField
          disabled={!editing}
          type="text"
          name="address.city"
          label="City"
          fullWidth
          error={!!formik.errors.city}
          value={formik.values.address.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.city && (formik.errors.city as string)}
        />
        <TextField
          disabled={!editing}
          type="text"
          name="address.postalCode"
          label="Postal Code"
          fullWidth
          error={!!formik.errors.postalCode}
          value={formik.values.address.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.touched.postalCode && (formik.errors.postalCode as string)
          }
        />
      </Stack>
      <FormControl fullWidth>
        <InputLabel id="countryCodeLabel" disabled={!editing}>
          Country
        </InputLabel>
        <Select
          disabled={!editing}
          name="address.country"
          error={
            getIn(formik.touched, 'address.country') &&
            !!getIn(formik.errors, 'address.country')
          }
          value={formik.values.address.country}
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
      </FormControl>
    </Stack>
  );
};

export default AddressInput;
