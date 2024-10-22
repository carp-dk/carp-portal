import { Stack, TextField } from "@mui/material";
import { getIn, useFormik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale/en-GB";

type Props = {
  formik: ReturnType<typeof useFormik>;
};

const DiagnosisInput = ({ formik }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <Stack direction="column" gap={2}>
        <Stack direction="row" gap={2}>
          <TextField
            type="text"
            name="diagnosis.icd11Code"
            label="ICD-11 Code"
            fullWidth
            required
            error={
              getIn(formik.touched, "diagnosis.icd11Code") &&
              !!getIn(formik.errors, "diagnosis.icd11Code")
            }
            value={formik.values.diagnosis.icd11Code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              getIn(formik.touched, "diagnosis.icd11Code") &&
              getIn(formik.errors, "diagnosis.icd11Code")
            }
          />
          <DatePicker
            label="Effective date"
            name="diagnosis.effectiveDate"
            value={
              formik.values.diagnosis.effectiveDate
                ? new Date(formik.values.diagnosis.effectiveDate)
                : null
            }
            onChange={(value) =>
              formik.setFieldValue("diagnosis.effectiveDate", value)
            }
            slotProps={{
              actionBar: {
                actions: ["clear"],
              },
              textField: {
                name: "effectiveDateText",
                error:
                  getIn(formik.touched, "diagnosis.effectiveDate") &&
                  !!getIn(formik.errors, "diagnosis.effectiveDate"),
                helperText:
                  getIn(formik.touched, "diagnosis.effectiveDate") &&
                  getIn(formik.errors, "diagnosis.effectiveDate"),
                onBlur: formik.handleBlur,
                fullWidth: true,
              },
            }}
          />
        </Stack>
        <TextField
          type="text"
          name="diagnosis.diagnosis"
          label="Diagnosis"
          error={
            getIn(formik.touched, "diagnosis.diagnosis") &&
            !!getIn(formik.errors, "diagnosis.diagnosis")
          }
          value={formik.values.diagnosis.diagnosis}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            getIn(formik.touched, "diagnosis.diagnosis") &&
            getIn(formik.errors, "diagnosis.diagnosis")
          }
        />
        <TextField
          type="text"
          name="diagnosis.conclusion"
          label="Conclusion"
          multiline
          rows={6}
          error={
            getIn(formik.touched, "diagnosis.conclusion") &&
            !!getIn(formik.errors, "diagnosis.conclusion")
          }
          value={formik.values.diagnosis.conclusion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            getIn(formik.touched, "diagnosis.conclusion") &&
            getIn(formik.errors, "diagnosis.conclusion")
          }
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DiagnosisInput;
