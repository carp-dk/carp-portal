import { Button, Card, Divider, Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { getDeploymentStatusColor } from '@Utils/utility';

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 16px',
  marginBottom: 32,
  borderRadius: 8,
  border: `1px solid ${theme.palette.grey[700]}`,
  boxShadow: 'none',
}));

export const Left = styled('div')({
  display: 'grid',
  gridTemplateColumns: '48px 1fr auto auto auto',
  alignItems: 'center',
  gap: 16,
});

export const Right = styled('div')({
  'display': 'flex',
  '& button': {
    paddingBottom: 10,
  },
});

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.grey[300],
  borderWidth: 1,
  width: 400,
  marginTop: 10,
  marginBottom: 10,
  marginRight: 36,
  height: 1,
}));

export const SecondaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: 4,
}));

export const StyledStatusDot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status?: string }>(({ status }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: getDeploymentStatusColor(status),
  flexShrink: 0,
}));

export const StyledStatusText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status?: string }>(({ status }) => ({
  color: getDeploymentStatusColor(status),
  textTransform: 'uppercase',
}));

export const ExportButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[700]}`,
  borderRadius: 16,
  textTransform: 'none',
  padding: '8px 16px',
  color: theme.palette.primary.main,
  gap: 8,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  'border': `1px solid ${theme.palette.grey[700]}`,
  'borderRadius': 16,
  'textTransform': 'none',
  'padding': '8px 16px',
  'color': theme.palette.error.main,
  'gap': 8,
  '&:disabled': {
    color: theme.palette.primary.main,
    opacity: '0.4',
  },
}));
