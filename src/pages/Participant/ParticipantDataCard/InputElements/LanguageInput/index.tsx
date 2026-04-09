import { languageLabels } from '@Assets/languageMap';
import {
  Autocomplete,
  FormControl,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { getIn, useFormik } from 'formik';
import * as flags from 'react-flags-select';

type Props = {
  formik: ReturnType<typeof useFormik>;
  editing: boolean;
};

const LanguageInput = ({ formik, editing }: Props) => {
  return (
    <FormControl fullWidth>
      <Stack direction="row" sx={{ gap: 2 }}>
        <div style={{ width: '100%' }}>
          <Autocomplete
            options={Object.keys(languageLabels)}
            value={formik.values.language.languageCode || ''}
            onChange={(_, newValue) => {
              formik.setFieldValue('language.languageCode', newValue);
            }}
            filterOptions={(options, params) => {
              return options.filter((option) =>
                languageLabels[option].primary
                  .toLowerCase()
                  .includes(params.inputValue.toLowerCase()),
              );
            }}
            onBlur={formik.handleBlur}
            fullWidth
            disabled={!editing}
            getOptionLabel={(option) => {
              if (!option) return '';
              return `${languageLabels[option].primary} ${
                languageLabels[option].secondary
              }`;
            }}
            renderInput={(params) => {
              if (!formik.values.language) {
                return (
                  <TextField
                    {...params}
                    placeholder="Select Language"
                    size="small"
                  />
                );
              }
              const countryCode = formik.values.language.languageCode
                ? formik.values.language.languageCode[0].toUpperCase() +
                  formik.values.language.languageCode[1].toLowerCase()
                : '';
              let CountryFlag;
              if (countryCode in flags) {
                CountryFlag = flags[countryCode];
              } else {
                CountryFlag = 'div';
              }
              return (
                <TextField
                  {...params}
                  placeholder="Select Language"
                  label="Language"
                  slotProps={{
                    input: {
                      ...params.slotProps?.input,
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ marginRight: 0 }}
                        >
                          <CountryFlag
                            name={formik.values.language}
                            selected=""
                            onSelect={undefined}
                            width={25}
                            style={{ marginLeft: '10px' }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              );
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              const countryCode =
                option[0].toUpperCase() + option[1].toLowerCase();
              let CountryFlag;
              if (countryCode in flags) {
                CountryFlag = flags[countryCode];
              } else {
                CountryFlag = 'div';
              }
              return (
                <MenuItem key={key} {...optionProps}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <CountryFlag
                      name={option}
                      selected=""
                      onSelect={undefined}
                      width={30}
                    />
                    {languageLabels[option].primary}
                  </Stack>
                </MenuItem>
              );
            }}
          />
        </div>
        <TextField
          disabled={!editing}
          type="text"
          name="language.region"
          label="Region"
          fullWidth
          error={
            getIn(formik.touched, 'language.region') &&
            !!getIn(formik.errors, 'language.region')
          }
          value={formik.values.language.region || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            getIn(formik.touched, 'language.region') &&
            getIn(formik.errors, 'language.region')
          }
        />
        <TextField
          disabled={!editing}
          type="text"
          name="language.displayName"
          label="Display Name"
          fullWidth
          error={
            getIn(formik.touched, 'language.displayName') &&
            !!getIn(formik.errors, 'language.displayName')
          }
          value={formik.values.language.displayName || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            getIn(formik.touched, 'language.displayName') &&
            getIn(formik.errors, 'language.displayName')
          }
        />
      </Stack>
    </FormControl>
  );
};

export default LanguageInput;
