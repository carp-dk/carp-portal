import { Stack, TextField } from "@mui/material";
import {
  Diagnosis,
  InputDataType,
} from "@carp-dk/client/models/InputDataTypes";
import * as yup from "yup";
import { useFormik } from "formik";
import { Instant } from "@js-joda/core";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale/en-GB";

type Props = {
  defaultValues: Diagnosis;
  setValues: React.Dispatch<
    React.SetStateAction<{
      [key: string]: InputDataType;
    }>
  >;
};

const validationSchema = yup.object({
  effectiveDate: yup.date().notRequired(),
  diagnosis: yup.string().notRequired(),
  icd11Code: yup.string().when({
    is: (diagnosis, effectiveDate, conclusion) =>
      diagnosis || effectiveDate || conclusion,
    then: (schema) => schema.required(),
  }),
  conclusion: yup.string().notRequired(),
});

const DiagnosisInput = ({ defaultValues, setValues }: Props) => {
  const participantDataFormik = useFormik({
    initialValues: {
      effectiveDate: defaultValues?.effectiveDate
        ? new Date(defaultValues.effectiveDate.toEpochMilli())
        : undefined,
      diagnosis: defaultValues?.diagnosis,
      icd11Code: defaultValues?.icd11Code,
      conclusion: defaultValues?.conclusion,
    },
    validationSchema,
    onSubmit: async (inputValues) => {
      setValues((oldValues) => ({
        ...oldValues,
        "dk.carp.webservices.input.diagnosis": {
          __type: "dk.carp.webservices.input.diagnosis",
          effectiveDate: inputValues.effectiveDate
            ? Instant.ofEpochMilli(inputValues.effectiveDate.getTime())
            : undefined,
          diagnosis: inputValues.diagnosis,
          icd11Code: inputValues.icd11Code,
          conclusion: inputValues.conclusion,
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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <Stack direction="row" gap={2} onBlur={handleBlur}>
        <TextField
          type="text"
          name="icd11Code"
          label="ICD-11 Code"
          error={!!participantDataFormik.errors.icd11Code}
          value={participantDataFormik.values.icd11Code}
          onChange={participantDataFormik.handleChange}
          helperText={
            participantDataFormik.touched.icd11Code &&
            participantDataFormik.errors.icd11Code
          }
        />
        <TextField
          type="text"
          name="diagnosis"
          label="Diagnosis"
          error={!!participantDataFormik.errors.diagnosis}
          value={participantDataFormik.values.diagnosis}
          onChange={participantDataFormik.handleChange}
          helperText={
            participantDataFormik.touched.diagnosis &&
            participantDataFormik.errors.diagnosis
          }
        />
        <DatePicker
          defaultValue={participantDataFormik.values.effectiveDate}
          label="Effective date"
          name="effectiveDate"
          value={participantDataFormik.values.effectiveDate}
          onChange={(value) =>
            participantDataFormik.setFieldValue("effectiveDate", value)
          }
          slotProps={{
            textField: {
              name: "effectiveDateText",
              error: !!participantDataFormik.errors.effectiveDate,
              helperText: participantDataFormik.errors.effectiveDate as string,
              onBlur: participantDataFormik.handleBlur,
              fullWidth: true,
            },
          }}
        />
        <TextField
          type="text"
          name="conclusion"
          label="Conclusion"
          error={!!participantDataFormik.errors.conclusion}
          value={participantDataFormik.values.conclusion}
          onChange={participantDataFormik.handleChange}
          helperText={
            participantDataFormik.touched.conclusion &&
            participantDataFormik.errors.conclusion
          }
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DiagnosisInput;
