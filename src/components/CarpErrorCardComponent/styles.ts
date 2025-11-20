import { styled } from '@Utils/theme';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Card, Typography, lighten } from '@mui/material';

export const ErrorCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '16px 24px',
  marginBottom: 32,
  borderRadius: 8,
  border: `3px solid ${theme.palette.error.main}`,
  backgroundColor: lighten(theme.palette.error.main, 0.7),
}));

export const StyledWarningIcon = styled(WarningIcon)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 40,
}));

export const StyledMessage = styled(Typography)({
  fontSize: 16,
  fontWeight: 500,
  textAlign: 'center',
  color: '#000',
  marginTop: 16,
  marginBottom: 0,
});

export const CodeBox = styled(Box)(({ theme }) => ({
  backgroundColor: lighten(theme.palette.error.main, 0.9),
}));
