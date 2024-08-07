import carpApi from "@Utils/api/api";
import { useSnackbar } from "@Utils/snackbar";
import {
  CarpServiceError,
  Data,
  InformedConsentResponse,
  Nullable,
  ParticipantAccount,
  ParticipantGroups,
  ParticipantWithRoles,
  Statistics,
  NamespacedId,
  Participant,
  HashMap,
  ParticipantGroupStatus,
} from "@carp-dk/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useParticipants = (studyId: string) => {
  return useQuery<Participant[], CarpServiceError, Participant[], any>({
    queryFn: () => carpApi.study.recruitment.getParticipants({ studyId }),
    queryKey: ["participantsData", studyId],
  });
};

export const useStopParticipantGroup = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studyDeploymentId: string) =>
      carpApi.study.recruitment.stopParticipantGroup({
        studyId,
        studyDeploymentId,
      }),
    onSuccess: () => {
      setSnackbarSuccess("Deployment stopped successfuly");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["participantsData", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsInfo", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsStatus", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["deployments", studyId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
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
      setSnackbarSuccess("Participants deployed successfuly");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["participantsData", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsInfo", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsStatus", studyId],
      });
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
      setSnackbarSuccess("Participant added successfuly");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["participantsData", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsInfo", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsStatus", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsAccounts", studyId],
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
        "Generation started, file will be available in Export page",
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["participantsData", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsInfo", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsStatus", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsAccounts", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["exports", studyId],
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
      setSnackbarSuccess("Participant added successfuly");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["participantsData", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsInfo", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsStatus", studyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["participantsAccounts", studyId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

export const useParticipantsAccounts = (studyId: string) => {
  return useQuery<ParticipantAccount[], CarpServiceError>({
    queryFn: () =>
      carpApi.study.recruitment.getParticipantAccounts({ studyId }),
    queryKey: ["participantsAccounts", studyId],
  });
};

export const useParticipantGroupsStatus = (studyId: string) => {
  return useQuery<ParticipantGroupStatus[], CarpServiceError>({
    queryFn: async () =>
      carpApi.study.recruitment.getParticipantGroupStatusList({ studyId }),
    queryKey: ["participantsStatus", studyId],
  });
};

export const useParticipantGroupsAccountsAndStatus = (studyId: string) => {
  return useQuery<ParticipantGroups, CarpServiceError>({
    queryFn: async () =>
      carpApi.study.recruitment.getParticipantGroupAccountsAndStatus({
        studyId,
      }),
    queryKey: ["deployments", studyId],
  });
};

export const useStatistics = (studyId: string) => {
  const { data: participantsStatus, isLoading: participantsStatusLoading } =
    useParticipantGroupsStatus(studyId);

  const deploymentIds: string[] = [];
  if (participantsStatus) {
    participantsStatus.forEach((ps: ParticipantGroupStatus) => {
      deploymentIds.push(ps.id.stringRepresentation);
    });
  }

  return useQuery<Statistics[], CarpServiceError, Statistics[], any>({
    queryKey: ["statistics", deploymentIds],
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

export const useSetParticipantData = (deploymentId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      participantData: HashMap<NamespacedId, Nullable<Data>>;
      inputType: string;
    }) => {
      return carpApi.participation.setParticipantData({
        studyDeploymentId: deploymentId,
        data: data.participantData,
        inputType: data.inputType,
      });
    },
    onSuccess: () => {
      setSnackbarSuccess("Participant data updated successfuly");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["participantData", deploymentId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

export const useParticipantConsent = (
  studyDeploymentId: string,
  informedConsentId: number,
) => {
  return useQuery<
    InformedConsentResponse,
    CarpServiceError,
    InformedConsentResponse,
    any
  >({
    queryFn: () => {
      return carpApi.study.informedConsent.get({
        studyDeploymentId,
        informedConsentId,
      });
    },
    queryKey: ["participantConsent", { studyDeploymentId, informedConsentId }],
  });
};
