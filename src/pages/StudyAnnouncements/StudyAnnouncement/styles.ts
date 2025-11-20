import { Alert, Chip, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledAlert = styled(Alert, {
  shouldForwardProp: prop => prop !== 'isSkeleton',
})<{ isSkeleton?: boolean }>(({ isSkeleton, theme }) => ({
  'border': 'none',
  'padding': '12px 24px 12px',
  '& .MuiAlert-message': {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
  },
  '& .MuiAlert-icon': {
    marginRight: 12,
    paddingTop: 8,
    color: isSkeleton
      ? theme.palette.background.default
      : theme.palette.primary.main,
  },
  '& img': {
    width: '100%',
  },
}));

export const AnnouncementLeft = styled('div')({
  flexGrow: '1',
});

export const AnnouncementHeader = styled('div')({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: 12,
  marginTop: '-8px',
  marginBottom: 8,
});

export const AnnouncementActions = styled('div')({
  display: 'flex',
  marginLeft: 'auto',
});

export const AnnouncementTitle = styled(Typography)(({ theme }) => ({
  marginBottom: 12,
  color: theme.palette.text.heading,
}));

export const AnnouncementSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const AnnouncementDate = styled(Typography)(({ theme }) => ({
  lineHeight: '1.3rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

export const AnnouncementMessage = styled(Typography)(({ theme }) => ({
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  padding: '4px 12px',
  marginTop: 12,
  fontWeight: 500,
  color: theme.palette.text.primary,
  whiteSpace: 'pre-line',
}));

export const CollapseWrapper = styled('div')({
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  'width': '100%',
  '& > button': {
    marginLeft: -24,
  },
});

export const AnnouncementType = styled(Chip)({
  'fontSize': 10,
  'height': 22,
  'textTransform': 'uppercase',
  '& > span': {
    padding: '0 10px',
  },
});
