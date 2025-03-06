import carpApi from "@Utils/api/api";
import { useCurrentUser } from "@Utils/queries/auth";
import { useSnackbar } from "@Utils/snackbar";
import {
  CarpServiceError,
  LatestProtocol,
  StudyProtocol,
  StudyProtocolSnapshot,
} from "@carp-dk/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

export const useProtocols = () => {
  const { data: currentUser } = useCurrentUser();
  return useQuery<StudyProtocolSnapshot[], CarpServiceError>({
    queryFn: async () =>
      carpApi.protocols.getAll({
        ownerId: currentUser.accountId.stringRepresentation,
      }),
    queryKey: ["protocols"],
    enabled: !!currentUser,
  });
};

export const useProtocolDetails = (protocolId: string) => {
  return useQuery<StudyProtocolSnapshot, CarpServiceError>({
    queryFn: () => carpApi.protocols.getBy({ protocolId }),
    queryKey: ["protocol", protocolId],
  });
};

export const useLatestProtocol = (protocolId: string) => {
  return useQuery<LatestProtocol, CarpServiceError>({
    queryFn: () => carpApi.protocols.getLatest({ protocolId }),
    queryKey: ["latestProtocol", protocolId],
  });
};

export const useCreateProtocol = () => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      protocol: StudyProtocol;
      description: string;
      version: string;
    }) => {
      const { protocol } = data;
      protocol.id = uuidv4().toString();
      protocol.createdOn = new Date();
      protocol.ownerId = currentUser.accountId.stringRepresentation;
      protocol.name = data.name;
      protocol.description = data.description;

      return carpApi.protocols.create({ protocol, versionTag: data.version });
    },
    onSuccess: () => {
      setSnackbarSuccess("Protocol created successfuly");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["protocols"] });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};

export const useUpdateProtocol = (originalProtocolId: string) => {
  const { setSnackbarSuccess, setSnackbarError } = useSnackbar();
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      protocol: StudyProtocol;
      description: string;
      versionTag: string;
    }) => {
      const { protocol } = data;
      protocol.id = originalProtocolId;
      protocol.createdOn = new Date();
      protocol.ownerId = currentUser.accountId.stringRepresentation;
      protocol.name = data.name;
      protocol.description = data.description;
      return carpApi.protocols.update({
        protocol,
        versionTag: data.versionTag,
      });
    },
    onSuccess: () => {
      setSnackbarSuccess("Protocol created successfuly");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["protocols"] });
      queryClient.invalidateQueries({
        queryKey: ["latestProtocol", originalProtocolId],
      });
      queryClient.invalidateQueries({
        queryKey: ["anonymousParticipant", originalProtocolId],
      });
    },
    onError: (error: CarpServiceError) => {
      setSnackbarError(error.message);
    },
  });
};
