import { getUser } from '@carp-dk/authentication-react';
import { CarpServiceError, parseUser, User } from '@carp-dk/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import carpApi from '@Utils/api/api';
import { useSnackbar } from '@Utils/snackbar';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';

export const useInviteResearcher = () => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();

  return useMutation<void, CarpServiceError, string>({
    mutationFn: (emailAddress: string) => {
      return carpApi.accounts.invite({ emailAddress, role: 'Researcher' }); // TODO: add invite researcher to http client
    },
    onSuccess: () => {
      setSnackbarSuccess('Invitation sent');
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

export const useCurrentUser = () => {
  const auth = useAuth();

  return useQuery<User, CarpServiceError>({
    queryKey: ['currentUser'],
    queryFn: () => {
      const user = parseUser(getUser()?.access_token);
      carpApi.setAuthToken(getUser()?.access_token);
      return user;
    },
    retry: false,
    enabled: !!auth.isAuthenticated || auth.isLoading,
  });
};

export const useRedirectURIs = () => {
  return useQuery<{ [key: string]: string[] }, CarpServiceError>({
    queryKey: ['redirectURIs'],
    queryFn: async () => {
      return (await carpApi.accounts.getRedirectURIs()).data;
    },
    retry: false,
  });
};

/**
 * Resolves the Keycloak clients that can receive magic links into a default
 * redirect URI per client, and reports the clients we have no default for so
 * the caller can ask for the redirect URI manually.
 */
export const useRedirectUriMap = () => {
  const { data: redirectURIs, isLoading } = useRedirectURIs();

  const [preDefinedUriMap, setPreDefinedUriMap] = useState({});
  const [notMappedClientNames, setNotMappedClientNames] = useState<string[]>(
    [],
  );

  useEffect(() => {
    if (!redirectURIs) return;
    const studyAppClientName = Object.keys(redirectURIs).find((key) =>
      key.includes('studies-app'),
    );
    const icatClientName = Object.keys(redirectURIs).find((key) =>
      key.includes('icat'),
    );
    const neuropathyAppClientName = Object.keys(redirectURIs).find((key) =>
      key.includes('neuropathy-app'),
    );
    const mcatClientName = Object.keys(redirectURIs).find((key) =>
      key.includes('mcat'),
    );
    setNotMappedClientNames(
      Object.keys(redirectURIs).filter(
        (key) =>
          key !== studyAppClientName &&
          key !== icatClientName &&
          key !== neuropathyAppClientName &&
          key !== mcatClientName,
      ),
    );

    if (globalThis.location.host.includes('localhost')) {
      setPreDefinedUriMap({
        [studyAppClientName]: `https://study.app.dev.carp.dk/anonymous`,
        [neuropathyAppClientName]: `https://neuropathy.app.dev.carp.dk/anonymous`,
        [icatClientName]: `https://dev.carp.dk/icat`,
        [mcatClientName]: `https://mcat.app.dev.carp.dk/anonymous`,
      });
      return;
    }

    setPreDefinedUriMap({
      [studyAppClientName]: `https://study.app.${globalThis.location.host}/anonymous`,
      [icatClientName]: `https://${globalThis.location.host}/icat`,
      [neuropathyAppClientName]: `https://neuropathy.app.${globalThis.location.host}/anonymous`,
      [mcatClientName]: `https://mcat.app.${globalThis.location.host}/anonymous`,
    });
  }, [redirectURIs]);

  return { redirectURIs, preDefinedUriMap, notMappedClientNames, isLoading };
};
