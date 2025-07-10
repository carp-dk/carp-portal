import Alert, { AlertColor } from '@mui/material/Alert';
import { useSnackbar } from '@Utils/snackbar';
import { SyntheticEvent } from 'react';
import StyledSnackbar from './styles';

export interface SnackbarType {
  snackbarOpen: boolean;
  snackbarType: AlertColor;
  snackbarMessage: string;
}

const CustomizedSnackbar = () => {
  const { snackbarState, setSnackbarState } = useSnackbar();
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({
      snackbarOpen: false,
      snackbarType: snackbarState.snackbarType,
      snackbarMessage: snackbarState.snackbarMessage,
    });
  };
  return (
    <StyledSnackbar
      open={snackbarState.snackbarOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={snackbarState.snackbarType}
      >
        {snackbarState.snackbarMessage}
      </Alert>
    </StyledSnackbar>
  );
};

export default CustomizedSnackbar;
