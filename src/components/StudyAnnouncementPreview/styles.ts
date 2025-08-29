import { Chip, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const AnnouncementLeft = styled('div')({
  'flexGrow': '1',
  '& img': {
    width: '100%',
  },
});

export const AnnouncementHeader = styled('div')({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  marginTop: '-8px',
  marginBottom: 8,
});

export const AnnouncementTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.heading,
  marginBottom: 12,
}));

export const AnnouncementSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const AnnouncementDate = styled(Typography)(({ theme }) => ({
  lineHeight: '2.3rem',
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
  'marginLeft': 12,
  'fontSize': 10,
  'height': 22,
  'textTransform': 'uppercase',
  '& > span': {
    padding: '0 10px',
  },
});
