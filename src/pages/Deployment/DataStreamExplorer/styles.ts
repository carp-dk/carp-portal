import { styled } from '@Utils/theme';
import { Paper, Typography } from '@mui/material';

export const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gridColumn: 'span 2',
  paddingTop: 16,
});

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  display: 'flex',
  alignItems: 'center',
  marginTop: -8,
  marginBottom: 32,
}));

/** The window shared by every stream below it; a card like the accordions it sits above. */
export const Controls = styled(Paper)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap',
  padding: '16px 24px',
  marginBottom: 32,
  borderRadius: 16,
});

export const Body = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const Note = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const WindowNav = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const WindowLabel = styled(Typography)({
  fontVariantNumeric: 'tabular-nums',
  minWidth: 180,
  textAlign: 'center',
});
