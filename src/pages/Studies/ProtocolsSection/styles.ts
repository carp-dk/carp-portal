import { Card, CardActionArea, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const CardWrapper = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  height: 220,
  border: `1px ${theme.palette.grey[500]} solid`,
  width: 648,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const StyledCard = styled(CardActionArea)(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  height: 'inherit',
  justifyContent: 'flex-start',
  padding: '30px 48px',
  backgroundColor: theme.palette.background.paper,
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  wordBreak: 'break-word',
}));

export const CardDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginTop: 16,
}));
