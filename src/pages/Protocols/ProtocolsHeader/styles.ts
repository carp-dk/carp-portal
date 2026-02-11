import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { NavLink } from 'react-router-dom';

export const Container = styled('div')({
  position: 'relative',
  marginBottom: 36,
});

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const BackButton = styled(NavLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: 'flex',
  textDecoration: 'none',
  minWidth: 0,
  height: 32,
  width: 'auto',
  marginBottom: 16,
  '& svg': {
    fontSize: 32,
  },
}));
