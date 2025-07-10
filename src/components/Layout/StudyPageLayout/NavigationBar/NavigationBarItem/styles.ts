import { ListItemButton, ListItemIcon } from '@mui/material';
import { styled } from '@Utils/theme';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)({
  textDecoration: 'none',
  margin: '4px 0',
});

export const StyledIcon = styled(ListItemIcon)(({ theme }) => ({
  'color': theme.palette.primary.light,
  'minWidth': 28,
  'marginRight': 16,
  '& svg': {
    fontSize: 24,
  },
}));

export const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: prop => prop !== 'active',
})<{ active?: boolean }>(({ active, theme }) => ({
  'borderRadius': 16,
  'padding': '13px 16px',
  'margin': '4px 0',
  'gap': 12,
  'backgroundColor': active
    ? theme.palette.drawer.active
    : theme.palette.text.heading,
  '& span': {
    color: active
      ? theme.palette.text.heading
      : theme.palette.background.default,
  },
  '& svg': {
    color: active ? theme.palette.primary.dark : theme.palette.primary.light,
  },
  '&:hover': {
    backgroundColor: active ? theme.palette.drawer.active : '#FCFCFF20',
  },
  '&:active': {
    backgroundColor: active ? theme.palette.drawer.active : '#FCFCFF40',
  },
}));
