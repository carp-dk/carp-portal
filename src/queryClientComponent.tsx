import { useSnackbar } from "@Utils/snackbar";
import { CarpServiceError } from "@carp-dk/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

let hasOngoingRefreshRequest = false;

const QueryClientComponent = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { setSnackbarError } = useSnackbar();

  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          /*
           *  This function is called when a query fails.
           *  When a researcher creates a new resource, they need a claim in their token to be able to access it.
           *  i.e when creating a new study, they won't be able to reqeust all studies as they will get a 403 error.
           *  We need to refresh the token to get the new claim.
           */
          retry: (failureCount, error) => {
            // if it's the first attempt at retrying and the status is 403, refresh the token
            if (
              failureCount === 0 &&
              (error as unknown as CarpServiceError).httpResponseCode === 403 &&
              !hasOngoingRefreshRequest
            ) {
              hasOngoingRefreshRequest = true;

              auth
                .signinSilent()
                .then(() => {
                  // we invalidate all active queries to let them refetch automatically
                  queryClient.invalidateQueries({ refetchType: "active" });
                  return true;
                })
                .catch(() => {
                  // could not refresh token for some reason
                  queryClient.clear();
                  auth.signoutSilent();
                  navigate("/", { replace: true });

                  return false;
                })
                .finally(() => {
                  hasOngoingRefreshRequest = false;
                });
            } else if (
              failureCount === 1 &&
              (error as unknown as CarpServiceError).httpResponseCode === 403
            ) {
              // we already tried refreshing the token. the user really shouldn't be able to access this
              // throw them back to the homepage
              setSnackbarError("You do not have access to this resource.");
              navigate("/", { replace: true });
            }
            if (
              failureCount === 1 &&
              (error as unknown as CarpServiceError).httpResponseCode === 401
            ) {
              setSnackbarError(
                "You are not authorized to access this resource.",
              );
              navigate("/", { replace: true });
            }
            return failureCount < 3;
          },
        },
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientComponent;
