import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const UploadFileBox = styled('div')(({ theme }) => ({
  'display': 'flex',
  'flexDirection': 'column',
  'gap': 8,
  'alignItems': 'center',
  'justifyContent': 'center',
  'flex': '1 0',
  'border': `2px dashed ${theme.palette.grey[300]}`,
  'borderRadius': 8,
  'cursor': 'pointer',
  '& > svg': {
    fontSize: 48,
    color: theme.palette.primary.main,
  },
  'padding': 25,
}));

export const UploadFileText = styled(Typography, {
  shouldForwardProp: prop => prop !== 'error',
})<{ error?: boolean }>(({ error, theme }) => ({
  color: error ? theme.palette.error.main : theme.palette.text.primary,
}));

export const UploadFileBrowseWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 4,
});

export const UploadFileBrowse = styled(UploadFileText)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: 'inline-block',
  textAlign: 'center',
}));

export const UploadFileBoxHover = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '1rem',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export const UploadEllipse = styled('div', {
  shouldForwardProp: prop => prop !== 'error',
})<{ error?: boolean }>(({ error, theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'flexDirection': 'column',
  'gap': 12,
  'width': 170,
  'height': 170,
  'borderRadius': '50%',
  'border': `10px solid ${
    error ? theme.palette.error.main : theme.palette.primary.light
  }`,
  'marginBottom': 8,
  '& > svg': {
    fontSize: 36,
    color: error ? theme.palette.error.main : theme.palette.success.main,
  },
}));

export const EmptyFileWrapper = styled('div')({
  textAlign: 'center',
  marginTop: 8,
});

export const FileNameInElipse = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  textAlign: 'center',
}));

export const FileUploadStatus = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
}));
