import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  action: () => void;
  actionText?: string;
  title: string;
  description: string;
  loading?: boolean;
};

const DeletionPrompt = ({
  open,
  onClose,
  action,
  actionText,
  title,
  description,
  loading,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle variant="h3">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {loading ?
            (
              <Button color="primary" variant="contained" disabled>
                <CircularProgress size={24} />
              </Button>
            ) :
            (
              <>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={action} color="error">
                  {actionText ?? 'Delete'}
                </Button>
              </>
            )}
      </DialogActions>
    </Dialog>
  );
};

export default DeletionPrompt;
