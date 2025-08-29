import { Card, Stack, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isLive',
})<{ isLive?: boolean }>(({ isLive, theme }) => ({
  display: 'grid',
  gap: 32,
  marginTop: 32,
  gridTemplateColumns: '1fr 1fr',
  opacity: isLive ?
    '0.5' :
    1,
  [theme.breakpoints.down('md')]: {
    gap: 22,
  },
}));

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isDisabled',
})<{ isDisabled?: boolean }>(({ isDisabled }) => ({
  display: 'block',
  padding: '28px 28px 28px 28px',
  borderRadius: 16,
  opacity: isDisabled ?
    '0.5' :
    1,
}));

export const Heading = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{ disabled?: boolean }>(({ disabled, theme }) => ({
  color: theme.palette.primary.main,
  opacity: disabled ?
    '0.5' :
    1,
}));

export const Subheading = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{ disabled?: boolean }>(({ disabled, theme }) => ({
  color: theme.palette.text.primary,
  opacity: disabled ?
    '0.5' :
    1,
}));

export const ProtocolInformation = styled(Stack)(({ theme }) => ({
  gap: '8px',
  color: theme.palette.primary.main,
  cursor: 'pointer',
}));
