import { Card, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  padding: 24,
  borderRadius: 16,
});

export const Top = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 16,
});

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: 8,
}));

export const Activity = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>(({ color }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color,
  whiteSpace: 'nowrap',
  '&::before': {
    content: '""',
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: color,
  },
}));

export const Figures = styled('div')({
  display: 'flex',
  gap: 48,
  flexWrap: 'wrap',
});

export const FigureValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontVariantNumeric: 'tabular-nums',
}));

export const FigureLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const LegendDot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>(({ color }) => ({
  width: 8,
  height: 8,
  minWidth: 8,
  borderRadius: '50%',
  backgroundColor: color,
}));
