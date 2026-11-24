import {
  CarpServiceError,
  DataStreamId,
  DataStreamSummary,
  DataStreamSummaryRequest,
  NamespacedId,
  UUID,
} from '@carp-dk/client';
import { useQueries, useQuery, UseQueryOptions } from '@tanstack/react-query';
import carpApi from '@Utils/api/api';
import CarpDataStreamBatch from '@carp-dk/client/shared/models/carpDataStreamBatch';

export const useDataStreamsSummary = (
  request: DataStreamSummaryRequest,
  options?: UseQueryOptions,
) => {
  return useQuery<DataStreamSummary, CarpServiceError>({
    queryFn: () => carpApi.dataStreams.getDataStreamSummary(request),
    queryKey: ['dataStreamSummary', { ...request }],
    enabled: options?.enabled ?? true,
  });
};

export const useDataStreamsSummaries = (
  requests: DataStreamSummaryRequest[],
) => {
  return useQueries({
    queries: requests.map((request) => ({
      queryKey: ['dataStreamSummary', { ...request }],
      queryFn: () => carpApi.dataStreams.getDataStreamSummary(request),
      enabled: requests.length > 0,
    })),
  });
};

export const useDataStreamByTime = (
  {
    deploymentId,
    deviceRoleName,
    dataType,
    from,
    to,
  }: {
    deploymentId: string;
    deviceRoleName: string;
    dataType: string;
    from: Date;
    to: Date;
  },
  options?: { enabled?: boolean },
) => {
  return useQuery<CarpDataStreamBatch, CarpServiceError>({
    queryKey: [
      'dataStreamByTime',
      deploymentId,
      deviceRoleName,
      dataType,
      from.toISOString(),
      to.toISOString(),
    ],
    queryFn: () => {
      // dataType is "namespace.name", e.g. "dk.cachet.carp.heartrate". carp-core's NamespacedId
      // only accepts lowercase and throws otherwise, but protocols can spell types with capitals
      // (ICAT's "dk.cachet.icat.ConsonantRepetition"). The server stores them lowercase.
      const type = dataType.toLowerCase();
      const lastDot = type.lastIndexOf('.');
      return carpApi.dataStreams.getDataStreamByTime({
        dataStream: new DataStreamId(
          new UUID(deploymentId),
          deviceRoleName,
          new NamespacedId(type.slice(0, lastDot), type.slice(lastDot + 1)),
        ),
        from,
        to,
      });
    },
    enabled: options?.enabled ?? true,
  });
};
