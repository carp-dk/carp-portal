import { getUser } from '@carp-dk/authentication-react';
import { CarpServiceError, parseUser, User } from '@carp-dk/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import carpApi from '@Utils/api/api';
import { useSnackbar } from '@Utils/snackbar';
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
    queryFn: async () => {
      const user = parseUser(getUser()?.access_token);
      carpApi.setAuthToken(getUser()?.access_token);
      return user;
    },
    retry: false,
    enabled: !!auth.isAuthenticated || auth.isLoading,
  });
};
