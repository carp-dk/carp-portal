import { Fab } from '@mui/material';
import { styled } from '@Utils/theme';

export const AnnouncementsContainer = styled('div')({
  'display': 'flex',
  'flexWrap': 'wrap',
  'gap': 24,
  'width': '100%',
  '& > *': {
    minWidth: '30%',
    width: 450,
    flexShrink: 0,
  },
  'marginTop': 12,
});

export const StyledFab = styled(Fab)(({ theme }) => ({
  'position': 'fixed',
  'zIndex': 100,
  'boxShadow': theme.shadows[2],
  'bottom': 36,
  'right': 36,
  'backgroundColor': theme.palette.secondary.light,
  'borderRadius': 16,
  'width': 72,
  'height': 72,
  '& > svg': {
    color: theme.palette.primary.main,
    fontSize: 48,
    stroke: theme.palette.secondary.light,
    strokeWidth: '0.50px',
  },
  '&:hover': {
    'backgroundColor': '#C7D7E4',
    '& > svg': {
      stroke: '#C7D7E4',
    },
  },
}));
