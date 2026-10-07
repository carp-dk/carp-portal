import { Button, Card, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export { Heading, Subheading } from '../styles';

export const StatusRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

export const StatusDot = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isLive',
})<{ isLive?: boolean }>(({ isLive, theme }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  flexShrink: 0,
  backgroundColor: isLive
    ? theme.palette.success.main
    : theme.palette.error.main,
}));

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isDisabled',
})<{ isDisabled?: boolean }>(({ isDisabled }) => ({
  display: 'block',
  borderRadius: 16,
  opacity: isDisabled ? '0.5' : 1,
  gridColumn: 'span 2',
  padding: 28,
}));

export const Top = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 16,
});

export const ButtonsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  alignItems: 'flex-start',
});

export const ActionButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[700]}`,
  borderRadius: 18,
  textTransform: 'none',
  padding: '12px 22px',
  color: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 8,
  whiteSpace: 'nowrap',
}));

export const DetailsContainer = styled('div')({
  marginTop: 20,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: 20,
});

export const Detail = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const DetailLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const DetailValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
}));

export const ShortCode = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 900,
  letterSpacing: 2,
}));

export const ShortCodeRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});

export const EmptyText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  opacity: 0.7,
  marginTop: 20,
}));
