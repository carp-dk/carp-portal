import * as flags from 'react-flags-select';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import isoCountries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

isoCountries.registerLocale(en);

type Flags = typeof flags;
type FlagKey = keyof Flags;

type LanguageLabelCountries =
  | 'BG' |
  'HR' |
  'CZ' |
  'DK' |
  'NL' |
  'GB' |
  'EE' |
  'FI' |
  'FR' |
  'DE' |
  'GR' |
  'HU' |
  'IE' |
  'IT' |
  'LV' |
  'MT' |
  'PL' |
  'PT' |
  'RO' |
  'SK' |
  'SI' |
  'ES' |
  'SE';
type LanguageLabelsMapping = {
  [key in LanguageLabelCountries]: { primary: string; secondary: string };
};

export const languageLabels: LanguageLabelsMapping = {
  BG: { primary: 'Bulgarian', secondary: 'bg' },
  HR: { primary: 'Croatian', secondary: 'hr' },
  CZ: { primary: 'Czech', secondary: 'cz' },
  DK: { primary: 'Danish', secondary: 'da' },
  NL: { primary: 'Dutch', secondary: 'nl' },
  GB: { primary: 'English', secondary: 'en' },
  EE: { primary: 'Estonian', secondary: 'et' },
  FI: { primary: 'Finnish', secondary: 'fi' },
  FR: { primary: 'French', secondary: 'fr' },
  DE: { primary: 'German', secondary: 'de' },
  GR: { primary: 'Greek', secondary: 'el' },
  HU: { primary: 'Hungarian', secondary: 'hu' },
  IE: { primary: 'Irish', secondary: 'ga' },
  IT: { primary: 'Italian', secondary: 'it' },
  LV: { primary: 'Latvian', secondary: 'lv' },
  MT: { primary: 'Maltese', secondary: 'mt' },
  PL: { primary: 'Polish', secondary: 'pl' },
  PT: { primary: 'Portuguese', secondary: 'pt' },
  RO: { primary: 'Romanian', secondary: 'ro' },
  SK: { primary: 'Slovak', secondary: 'sk' },
  SI: { primary: 'Slovenian', secondary: 'sl' },
  ES: { primary: 'Spanish', secondary: 'es' },
  SE: { primary: 'Swedish', secondary: 'sv' },
};

export const countryCodeToPascalCase = (countryCode: string): string => {
  return `${countryCode.slice(0, 1)}${countryCode.charAt(1).toLowerCase()}`;
};

export const getFlag = (key: string): Flags[FlagKey] => {
  const countryCode = Object.keys(languageLabels).find(
    (code) => languageLabels[code].secondary === (key as FlagKey),
  );

  if (countryCode) {
    const code = countryCodeToPascalCase(countryCode);

    if (code in flags) {
      return flags[code];
    }

    return flags.Gb;
  }

  return flags.Gb;
};

export const getCountry = (key: string): string => {
  const countryCode = Object.keys(languageLabels).find(
    (code) => languageLabels[code].secondary === (key as FlagKey),
  );

  if (countryCode) {
    return languageLabels[countryCode as LanguageLabelCountries].primary;
  }
  return 'Unknown Language';
};

export interface CountryInfo {
  name: string;
  isoCode: string;
  dialCode: string;
}

export const countryInfos = ((): CountryInfo[] => {
  const countries = getCountries();

  return countries.map((isoCode) => {
    const dialCode = getCountryCallingCode(isoCode);
    const name = isoCountries.getName(isoCode, 'en') || 'Unknown';

    return {
      name,
      isoCode,
      dialCode: `+${dialCode}`,
    };
  });
})();
