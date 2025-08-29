import { useSnackbar } from '@Utils/snackbar';
import { CarpServiceError } from '@carp-dk/client';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { Collapse, Stack } from '@mui/material';
import { useState } from 'react';
import { CodeBox, ErrorCard, StyledMessage, StyledWarningIcon } from './styles';

type Props = {
  message: string;
  error?: CarpServiceError | null;
};

const CarpErrorCardComponent = ({ message, error }: Props) => {
  const [open, setOpen] = useState(false);
  const { setSnackbarState } = useSnackbar();

  return (
    <ErrorCard>
      <Stack direction="column" spacing={2} alignItems="center">
        <StyledWarningIcon />
        <StyledMessage>{message}</StyledMessage>
        {error && (
          <>
            <StyledMessage
              onClick={() => setOpen(!open)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                cursor: 'pointer',
              }}
            >
              {open ?
                  <KeyboardArrowDown /> :
                  <KeyboardArrowUp />}
              Click here to show error
            </StyledMessage>
            <Collapse in={open}>
              <CodeBox sx={{ position: 'relative', padding: 2 }}>
                <code>
                  {JSON.stringify(error)}
                  {' '}
                </code>
                <ContentCopyRoundedIcon
                  fontSize="small"
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if ('clipboard' in navigator) {
                      setSnackbarState({
                        snackbarOpen: true,
                        snackbarType: 'success',
                        snackbarMessage: 'Error copied to clipboard',
                      });
                      navigator.clipboard.writeText(JSON.stringify(error));
                    }
                  }}
                />
              </CodeBox>
            </Collapse>
          </>
        )}
      </Stack>
    </ErrorCard>
  );
};

export default CarpErrorCardComponent;
