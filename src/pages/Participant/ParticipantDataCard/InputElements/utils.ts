/* eslint-disable @typescript-eslint/no-explicit-any */
import carpStudies from '@cachet/carp-studies-core';
import { Data } from '@carp-dk/client';
import { UseMutationResult } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import sdk = carpStudies.dk;
import ExpectedParticipantData = sdk.cachet.carp.common.application.users.ExpectedParticipantData;

const phoneNumberValidationSchema = yup
  .object({
    phone_number: yup.object({
      countryCode: yup.string(),
      isoCode: yup.string().notRequired(),
      number: yup.string(),
    }),
  })
  .test(
    'conditional-required',
    'Country code is required when number is set',
    (value, schema) => {
      const {
        phone_number: { countryCode, number },
      } = value;

      if (number && !countryCode) {
        return schema.createError({
          path: 'phone_number.countryCode',
          message: 'Country code is required when number is set',
        });
      }

      if (countryCode && !number) {
        return schema.createError({
          path: 'phone_number.number',
          message: 'Number is required when country code is set',
        });
      }

      return true;
    },
  );

const ssnValidationSchema = yup
  .object({
    ssn: yup.object({
      country: yup.string(),
      socialSecurityNumber: yup.string(),
    }),
  })
  .test(
    'conditional-required',
    'Country code is required when number is set',
    (value, schema) => {
      const {
        ssn: { country, socialSecurityNumber },
      } = value;

      if (socialSecurityNumber && !country) {
        return schema.createError({
          path: 'ssn.country',
          message: 'Country is required when social security number is set',
        });
      }

      if (country && !socialSecurityNumber) {
        return schema.createError({
          path: 'ssn.socialSecurityNumber',
          message: 'Social Security Number is required when country is set',
        });
      }

      return true;
    },
  );

const fullNameValidationSchema = yup.object({
  full_name: yup.object({
    firstName: yup.string().notRequired(),
    middleName: yup.string().notRequired(),
    lastName: yup.string().notRequired(),
  }),
});

const addressValidationSchema = yup.object({
  address: yup.object({
    address1: yup.string().notRequired(),
    address2: yup.string().notRequired(),
    street: yup.string().notRequired(),
    city: yup.string().notRequired(),
    postalCode: yup.string().notRequired(),
    country: yup.string().notRequired(),
  }),
});

const diagnosisValidationSchema = yup
  .object({
    diagnosis: yup.object({
      effectiveDate: yup.date().notRequired(),
      diagnosis: yup.string().notRequired(),
      icd11Code: yup.string(),
      conclusion: yup.string().notRequired(),
    }),
  })
  .test(
    'conditional-required',
    'ICD11 code is required when other diagnosis fields are set',
    (value, schema) => {
      const {
        diagnosis: { effectiveDate, diagnosis, icd11Code, conclusion },
      } = value;

      if ((effectiveDate || diagnosis || conclusion) && !icd11Code) {
        return schema.createError({
          path: 'diagnosis.icd11Code',
          message: 'ICD11 code is required when other diagnosis fields are set',
        });
      }

      return true;
    },
  );

const educationalDegreeValidationSchema = yup
  .object({
    educational_degree: yup.object({
      level: yup.string(),
      details: yup.string().notRequired(),
    }),
  })
  .test(
    'conditional-required',
    'Level is required when details field is set',
    (value, schema) => {
      const {
        educational_degree: { level, details },
      } = value;

      if (details && !level) {
        return schema.createError({
          path: 'educational_degree.level',
          message: 'Level is required when details field is set',
        });
      }

      return true;
    },
  );

const occupationValidationSchema = yup
  .object({
    occupation: yup.object({
      roles: yup.array().of(yup.string()),
      other: yup.string().notRequired(),
    }),
  })
  .test(
    'conditional-required',
    'Other is required when roles include Other',
    (value, schema) => {
      const {
        occupation: { roles, other },
      } = value;

      if (roles && roles.includes('Other') && !other) {
        return schema.createError({
          path: 'occupation.other',
          message: 'Other is required when roles include Other',
        });
      }

      return true;
    },
  );

