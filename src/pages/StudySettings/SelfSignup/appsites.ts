// Each app that supports self sign-up is served from its own site, and a
// sign-up code deep link lives at `<appsite>/code/<shortCode>`.
//
// Add an entry when a new app gains self sign-up support. An app that is not
// listed here simply gets no QR code — the short code itself still works, and
// that is deliberate: guessing a subdomain would render a QR that silently
// points nowhere.
const APPSITE_SUBDOMAINS: Record<string, string> = {
  mcat: 'mcat.app',
};

// Same host convention as the anonymous-participant redirect URIs.
const getServer = () =>
  globalThis.location.host.includes('localhost')
    ? 'dev.carp.dk'
    : globalThis.location.host;

export const getAppsite = (applicationName?: string | null) => {
  if (!applicationName) return null;
  const subdomain = APPSITE_SUBDOMAINS[applicationName.toLowerCase()];
  return subdomain ? `https://${subdomain}.${getServer()}` : null;
};

export const getSignupCodeUrl = (
  applicationName: string | null,
  shortCode: string,
) => {
  const appsite = getAppsite(applicationName);
  return appsite ? `${appsite}/code/${shortCode}` : null;
};
