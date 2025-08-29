import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

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
  color: section ?
    theme.palette.primary.main :
    theme.palette.text.heading,
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.dark,
}));

export const HeaderContainer = styled('div')({
  marginBottom: 24,
});

export const Spinner = styled(CircularProgress)({
  marginRight: 4,
});
