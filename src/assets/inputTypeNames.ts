import enUS from "@Assets/localization/enUS";
import enDK  from "@Assets/localization/enDK";

const languages: { [locale: string]: { [key: string]: string } } = {
    'en-US': enUS,
    'en-DK': enDK
};

export const getInputDataName = (key: string, location?: string): string => {
    const localeData = languages[location || 'en-US'];
    return localeData[key] || key;
}
