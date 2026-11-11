import {
  Announcement,
  CarpServiceError,
  SetAnnouncementRequest,
} from '@carp-dk/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import carpApi from '@Utils/api/api';
import { useSnackbar } from '@Utils/snackbar';

// The site banner is the backend's system announcement. Reading it needs no
// token; setting and clearing it are admin endpoints.
export const useBanner = () => {
  return useQuery<Announcement | null, CarpServiceError>({
    queryKey: ['banner'],
    queryFn: () => carpApi.announcement.get(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useSetBanner = () => {
  const queryClient = useQueryClient();
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();

  return useMutation<
    Announcement | null,
    CarpServiceError,
    SetAnnouncementRequest
  >({
    mutationFn: (request) => carpApi.admin.setAnnouncement(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banner'] });
      setSnackbarSuccess('Banner published');
    },
    onError: (error) => setSnackbarError(error.message),
  });
};

export const useClearBanner = () => {
  const queryClient = useQueryClient();
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();

  return useMutation<void, CarpServiceError>({
    mutationFn: () => carpApi.admin.clearAnnouncement(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banner'] });
      setSnackbarSuccess('Banner removed');
    },
    onError: (error) => setSnackbarError(error.message),
  });
};
