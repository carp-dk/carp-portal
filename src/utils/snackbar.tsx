import { SnackbarType } from '@Components/Snackbar';
import { createContext, ReactNode, use, useMemo, useState } from 'react';

type ProviderProps = {
  children: ReactNode;
};

type SnackbarContextType = {
  snackbarState: SnackbarType;
  setSnackbarState: (type: SnackbarType) => void;
  setSnackbarSuccess: (message: string) => void;
  setSnackbarError: (message: string) => void;
};

export const SnackbarContext = createContext({} as SnackbarContextType);

export const useSnackbar = (): SnackbarContextType => {
  return use(SnackbarContext);
};

export const SnackbarProvider = ({ children }: ProviderProps) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarType>({
    snackbarOpen: false,
    snackbarType: 'error',
    snackbarMessage: 'Unexpected error',
  });
  const setSnackbarSuccess = (message: string) => {
    setSnackbarState({
      snackbarOpen: true,
      snackbarType: 'success',
      snackbarMessage: message,
    });
  };

  const setSnackbarError = (message: string) => {
    setSnackbarState({
      snackbarOpen: true,
      snackbarType: 'error',
      snackbarMessage: message,
    });
  };

  const config = useMemo(() => {
    return {
      snackbarState,
      setSnackbarState,
      setSnackbarSuccess,
      setSnackbarError,
    };
  }, [snackbarState, setSnackbarState, setSnackbarSuccess, setSnackbarError]);

  return useMemo(
    () => <SnackbarContext value={config}>{children}</SnackbarContext>,
    [snackbarState, setSnackbarState, setSnackbarSuccess, setSnackbarError],
  );
};
