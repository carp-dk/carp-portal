import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { Link } from 'react-router-dom';

export const PathContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  marginBottom: 12,
});

export const PathItem = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'section',
})<{ section?: boolean }>(({ section, theme }) => ({
  color: section ? theme.palette.primary.main : theme.palette.text.heading,
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.dark,
}));

export const HeaderContainer = styled('div')({
  marginBottom: 24,
});

export const BackToStudyLink = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[700]}`,
  borderRadius: 18,
  color: theme.palette.primary.main,
  display: 'flex',
  fontWeight: 600,
  gap: 4,
  height: 36,
  marginBottom: 16,
  minWidth: 0,
  padding: '6px 16px 6px 10px',
  textDecoration: 'none',
  width: 'fit-content',
  '& svg': {
    fontSize: 22,
  },
}));

export const Spinner = styled(CircularProgress)({
  marginRight: 4,
});
