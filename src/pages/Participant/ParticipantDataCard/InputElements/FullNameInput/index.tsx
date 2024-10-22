import { Stack, TextField } from "@mui/material";
import { useFormik } from "formik";

type Props = {
  formik: ReturnType<typeof useFormik>;
  editing: boolean;
};

const FullNameInput = ({ formik, editing }: Props) => {
  return (
    <Stack direction="row" gap={2}>
      <TextField
        disabled={!editing}
        type="text"
        name="full_name.firstName"
        label="First Name"
        fullWidth
        value={formik.values.full_name.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextField
        disabled={!editing}
        type="text"
        name="full_name.middleName"
        label="Middle Name"
        fullWidth
        value={formik.values.full_name.middleName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextField
        disabled={!editing}
        type="text"
        name="full_name.lastName"
        label="Last Name"
        fullWidth
        value={formik.values.full_name.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </Stack>
  );
};

export default FullNameInput;
