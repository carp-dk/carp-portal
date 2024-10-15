import { Stack, TextField } from "@mui/material";
import { FullName, InputDataType } from "@carp-dk/client/models/InputDataTypes";
import * as yup from "yup";
import { useFormik } from "formik";

type Props = {
  defaultValues: FullName;
  setValues: React.Dispatch<
    React.SetStateAction<{
      [key: string]: InputDataType;
    }>
  >;
};

const validationSchema = yup.object({
  firstName: yup.string().notRequired(),
  middleName: yup.string().notRequired(),
  lastName: yup.string().notRequired(),
});

const FullNameInput = ({ defaultValues, setValues }: Props) => {
  const participantDataFormik = useFormik({
    initialValues: {
      firstName: defaultValues?.firstName,
      middleName: defaultValues?.middleName,
      lastName: defaultValues?.lastName,
    },
    validationSchema,
    onSubmit: async (inputValues) => {
      setValues((oldValues) => ({
        ...oldValues,
        "dk.carp.webservices.input.full_name": {
          __type: "dk.carp.webservices.input.full_name",
          firstName: inputValues.firstName,
          middleName: inputValues.middleName,
          lastName: inputValues.lastName,
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

  return (
    <Stack direction="row" gap={2} onBlur={handleBlur}>
      <TextField
        type="text"
        name="firstName"
        label="First Name"
        error={!!participantDataFormik.errors.firstName}
        value={participantDataFormik.values.firstName}
        onChange={participantDataFormik.handleChange}
        helperText={
          participantDataFormik.touched.firstName &&
          participantDataFormik.errors.firstName
        }
      />
      <TextField
        type="text"
        name="middleName"
        label="Middle Name"
        error={!!participantDataFormik.errors.middleName}
        value={participantDataFormik.values.middleName}
        onChange={participantDataFormik.handleChange}
        helperText={
          participantDataFormik.touched.middleName &&
          participantDataFormik.errors.middleName
        }
      />
      <TextField
        type="text"
        name="lastName"
        label="Last Name"
        error={!!participantDataFormik.errors.lastName}
        value={participantDataFormik.values.lastName}
        onChange={participantDataFormik.handleChange}
        helperText={
          participantDataFormik.touched.lastName &&
          participantDataFormik.errors.lastName
        }
      />
    </Stack>
  );
};

export default FullNameInput;
