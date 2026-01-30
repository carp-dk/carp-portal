import { useFormik } from 'formik';
import AddressInput from './AddressInput';
import DiagnosisInput from './DiagnosisInput';
import EducationalDegreeInput from './EducationalDegreeInput';
import FullNameInput from './FullNameInput';
import LanguageInput from './LanguageInput';
import NoteInput from './NoteInput';
import OccupationInput from './OccupationInput';
import OnboardingResearcherInput from './OnboardingResearcherInput';
import PhoneNumberInput from './PhoneNumberInput';
import SSNInput from './SSNInput';

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
    case 'note':
      return <NoteInput formik={formik} editing={editing} />;
    case 'language':
      return <LanguageInput formik={formik} editing={editing} />;
    case 'occupation':
      return <OccupationInput formik={formik} editing={editing} />;
    case 'educational_degree':
      return <EducationalDegreeInput formik={formik} editing={editing} />;
    case 'onboarding_researcher':
      return <OnboardingResearcherInput formik={formik} editing={editing} />;
    default:
      console.error(`No input element found for ${name}`);
      return null;
  }
};

export default getInputElement;
