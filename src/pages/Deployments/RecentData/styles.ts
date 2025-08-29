import { Card, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledCard = styled(Card)({
  padding: 25,
  borderRadius: 24,
});

export const Top = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export const TitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const FiltersContainer = styled('div')({
  display: 'flex',
  gap: 12,
});
