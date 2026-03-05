import { Box, Button, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  backgroundColor: theme.palette.common.white,
  borderRadius: 16,
  padding: 24,
  maxWidth: 550,
}));

export const ModalTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 4,
}));

export const ModalDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const ModalContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

export const ModalContent = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const TextFieldLabel = styled('label')(({ theme }) => ({
  marginTop: 12,
  color: theme.palette.secondary.dark,
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h4.fontWeight,
  lineHeight: theme.typography.h4.lineHeight,
}));

export const ModalActions = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  marginTop: 24,
  width: '100%',
  justifyContent: 'flex-end',
});

export const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: 'none',
  padding: '8px 24px',
  borderRadius: 16,
}));

export const DoneButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: '8px 24px',
  borderRadius: 16,
}));
