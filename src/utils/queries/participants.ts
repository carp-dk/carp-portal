import carpApi from "@Utils/api/api";
import { useSnackbar } from "@Utils/snackbar";
import { getConfig } from "@carp-dk/authentication-react";
import carpDepolymentsCore from "@cachet/carp-deployments-core";
import carpStudiesCore from "@cachet/carp-studies-core";
import {
  CarpServiceError,
  ConsentResponse,
  ParticipantAccount,
  ParticipantGroups,
  ParticipantInfo,
  ParticipantWithRoles,
  InactiveDeployment,
} from "@carp-dk/client/models";
import { Statistics } from "@carp-dk/client/models/Statistics";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InputDataType } from "@carp-dk/client/models/InputDataTypes";
import { GenericEmailRequest } from "@carp-dk/client/models/Email";
import dk = carpStudiesCore.dk;

import ddk = carpDepolymentsCore.dk;

import Participant = dk.cachet.carp.studies.application.users.Participant;

import ParticipantData = ddk.cachet.carp.deployments.application.users.ParticipantData;
import StudyDeploymentStatus = ddk.cachet.carp.deployments.application.StudyDeploymentStatus;

type ParticipantGroupStatus =
  dk.cachet.carp.studies.application.users.ParticipantGroupStatus;

export const useParticipants = (studyId: string) => {
  return useQuery<Participant[], CarpServiceError, Participant[], any>({
    queryFn: () => carpApi.getParticipants_CORE(studyId, getConfig()),
    queryKey: ["participantsData", studyId],
  });
};

export const useStopParticipantGroup = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deploymentId: string) =>
      carpApi.stopParticipantGroup_CORE(studyId, deploymentId, getConfig()),
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
      setSnackbarError(error.httpResponseMessage);
    },
  });
};

export const useInactiveDeployments = (studyId: string, lastUpdate: number) => {
  return useQuery<InactiveDeployment[], CarpServiceError>({
    queryFn: () =>
      carpApi.getInactiveDeployments(studyId, lastUpdate, getConfig()),
    queryKey: ["inactiveDeployments", { studyId, lastUpdate }],
  });
};

export const useInviteParticipants = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (participantsWithRoles: ParticipantWithRoles[]) => {
      return carpApi.inviteNewParticipantGroup_CORE(
        studyId,
        participantsWithRoles,
        getConfig(),
      );
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
      setSnackbarError(error.httpResponseMessage);
    },
  });
};

export const usePostEmailSendGeneric = () => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();

  return useMutation({
    mutationFn: async (genericEmailRequest: GenericEmailRequest) => {
      return carpApi.postEmailSendGeneric(genericEmailRequest, getConfig());
    },
    onSuccess: () => {
      setSnackbarSuccess("Email has been sent!");
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.httpResponseMessage);
    },
  });
};

export const useAddParticipantByEmail = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) =>
      carpApi.addParticipantByEmailAddress_CORE(studyId, email, getConfig()),
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
      setSnackbarError(error.httpResponseMessage);
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
      return carpApi.generateAnonymousAccounts({
        studyId,
        redirectUri,
        amountOfAccounts,
        expirationSeconds,
        participantRoleName,
        config: getConfig(),
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
      setSnackbarError(error.httpResponseMessage);
    },
  });
};

export const useAddParticipants = (studyId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (emails: string[]) =>
      carpApi.addParticipants(studyId, emails, getConfig()),
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

export const useParticipantsInfo = (studyId: string) => {
  return useQuery<ParticipantInfo[], CarpServiceError>({
    queryFn: () => carpApi.getParticipantInfo(studyId, getConfig()),
    queryKey: ["participantsInfo", studyId],
  });
};

export const useParticipantsAccounts = (studyId: string) => {
  return useQuery<ParticipantAccount[], CarpServiceError>({
    queryFn: () => carpApi.getParticipantsAccounts(studyId, getConfig()),
    queryKey: ["participantsAccounts", studyId],
  });
};

export const useParticipantsStatus = (studyId: string) => {
  return useQuery<ParticipantGroupStatus[], CarpServiceError>({
    queryFn: async () =>
      carpApi.getParticipantGroupStatusList_CORE(studyId, getConfig()),
    queryKey: ["participantsStatus", studyId],
  });
};

export const useParticipantGroupsStatus = (studyId: string) => {
  return useQuery<ParticipantGroupStatus[], CarpServiceError>({
    queryFn: async () =>
      carpApi.getParticipantGroupStatusList_CORE(studyId, getConfig()),
    queryKey: ["participantsStatus", studyId],
  });
};

export const useParticipantGroupsAccountsAndStatus = (studyId: string) => {
  return useQuery<ParticipantGroups, CarpServiceError>({
    queryFn: async () =>
      carpApi.getParticipantGroupsAccountsAndStatus(studyId, getConfig()),
    queryKey: ["deployments", studyId],
  });
};

export const useStatistics = (studyId: string) => {
  const { data: participantsStatus, isLoading: participantsStatusLoading } =
    useParticipantsStatus(studyId);

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
      return carpApi.getDeploymentStatistics(deploymentIds, getConfig());
    },
    enabled: !participantsStatusLoading && !!participantsStatus,
  });
};

export const useGetParticipantData = (studyDepoymentId: string) => {
  return useQuery<ParticipantData, CarpServiceError>({
    queryKey: ["participantData", studyDepoymentId],
    queryFn: async () => {
      return carpApi.getParticipantData_CORE(studyDepoymentId, getConfig());
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
      return carpApi.setParticipantData_CORE(
        deploymentId,
        data.participantData,
        data.role,
        getConfig(),
      );
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

export const useParticipantConsent = (deploymentId: string) => {
  return useQuery<ConsentResponse[], CarpServiceError, ConsentResponse[], any>({
    queryFn: () => {
      return carpApi.getAllInformedConsent(deploymentId, getConfig());
    },
    queryKey: ["deploymentConsent", deploymentId],
  });
};

export const useRegisterDevice = (studyId: string) => {
  const { setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<
    StudyDeploymentStatus.Running,
    CarpServiceError,
    { studyDeploymentId: string; roleName: string; deviceId: string }
  >({
    mutationFn: ({ studyDeploymentId, roleName, deviceId }) => {
      return carpApi.registerDevice_CORE(
        studyDeploymentId,
        roleName,
        deviceId,
        getConfig(),
      );
    },
    onError: (error: CarpServiceError) => {
      if (
        error.httpResponseMessage !== "The passed device is already registered."
      ) {
        setSnackbarError(error.httpResponseMessage);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["deployments", studyId],
      });
    },
    retry: queryClient.defaultMutationOptions().retry,
  });
};

export const useDeviceDeployed = (studyId: string) => {
  const { setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<
    StudyDeploymentStatus.Running,
    CarpServiceError,
    { studyDeploymentId: string; roleName: string }
  >({
    mutationFn: async ({ studyDeploymentId, roleName }) => {
      const deviceDeployment = await carpApi.GetDeviceDeploymentFor_CORE(
        studyDeploymentId,
        roleName,
        getConfig(),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      return carpApi.updateDeviceRegistration(
        studyDeploymentId,
        roleName,
        (deviceDeployment as any).lastUpdatedOn,
        getConfig(),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["deployments", studyId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.httpResponseMessage);
    },
    retry: 0,
  });
};
