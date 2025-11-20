import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 16,
}));

export const CardsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 24,
});

export const SpinnerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '36px 0',
});
