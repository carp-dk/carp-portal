import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { NavLink } from 'react-router-dom';

export const Container = styled('div')({
  position: 'relative',
  marginBottom: 36,
});

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 16,
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const BackButton = styled(NavLink)(({ theme }) => ({
  'color': theme.palette.primary.main,
  'position': 'absolute',
  'minWidth': 0,
  'top': 0,
  'left': '-36px',
  'height': 32,
  'width': 32,
  '& svg': {
    fontSize: 32,
  },
}));
