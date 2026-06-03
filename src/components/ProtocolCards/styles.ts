import { Card, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 56,
});

export const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 24,
  borderRadius: 10,
});

export const StyledNameCard = styled(Card)({
  display: 'grid',
  gridTemplateColumns: '2fr 5fr',
  gridTemplateRows: 'auto auto 1fr',
  padding: 24,
  borderRadius: 10,
  rowGap: 18,
  columnGap: 18,
});

export const CardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const ProtocolName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const ProtocolDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
