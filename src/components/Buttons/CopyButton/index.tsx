import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { useSnackbar } from '@Utils/snackbar';
import StyledButton from './styles';

type Props = {
  textToCopy: string;
  idType: string;
  disabled?: boolean;
};

const CopyButton = ({ textToCopy, idType, disabled }: Props) => {
  const { setSnackbarState } = useSnackbar();

  const copyTextToClipboard = (event) => {
    event.stopPropagation();
    const message = `${idType} ID saved to clipboard`;
    if ('clipboard' in navigator) {
      setSnackbarState({
        snackbarOpen: true,
        snackbarType: 'success',
        snackbarMessage: message,
      });
      navigator.clipboard.writeText(textToCopy);
    }
    else {
      setSnackbarState({
        snackbarOpen: true,
        snackbarType: 'success',
        snackbarMessage: message,
      });
      document.execCommand('copy', true, textToCopy);
    }
  };

  return (
    <StyledButton
      disabled={disabled}
      onClick={event => copyTextToClipboard(event)}
    >
      {disabled
        ? (
            <ContentCopyRoundedIcon color="disabled" fontSize="small" />
          )
        : (
            <ContentCopyRoundedIcon fontSize="small" />
          )}
    </StyledButton>
  );
};

export default CopyButton;
