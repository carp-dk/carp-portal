import { Backdrop, Button, Divider, Drawer } from '@mui/material';
import { styled } from '@Utils/theme';

export const Container = styled(Drawer)(({ theme, open }) => ({
  'position': 'relative',
  'width': open ?
    360 :
    88,
  'flexShrink': 0,
  'zIndex': theme.zIndex.drawer,
  'whiteSpace': 'nowrap',
  'overflowX': 'hidden',
  'transition': theme.transitions.create('width', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  '& .MuiDrawer-paper': {
    padding: open ?
      24 :
      16,
    width: open ?
      360 :
      88,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.text.heading,
    overflowX: 'hidden',
    transition: theme.transitions.create(['width', 'padding'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  '& span': {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
  },
  '@media (max-width: 1540px)': {
    width: 88,
  },
}));

export const LogoWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  'padding': open ?
    '24px 14px' :
    '24px 3px',
  'transition': theme.transitions.create(['padding', 'margin'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  'marginBottom': 24,
  '& img': {
    height: 28,
  },
}));

export const SectionTitle = styled('span', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  textTransform: 'uppercase',
  color: theme.palette.background.default,
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.h5.fontWeight,
  height: open ?
    'initial' :
    0,
  padding: open ?
    '10px 16px' :
    '0 16px 0 8px',
  opacity: open ?
    1 :
    0,
  transition: theme.transitions.create(['opacity', 'height', 'padding'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const StyledDivider = styled(Divider, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  borderColor: '#CAC4D0',
  margin: open ?
    '8px 16px' :
    '8px 12px',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const MinimizeButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  'position': 'absolute',
  'bottom': 0,
  'minWidth': 36,
  'padding': 0,
  'color': theme.palette.primary.light,
  'transition': theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  'transform': open ?
    'rotateY(0deg)' :
    'rotateY(180deg)',
  '& svg': {
    fontSize: 36,
  },
  '&:hover': {
    backgroundColor: '#FCFCFF20',
  },
  '&:active': {
    backgroundColor: '#FCFCFF40',
  },
}));

export const MinimizeWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ open }) => ({
  flexGrow: 2,
  position: 'relative',
  minHeight: 60,
  display: 'flex',
  justifyContent: open ?
    'flex-end' :
    'center',
}));

export const StyledBackdrop = styled(Backdrop)({
  zIndex: 1,
});
