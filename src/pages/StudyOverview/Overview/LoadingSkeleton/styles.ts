import { Card, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 24,
  height: 288,
  borderRadius: 16,
});

export const StyledDescription = styled(Typography)({
  marginTop: 8,
});

export const Top = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginBottom: 16,
  paddingBottom: 32,
});

export const StyledLink = styled(Typography)({
  marginTop: 16,
  cursor: 'pointer',
  textDecoration: 'underline',
  display: 'flex',
  flexDirection: 'row',
});

export const StyledStatus = styled('div')({
  alignSelf: 'flex-end',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  width: 42,
});
