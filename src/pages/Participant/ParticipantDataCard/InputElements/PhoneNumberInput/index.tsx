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
  PhoneNumber,
} from "@carp-dk/client/models/InputDataTypes";
import * as yup from "yup";
import { useFormik } from "formik";
import { countryInfos } from "@Assets/languageMap";
import * as flags from "react-flags-select";

type Props = {
  defaultValues: PhoneNumber;
  setValues: React.Dispatch<
    React.SetStateAction<{
      [key: string]: InputDataType;
    }>
  >;
};

const validationSchema = yup
  .object({
    countryCode: yup.string(),
    icoCode: yup.string().notRequired(),
    number: yup.string(),
  })
  .test("either-or", "Either countryCode or number is required", (value) => {
    const { countryCode, number } = value;

    // Check if both are empty
    const isEmpty = !countryCode && !number;

    // Check if one is filled and the other is not
    const isBothFilled = !!countryCode && !!number;

    // If both are empty or both are filled, return false (validation fails)
    return !isEmpty && !isBothFilled;
  })
  .test(
    "conditional-required",
    "Country code is required when number is set",
    (value, schema) => {
      const { countryCode, number } = value;

      // If number is set, countryCode must also be set
      if (number && !countryCode) {
        return schema.createError({
          path: "countryCode",
          message: "Country code is required when number is set",
        });
      }

      // If countryCode is set, number must also be set
      if (countryCode && !number) {
        return schema.createError({
          path: "number",
          message: "Number is required when country code is set",
        });
      }

      return true; // No errors
    },
  );

const PhoneNumberInput = ({ defaultValues, setValues }: Props) => {
  const participantDataFormik = useFormik({
    initialValues: {
      countryCode: defaultValues?.countryCode ?? "",
      isoCode: defaultValues?.isoCode ?? "",
      number: defaultValues?.number ?? "",
    },
    validationSchema,
    onSubmit: async (inputValues) => {
      if (participantDataFormik.isValid) {
        setValues((oldValues) => ({
          ...oldValues,
          "dk.carp.webservices.input.phone_number": {
            __type: "dk.carp.webservices.input.phone_number",
            countryCode: inputValues.countryCode,
            isoCode: countryInfos.find(
              (ci) => ci.dialCode === inputValues.countryCode,
            )?.isoCode,
            number: inputValues.number,
          },
        }));
      }
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
      <Stack direction="row" gap={2}>
        <InputLabel id="countryCodeLabel">Country</InputLabel>
        <Select
          name="countryCode"
          error={!!participantDataFormik.errors.countryCode}
          value={participantDataFormik.values.countryCode}
          onChange={participantDataFormik.handleChange}
          label="Country"
          labelId="countryCodeLabel"
          sx={{ minWidth: "110px", height: "56px" }}
        >
          <MenuItem id="Dk" key="Dk" value="+45">
            <Stack gap={1} direction="row" alignItems="center">
              <DanishFlag onSelect={undefined} /> +45
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
                value={country.dialCode}
              >
                <Stack gap={1} direction="row" alignItems="center">
                  <CountryFlag selected="" onSelect={undefined} />
                  {country.dialCode}
                </Stack>
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          type="text"
          name="number"
          label="Phone Number"
          error={!!participantDataFormik.errors.number}
          value={participantDataFormik.values.number}
          onChange={participantDataFormik.handleChange}
          helperText={
            participantDataFormik.touched.number &&
            participantDataFormik.errors.number
          }
        />
      </Stack>
    </FormControl>
  );
};

export default PhoneNumberInput;
