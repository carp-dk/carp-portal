import carpApi from '@Utils/api/api';
import { useSnackbar } from '@Utils/snackbar';
import {
  ArrayList,
  CarpServiceError,
  DeploymentStatusCountsDto,
  ExpectedParticipantData,
  GenericEmailRequest,
  InactiveDeployment,
  InputDataType,
  Participant,
  ParticipantGroups,
  ParticipantGroupStatus,
  ParticipantInfo,
  ParticipantWithRoles,
  StudyDeploymentStatus,
} from '@carp-dk/client';
import {
  PaginatedResponseDto,
  ParticipantAccountsRequestDto,
  ParticipantAccountSummaryDto,
} from '@carp-dk/client/endpoints/study/recruitment';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const useParticipants = (studyId: string) => {
  return useQuery<Participant[], CarpServiceError>({
    queryFn: () => carpApi.study.recruitment.getParticipants({ studyId }),
    queryKey: ['participantsData', studyId],
  });
};

export const useStopParticipantGroup = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deploymentId: string) =>
      carpApi.study.recruitment.stopParticipantGroup({
        studyId,
        studyDeploymentId: deploymentId,
      }),
    onSuccess: () => {
      setSnackbarSuccess('Deployment stopped successfuly');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['participantsData', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsInfo', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsStatus', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['deployments', studyId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

export const useUpdateParticipantGroup = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      representationName,
    }: {
      groupId: string;
      representationName: string;
    }) =>
      carpApi.study.recruitment.updateParticipantGroup({
        groupId,
        representationName,
      }),
    onSuccess: () => {
      setSnackbarSuccess('Deployment name updated successfuly');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['deployments', studyId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

export const useInactiveDeployments = (
  studyId: string,
  lastUpdate: number,
  enabled = true,
) => {
  return useQuery<InactiveDeployment[], CarpServiceError>({
    queryFn: () =>
      carpApi.study.recruitment.getInactiveDeployments({ studyId, lastUpdate }),
    queryKey: ['inactiveDeployments', { studyId, lastUpdate }],
    enabled,
  });
};

export const useInviteParticipants = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (participantsWithRoles: ParticipantWithRoles[]) => {
      return carpApi.study.recruitment.inviteNewParticipantGroup({
        studyId,
        participantsWithRoles,
      });
    },
    onSuccess: () => {
      setSnackbarSuccess('Participants deployed successfuly');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['participantsData', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsInfo', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsStatus', studyId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

export const usePostEmailSendGeneric = () => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();

  return useMutation({
    mutationFn: async (genericEmailRequest: GenericEmailRequest) => {
      return carpApi.email.sendEmail(genericEmailRequest);
    },
    onSuccess: () => {
      setSnackbarSuccess('Email has been sent!');
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

export const useAddParticipantByEmail = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) =>
      carpApi.study.recruitment.addOneByEmail({ studyId, email }),
    onSuccess: () => {
      setSnackbarSuccess('Participant added successfuly');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['participantsData', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsInfo', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsStatus', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsAccounts', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantAccountSummary'],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

interface GenerateAnonymousAccountsParams {
  amountOfAccounts: number;
  expirationSeconds: number;
  participantRoleName: string;
  redirectUri: string;
  clientId: string;
}

export const useGenerateAnonymousAccounts = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      clientId,
      redirectUri,
      amountOfAccounts,
      expirationSeconds,
      participantRoleName,
    }: GenerateAnonymousAccountsParams) => {
      return carpApi.study.recruitment.generateAnonymousAccounts({
        studyId,
        clientId,
        redirectUri,
        amountOfAccounts,
        expirationSeconds,
        participantRoleName,
      });
    },
    onSuccess: () => {
      setSnackbarSuccess(
        'Generation started, file will be available in Export page',
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['participantsData', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsInfo', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsStatus', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsAccounts', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['exports', studyId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

export const useAddParticipants = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (emails: string[]) =>
      carpApi.study.recruitment.addMultipleByEmail({ studyId, emails }),
    onSuccess: () => {
      setSnackbarSuccess('Participant added successfuly');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['participantsData', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsInfo', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsStatus', studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['participantsAccounts', studyId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

export const useParticipantsInfo = (studyId: string) => {
  return useQuery<ParticipantInfo[], CarpServiceError>({
    queryFn: () => carpApi.study.recruitment.getParticipantInfo({ studyId }),
    queryKey: ['participantsInfo', studyId],
  });
};

export const useParticipantsStatus = (studyId: string) => {
  return useQuery<ArrayList<ParticipantGroupStatus>, CarpServiceError>({
    queryFn: async () =>
      carpApi.study.recruitment.getParticipantGroupStatusList({ studyId }),
    queryKey: ['participantsStatus', studyId],
  });
};

export const useParticipantGroupsAccountsAndStatus = (
  studyId: string,
  // Pagination is all-or-nothing: pass page and size together, or neither.
  params?:
    | { page: number; size: number; search?: string; status?: string }
    | { page?: undefined; size?: undefined; search?: string; status?: string },
  enabled = true,
) => {
  return useQuery<ParticipantGroups, CarpServiceError>({
    queryFn: async () =>
      carpApi.study.recruitment.getParticipantGroupAccountsAndStatus({
        studyId,
        ...params,
      }),
    // Paged calls (Deployments page) get their own cache entry keyed by the params; the unpaged
    // call (single-deployment cards, overview) keeps the original key so nothing else changes.
    queryKey: params
      ? ['deployments', studyId, params]
      : ['deployments', studyId],
    // Keep the previous page visible while the next one loads so paging/search doesn't flash the
    // whole page back to a skeleton (and drop the toolbar). Only for multi-row list pages — a
    // single-deployment read (size 1) must NOT show a stale deployment while switching.
    placeholderData: (params?.size ?? 0) > 1 ? keepPreviousData : undefined,
    enabled,
  });
};

export const useDeploymentStatusCounts = (studyId: string) => {
  return useQuery<DeploymentStatusCountsDto, CarpServiceError>({
    queryFn: () =>
      carpApi.study.recruitment.getParticipantGroupStatusCounts({ studyId }),
    queryKey: ['deploymentStatusCounts', studyId],
  });
};

export const useGetParticipantData = (studyDeploymentId: string) => {
  return useQuery<ExpectedParticipantData, CarpServiceError>({
    queryKey: ['participantData', studyDeploymentId],
    queryFn: async () => {
      return carpApi.participation.getParticipantData({
        studyDeploymentId,
      });
    },
  });
};

export const useSetParticipantData = (deploymentId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      participantData: { [key: string]: InputDataType };
      role: string;
    }) => {
      return carpApi.participation.setParticipantData({
        studyDeploymentId: deploymentId,
        data: data.participantData,
        inputRoleName: data.role,
      });
    },
    onSuccess: () => {
      setSnackbarSuccess('Participant data updated successfuly');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['participantData', deploymentId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

export const useRegisterDevice = (studyId: string) => {
  const { setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<
    StudyDeploymentStatus,
    CarpServiceError,
    { studyDeploymentId: string; roleName: string; deviceId: string }
  >({
    mutationFn: ({ studyDeploymentId, roleName, deviceId }) => {
      return carpApi.study.deployments.registerDevice({
        studyDeploymentId,
        primaryDeviceRoleName: roleName,
        deviceId,
      });
    },
    onError: (error: CarpServiceError) => {
      if (error.message !== 'The passed device is already registered.') {
        setSnackbarError(error.message);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['deployments', studyId],
      });
    },
    retry: queryClient.defaultMutationOptions().retry,
  });
};

export const useDeviceDeployed = (studyId: string) => {
  const { setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<
    StudyDeploymentStatus,
    CarpServiceError,
    { studyDeploymentId: string; roleName: string }
  >({
    mutationFn: async ({ studyDeploymentId, roleName }) => {
      const deviceDeployment =
        await carpApi.study.deployments.getDeviceDeploymentFor({
          studyDeploymentId,
          primaryDeviceRoleName: roleName,
        });

      return carpApi.study.deployments.updateDeviceRegistration({
        studyDeploymentId,
        primaryDeviceRoleName: roleName,
        lastUpdated: deviceDeployment.lastUpdatedOn,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['deployments', studyId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
    retry: 0,
  });
};

export const useQueryParticipantAccounts = ({
  studyId,
  request,
}: {
  studyId: string;
  request: ParticipantAccountsRequestDto;
}) => {
  return useQuery<
    PaginatedResponseDto<ParticipantAccountSummaryDto>,
    CarpServiceError
  >({
    queryFn: () =>
      carpApi.study.recruitment.queryParticipantAccounts({
        studyId,
        request,
      }),
    queryKey: ['participantAccountSummary', { studyId, request }],
  });
};
