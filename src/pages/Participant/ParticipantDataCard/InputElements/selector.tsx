import { useFormik } from 'formik';
import FullNameInput from './FullNameInput';
import AddressInput from './AddressInput';
import SSNInput from './SSNInput';
import PhoneNumberInput from './PhoneNumberInput';
import DiagnosisInput from './DiagnosisInput';

const getInputElement = (
  name: string,
  formik: ReturnType<typeof useFormik>,
  editing: boolean,
) => {
  switch (name) {
    case 'full_name':
      return <FullNameInput formik={formik} editing={editing} />;
    case 'phone_number':
      return <PhoneNumberInput formik={formik} editing={editing} />;
    case 'ssn':
      return <SSNInput formik={formik} editing={editing} />;
    case 'address':
      return <AddressInput formik={formik} editing={editing} />;
    case 'diagnosis':
      return <DiagnosisInput formik={formik} editing={editing} />;
    default:

      console.error(`No input element found for ${name}`);
      return null;
  }
};

export default getInputElement;
