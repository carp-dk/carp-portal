import { Button, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const Title = styled(Typography)(({ theme }) => ({
  marginTop: 16,
  color: theme.palette.text.heading,
  marginBottom: 8,
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: 32,
}));

export const Toolbar = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
  margin: '24px 0 16px 0',
});

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: '8px 24px',
  borderRadius: 16,
}));
