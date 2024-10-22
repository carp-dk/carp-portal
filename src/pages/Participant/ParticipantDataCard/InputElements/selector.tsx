import { useFormik } from "formik";
import FullNameInput from "./FullNameInput";
import AddressInput from "./AddressInput";
import SSNInput from "./SSNInput";
import PhoneNumberInput from "./PhoneNumberInput";
import DiagnosisInput from "./DiagnosisInput";

const getInputElement = (
  name: string,
  formik: ReturnType<typeof useFormik>,
) => {
  switch (name) {
    case "full_name":
      return <FullNameInput formik={formik} />;
    case "phone_number":
      return <PhoneNumberInput formik={formik} />;
    case "ssn":
      return <SSNInput formik={formik} />;
    case "address":
      return <AddressInput formik={formik} />;
    case "diagnosis":
      return <DiagnosisInput formik={formik} />;
    default:
      console.error(`No input element found for ${name}`);
      return null;
  }
};

export default getInputElement;
