import { Stack, TextField } from "@mui/material";
import { Address, InputDataType } from "@carp-dk/client/models/InputDataTypes";
import * as yup from "yup";
import { useFormik } from "formik";

type Props = {
  defaultValues: Address;
  setValues: React.Dispatch<
    React.SetStateAction<{
      [key: string]: InputDataType;
    }>
  >;
};

const validationSchema = yup.object({
  address1: yup.string().notRequired(),
  address2: yup.string().notRequired(),
  street: yup.string().notRequired(),
  city: yup.string().notRequired(),
  postalCode: yup.string().notRequired(),
  country: yup.string().notRequired(),
});

const AddressInput = ({ defaultValues, setValues }: Props) => {
  const participantDataFormik = useFormik({
    initialValues: {
      address1: defaultValues?.address1,
      address2: defaultValues?.address2,
      street: defaultValues?.street,
      city: defaultValues?.city,
      postalCode: defaultValues?.postalCode,
      country: defaultValues?.country,
    },
    validationSchema,
    onSubmit: async (inputValues) => {
      setValues((oldValues) => ({
        ...oldValues,
        "dk.carp.webservices.input.address": {
          __type: "dk.carp.webservices.input.address",
          address1: inputValues.address1,
          address2: inputValues.address2,
          street: inputValues.street,
          city: inputValues.city,
          postalCode: inputValues.postalCode,
          country: inputValues.country,
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
        name="address1"
        label="Address 1"
        error={!!participantDataFormik.errors.address1}
        value={participantDataFormik.values.address1}
        onChange={participantDataFormik.handleChange}
        helperText={
          participantDataFormik.touched.address1 &&
          participantDataFormik.errors.address1
        }
      />
      <TextField
        type="text"
        name="address2"
        label="Address 2"
        error={!!participantDataFormik.errors.address2}
        value={participantDataFormik.values.address2}
        onChange={participantDataFormik.handleChange}
        helperText={
          participantDataFormik.touched.address2 &&
          participantDataFormik.errors.address2
        }
      />
      <TextField
        type="text"
        name="street"
        label="Street"
        error={!!participantDataFormik.errors.street}
        value={participantDataFormik.values.street}
        onChange={participantDataFormik.handleChange}
        helperText={
          participantDataFormik.touched.street &&
          participantDataFormik.errors.street
        }
      />
      <TextField
        type="text"
        name="city"
        label="City"
        error={!!participantDataFormik.errors.city}
        value={participantDataFormik.values.city}
        onChange={participantDataFormik.handleChange}
        helperText={
          participantDataFormik.touched.city &&
          participantDataFormik.errors.city
        }
      />
      <TextField
        type="text"
        name="postalCode"
        label="Postal Codde"
        error={!!participantDataFormik.errors.postalCode}
        value={participantDataFormik.values.postalCode}
        onChange={participantDataFormik.handleChange}
        helperText={
          participantDataFormik.touched.postalCode &&
          participantDataFormik.errors.postalCode
        }
      />
      <TextField
        type="text"
        name="country"
        label="Country"
        error={!!participantDataFormik.errors.country}
        value={participantDataFormik.values.country}
        onChange={participantDataFormik.handleChange}
        helperText={
          participantDataFormik.touched.country &&
          participantDataFormik.errors.country
        }
      />
    </Stack>
  );
};

export default AddressInput;
