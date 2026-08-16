import { languageLabels } from '@Assets/languageMap';
import {
  Autocomplete,
  Box,
  FormControl,
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
              if (!languageLabels[option]) return option;
              return `${languageLabels[option].primary} ${
                languageLabels[option].secondary
              }`;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Language"
                label="Language"
              />
            )}
            renderOption={(props, option) => {
              const { key } = props;
              const optionProps = {
                ...props,
              } as typeof props & { key?: unknown; override?: unknown };
              delete optionProps.key;
              delete optionProps.override;
              const countryCode =
                option[0].toUpperCase() + option[1].toLowerCase();
              let CountryFlag;
              if (countryCode in flags) {
                CountryFlag = flags[countryCode];
              } else {
                CountryFlag = 'div';
              }
              return (
                <Box component="li" key={key} {...optionProps}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                    <CountryFlag
                      name={option}
                      selected=""
                      onSelect={undefined}
                      width={30}
                    />
                    {languageLabels[option].primary}
                  </Stack>
                </Box>
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
