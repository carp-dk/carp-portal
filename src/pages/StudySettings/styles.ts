import { Button, Card, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isLive',
})<{ isLive?: boolean }>(({ isLive, theme }) => ({
  display: 'grid',
  gap: 32,
  marginTop: 32,
  gridTemplateColumns: '1fr 1fr',
  opacity: isLive ? '0.5' : 1,
  [theme.breakpoints.down('md')]: {
    gap: 22,
  },
}));

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isDisabled',
})<{ isDisabled?: boolean }>(({ isDisabled, theme }) => ({
  display: 'block',
  padding: '28px 28px 28px 28px',
  borderRadius: 16,
  opacity: isDisabled ? '0.5' : 1,
  [theme.breakpoints.down('md')]: {
    gridColumn: 'span 2',
  },
}));

export const Heading = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{ disabled?: boolean }>(({ disabled, theme }) => ({
  color: theme.palette.primary.main,
  opacity: disabled ? '0.5' : 1,
}));

export const Subheading = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{ disabled?: boolean }>(({ disabled, theme }) => ({
  color: theme.palette.text.primary,
  opacity: disabled ? '0.5' : 1,
}));

export const ProtocolInformation = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[700]}`,
  borderRadius: 16,
  color: theme.palette.primary.main,
  fontSize: '0.8125rem',
  lineHeight: 1.4,
  minHeight: 30,
  padding: '4px 10px',
  textTransform: 'none',
  '& .MuiButton-endIcon': {
    marginLeft: 4,
  },
  '& svg': {
    fontSize: 16,
  },
}));
