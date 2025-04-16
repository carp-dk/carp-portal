import {useQuery} from "@tanstack/react-query";
import carpApi from "@Utils/api/api";
import {
    CarpServiceError,
    DataStreamSummary,
    DataStreamSummaryRequest,
} from "@carp-dk/client";

export const useDataStreamsSummary = (request: DataStreamSummaryRequest) => {
    return useQuery<DataStreamSummary, CarpServiceError>({
        queryFn: () => carpApi.dataStreams.getDataStreamSummary(request),
        queryKey: ["dataStreamSummary", {...request}],
    });
};
//todo fix imports