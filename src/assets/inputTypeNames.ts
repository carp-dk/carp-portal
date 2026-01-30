const enUS: { [key: string]: string } = {
  sex: 'Biological Sex',
  informed_consent: 'Informed Consent',
  phone_number: 'Phone Number',
  ssn: 'Social Security Number',
  full_name: 'Full Name',
  address: 'Address',
  diagnosis: 'Diagnosis (ICD-11)',
  note: 'Participant Note',
  onboarding_researcher: 'Onboarding Researcher',
  language: 'Preferred Language',
  occupation: 'Occupation',
  educational_degree: 'Educational Degree',
};

const getInputDataName = (key: string): string => {
  return enUS[key] || key;
};

export default getInputDataName;