const handedOutDeviceValidationSchema = yup
  .object({
    handed_out_device: yup.object({
      devices: yup.array().of(
        yup.object({
          deviceId: yup.string(),
          deviceType: yup.string(),
          handedOutAt: yup.date(),
          notes: yup.string(),
        }),
      ),
    }),
  })
  .test(
    'conditional-required',
    'Device ID is required when Device Type, Handed Out At or Notes are set',
    (value, schema) => {
      const {
        handed_out_device: { devices },
      } = value;

      if (devices && devices.length > 0) {
        for (const device of devices) {
          if (
            (device.deviceType || device.handedOutAt || device.notes) &&
            !device.deviceId
          ) {
            return schema.createError({
              path: `handed_out_device.devices.${devices.indexOf(device)}.deviceId`,
              message: 'Device ID is required when other fields are set',
            });
          }
        }
      }

      return true;
    },
  );

const getParticipantDataFormik = (
  participantData: ExpectedParticipantData[] | undefined,
  startingData: Data[],
  setParticipantData: UseMutationResult<any, unknown, any, unknown>,
  role: string,
  setEditing: (boolean) => void,
) => {
  let validationSchema = yup.object({});

  const initialValues = {
    phone_number: {
      __type: '',
      countryCode: '',
      isoCode: '',
      number: '',
    },
    sex: {
      __type: '',
      value: '',
    },
    full_name: {
      __type: '',
      firstName: '',
      lastName: '',
      middleName: '',
    },
    address: {
      __type: '',
      address1: '',
      address2: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
    diagnosis: {
      __type: '',
      effectiveDate: null,
      diagnosis: '',
      icd11Code: '',
      conclusion: '',
    },
    ssn: {
      __type: '',
      country: '',
      socialSecurityNumber: '',
    },
    note: {
      __type: '',
      note: '',
    },
    educational_degree: {
      __type: '',
      level: '',
      details: '',
    },
    handed_out_device: {
      __type: '',
      devices: [],
    },
  };

  if (participantData && participantData.length !== 0) {
    participantData.forEach((data) => {
      if (data.attribute.inputDataType.name === 'informed_consent') return;
      if (!initialValues[data.attribute.inputDataType.name]) {
        initialValues[data.attribute.inputDataType.name] = {
          __type: '',
        };
      }
      initialValues[data.attribute.inputDataType.name].__type =
        `${data.attribute.inputDataType.namespace}.${data.attribute.inputDataType.name}`;

      switch (data.attribute.inputDataType.name) {
        case 'sex':
          break;
        case 'full_name':
          validationSchema = validationSchema.concat(fullNameValidationSchema);
          break;
        case 'phone_number':
          validationSchema = validationSchema.concat(
            phoneNumberValidationSchema,
          );
          break;
        case 'ssn':
          validationSchema = validationSchema.concat(ssnValidationSchema);
          break;
        case 'address':
          validationSchema = validationSchema.concat(addressValidationSchema);
          break;
        case 'diagnosis':
          validationSchema = validationSchema.concat(diagnosisValidationSchema);
          break;
        case 'educational_degree':
          validationSchema = validationSchema.concat(
            educationalDegreeValidationSchema,
          );
          break;
        case 'occupation':
          validationSchema = validationSchema.concat(
            occupationValidationSchema,
          );
          break;
        case 'handed_out_device':
          validationSchema = validationSchema.concat(
            handedOutDeviceValidationSchema,
          );
          break;
        default:
          break;
      }
    });
  }

  startingData?.forEach((data) => {
    const [k, e] = Object.entries(data)[0];
    initialValues[k.split('.').pop()] = {
      ...initialValues[k.split('.').pop()],
      ...e,
    };
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const newParticipantData = {};
      Object.values(values).forEach((value) => {
        if (value.__type && value.__type !== '') {
          if (Object.entries(value).every(([k, v]) => k === '__type' || !v)) {
            newParticipantData[(value as any).__type] = null;
          } else {
            newParticipantData[(value as any).__type] = value;
          }
        }
      });
      await setParticipantData.mutateAsync({
        participantData: newParticipantData,
        role,
      });
      setEditing(false);
    },
  });
  return formik;
};

export default getParticipantDataFormik;
