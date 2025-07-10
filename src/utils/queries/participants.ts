import carpApi from '@Utils/api/api';
import { useSnackbar } from '@Utils/snackbar';
import {
  CarpServiceError,
  ParticipantAccount,
  ParticipantGroups,
  ParticipantInfo,
  ParticipantWithRoles,
  InactiveDeployment,
  Statistics,
  InputDataType,
  GenericEmailRequest,
  ExpectedParticipantData,
  Participant,
  ParticipantGroupStatus,
  StudyDeploymentStatus,
  ArrayList,
  PaginatedParticipantAccounts,
} from '@carp-dk/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useInactiveDeployments = (studyId: string, lastUpdate: number) => {
  return useQuery<InactiveDeployment[], CarpServiceError>({
    queryFn: () =>
      carpApi.study.recruitment.getInactiveDeployments({ studyId, lastUpdate }),
    queryKey: ['inactiveDeployments', { studyId, lastUpdate }],
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
}

export const useGenerateAnonymousAccounts = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      redirectUri,
      amountOfAccounts,
      expirationSeconds,
      participantRoleName,
    }: GenerateAnonymousAccountsParams) => {
      return carpApi.study.recruitment.generateAnonymousAccounts({
        studyId,
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

export const useParticipantsAccounts = (studyId: string) => {
  return useQuery<ParticipantAccount[] | PaginatedParticipantAccounts, CarpServiceError>({
    queryFn: () =>
      carpApi.study.recruitment.getParticipantAccounts({ studyId }),
    queryKey: ['participantsAccounts', studyId],
  });
};

export const useParticipantsStatus = (studyId: string) => {
  return useQuery<ArrayList<ParticipantGroupStatus>, CarpServiceError>({
    queryFn: async () =>
      carpApi.study.recruitment.getParticipantGroupStatusList({ studyId }),
    queryKey: ['participantsStatus', studyId],
  });
};

export const useParticipantGroupsAccountsAndStatus = (studyId: string) => {
  return useQuery<ParticipantGroups, CarpServiceError>({
    queryFn: async () =>
      carpApi.study.recruitment.getParticipantGroupAccountsAndStatus({
        studyId,
      }),
    queryKey: ['deployments', studyId],
  });
};

export const useStatistics = (studyId: string) => {
  const { data: participantsStatus, isLoading: participantsStatusLoading } =
    useParticipantsStatus(studyId);

  const deploymentIds: string[] = [];
  if (participantsStatus) {
    participantsStatus.toArray().forEach((ps: ParticipantGroupStatus) => {
      deploymentIds.push(ps.id.stringRepresentation);
    });
  }

  return useQuery<Statistics[], CarpServiceError>({
    queryKey: ['statistics', deploymentIds],
    queryFn: async () => {
      if (deploymentIds.length === 0) {
        return [];
      }
      return carpApi.study.deployments.getDeploymentStatistics({
        deploymentIds,
      });
    },
    enabled: !participantsStatusLoading && !!participantsStatus,
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
