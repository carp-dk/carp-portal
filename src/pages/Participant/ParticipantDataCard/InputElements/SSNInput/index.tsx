import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {
  InputDataType,
  SocialSecurityNumber,
} from "@carp-dk/client/models/InputDataTypes";
import * as yup from "yup";
import { useFormik } from "formik";
import { countryInfos } from "@Assets/languageMap";
import * as flags from "react-flags-select";

type Props = {
  defaultValues: SocialSecurityNumber;
  setValues: React.Dispatch<
    React.SetStateAction<{
      [key: string]: InputDataType;
    }>
  >;
};

const validationSchema = yup.object({
  country: yup.string(),
  socialSecurityNumber: yup.string().notRequired(),
});

const SSNInput = ({ defaultValues, setValues }: Props) => {
  const participantDataFormik = useFormik({
    initialValues: {
      country: defaultValues?.country ?? "",
      socialSecurityNumber: defaultValues?.socialSecurityNumber ?? "",
    },
    validationSchema,
    onSubmit: async (inputValues) => {
      setValues((oldValues) => ({
        ...oldValues,
        "dk.carp.webservices.input.ssn": {
          __type: "dk.carp.webservices.input.ssn",
          country: inputValues.country,
          socialSecurityNumber: inputValues.socialSecurityNumber,
        },
      }));
    },
  });

  const handleBlur = (e) => {
    const { relatedTarget } = e;

    // Check if the next focused element is an input field
    const isNextInputField =
      relatedTarget && relatedTarget.tagName.toLowerCase() === "input";

    if (!isNextInputField) {
      participantDataFormik.handleBlur(e);
      participantDataFormik.handleSubmit();
    }
  };

  const DanishFlag = flags.Dk;

  return (
    <FormControl fullWidth onBlur={handleBlur}>
      <Stack direction="row" gap={2} onBlur={handleBlur}>
        <InputLabel id="countryCodeLabel">Country</InputLabel>
        <Select
          name="country"
          error={!!participantDataFormik.errors.country}
          value={participantDataFormik.values.country}
          onChange={participantDataFormik.handleChange}
          label="Country"
          labelId="countryCodeLabel"
          sx={{
            minWidth: "200px",
            width: "200px",
            height: "56px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <MenuItem id="Denmark" key="Denmark" value="Denmark">
            <Stack gap={1} direction="row" alignItems="center">
              <DanishFlag name="Denmark" onSelect={undefined} /> Denmark
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
              CountryFlag = flags.Gb;
            }
            return (
              <MenuItem
                id={country.isoCode}
                key={country.isoCode}
                value={country.name}
              >
                <Stack gap={1} direction="row" alignItems="center">
                  <CountryFlag
                    name={country.isoCode}
                    selected=""
                    onSelect={undefined}
                  />
                  {country.name}
                </Stack>
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          type="text"
          name="socialSecurityNumber"
          label="Social Security Number"
          error={!!participantDataFormik.errors.socialSecurityNumber}
          value={participantDataFormik.values.socialSecurityNumber}
          onChange={participantDataFormik.handleChange}
          helperText={
            participantDataFormik.touched.socialSecurityNumber &&
            participantDataFormik.errors.socialSecurityNumber
          }
        />
      </Stack>
    </FormControl>
  );
};

export default SSNInput;
