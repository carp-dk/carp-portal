import {
  AdminResearcher,
  AdminStudy,
  CarpServiceError,
  ServerInfo,
} from '@carp-dk/client';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import carpApi from '@Utils/api/api';
import { useSnackbar } from '@Utils/snackbar';

export const useAdminResearchers = () => {
  return useQuery<AdminResearcher[], CarpServiceError>({
    queryKey: ['admin', 'researchers'],
    queryFn: () => carpApi.admin.getResearchers(),
  });
};

/** @param live Only live (true) or non-live (false) studies; all when undefined. */
export const useAdminStudies = (live?: boolean) => {
  return useQuery<AdminStudy[], CarpServiceError>({
    queryKey: ['admin', 'studies', live],
    queryFn: () => carpApi.admin.getStudies({ live }),
    placeholderData: keepPreviousData,
  });
};

export const useServerInfo = () => {
  return useQuery<ServerInfo, CarpServiceError>({
    queryKey: ['admin', 'serverInfo'],
    queryFn: () => carpApi.admin.getServerInfo(),
    refetchInterval: 30_000,
    retry: false,
  });
};

/**
 * Sends one email per researcher (no shared CC, so addresses stay private).
 * Resolves with the addresses that failed instead of rejecting on the first one.
 */
export const useEmailResearchers = () => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();

  return useMutation<
    { sent: number; failed: string[] },
    Error,
    { recipients: string[]; subject: string; message: string }
  >({
    mutationFn: async ({ recipients, subject, message }) => {
      const failed: string[] = [];
      for (const recipient of recipients) {
        try {
          await carpApi.email.sendEmail({ recipient, subject, message });
        } catch {
          failed.push(recipient);
        }
      }
      return { sent: recipients.length - failed.length, failed };
    },
    onSuccess: ({ sent, failed }) => {
      if (failed.length > 0) {
        setSnackbarError(
          `Sent to ${sent}, failed for ${failed.length}: ${failed.join(', ')}`,
        );
      } else {
        setSnackbarSuccess(`Email sent to ${sent} researchers`);
      }
    },
  });
};
