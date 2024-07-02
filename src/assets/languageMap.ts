import * as flags from "react-flags-select";

type Flags = typeof flags;
type FlagKey = keyof Flags;

type LanguageLabelCountries =
  | "BG"
  | "HR"
  | "CZ"
  | "DK"
  | "NL"
  | "GB"
  | "EE"
  | "FI"
  | "FR"
  | "DE"
  | "GR"
  | "HU"
  | "IE"
  | "IT"
  | "LV"
  | "MT"
  | "PL"
  | "PT"
  | "RO"
  | "SK"
  | "SI"
  | "ES"
  | "SE";
type LanguageLabelsMapping = {
  [key in LanguageLabelCountries]: { primary: string; secondary: string };
};

export const languageLabels: LanguageLabelsMapping = {
  BG: { primary: "Bulgarian", secondary: "bg" },
  HR: { primary: "Croatian", secondary: "hr" },
  CZ: { primary: "Czech", secondary: "cs" },
  DK: { primary: "Danish", secondary: "da" },
  NL: { primary: "Dutch", secondary: "nl" },
  GB: { primary: "English", secondary: "en" },
  EE: { primary: "Estonian", secondary: "et" },
  FI: { primary: "Finnish", secondary: "fi" },
  FR: { primary: "French", secondary: "fr" },
  DE: { primary: "German", secondary: "de" },
  GR: { primary: "Greek", secondary: "el" },
  HU: { primary: "Hungarian", secondary: "hu" },
  IE: { primary: "Irish", secondary: "ga" },
  IT: { primary: "Italian", secondary: "it" },
  LV: { primary: "Latvian", secondary: "lv" },
  MT: { primary: "Maltese", secondary: "mt" },
  PL: { primary: "Polish", secondary: "pl" },
  PT: { primary: "Portuguese", secondary: "pt" },
  RO: { primary: "Romanian", secondary: "ro" },
  SK: { primary: "Slovak", secondary: "sk" },
  SI: { primary: "Slovenian", secondary: "sl" },
  ES: { primary: "Spanish", secondary: "es" },
  SE: { primary: "Swedish", secondary: "sv" },
};

export const countryCodeToPascalCase = (countryCode: string): string => {
  return `${countryCode.slice(0, 1)}${countryCode.charAt(1).toLowerCase()}`;
};

export const getFlag = (key: string): Flags[FlagKey] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const countryCode = Object.keys(languageLabels).find(
    (code) => languageLabels[code].secondary === (key as FlagKey),
  );

  if (countryCode) {
    const code = countryCodeToPascalCase(countryCode);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (code in flags) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return flags[code];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return flags.Gb;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return flags.Gb;
};

export const getCountry = (key: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const countryCode = Object.keys(languageLabels).find(
    (code) => languageLabels[code].secondary === (key as FlagKey),
  );

  if (countryCode) {
    return languageLabels[countryCode as LanguageLabelCountries].primary;
  }
  return "Unknown Language";
};
