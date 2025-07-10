import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { Link } from 'react-router-dom';

export const StyledDescription = styled(Typography)({});

export const StyledLink = styled(Link)(({ theme }) => ({
  marginTop: 24,
  display: 'block',
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
}));
