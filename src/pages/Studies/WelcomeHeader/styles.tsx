import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const Title = styled(Typography)(({ theme }) => ({
  boxSizing: 'border-box',
  marginTop: 16,
  color: theme.palette.text.heading,
  marginBottom: 8,
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  boxSizing: 'border-box',
  color: theme.palette.text.primary,
  marginBottom: 56,
  overflowWrap: 'break-word',
}));
