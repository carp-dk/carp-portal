import { Stack, Typography } from "@mui/material";
import { InputDataType } from "@carp-dk/client/models/InputDataTypes";
import FullNameInput from "./FullNameInput";
import AddressInput from "./AddressInput";
import SSNInput from "./SSNInput";
import PhoneNumberInput from "./PhoneNumberInput";
import DiagnosisInput from "./DiagnosisInput";

const getInputElement = (
  name: string,
  defaultValues: any,
  setValues: (values: { [key: string]: InputDataType }) => void,
) => {
  switch (name) {
    case "full_name":
      return (
        <Stack direction="row" key={name} gap={1} alignItems="center">
          <Typography variant="h4">Full name</Typography>
          <FullNameInput defaultValues={defaultValues} setValues={setValues} />
        </Stack>
      );
    case "phone_number":
      return (
        <Stack direction="row" key={name} gap={1} alignItems="center">
          <Typography variant="h4">Phone number</Typography>
          <PhoneNumberInput
            defaultValues={defaultValues}
            setValues={setValues}
          />
        </Stack>
      );
    case "ssn":
      return (
        <Stack direction="row" key={name} gap={1} alignItems="center">
          <Typography variant="h4">Social Security Number</Typography>
          <SSNInput defaultValues={defaultValues} setValues={setValues} />
        </Stack>
      );
    case "address":
      return (
        <Stack direction="row" key={name} gap={1} alignItems="center">
          <Typography variant="h4">Address</Typography>
          <AddressInput defaultValues={defaultValues} setValues={setValues} />
        </Stack>
      );
    case "diagnosis":
      return (
        <Stack direction="row" key={name} gap={1} alignItems="center">
          <Typography variant="h4">Diagnosis</Typography>
          <DiagnosisInput defaultValues={defaultValues} setValues={setValues} />
        </Stack>
      );
    default:
      console.error(`No input element found for ${name}`);
      return null;
  }
};

export default getInputElement;
