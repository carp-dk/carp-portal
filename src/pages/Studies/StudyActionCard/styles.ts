import { Card, CardActionArea, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledCard = styled(CardActionArea)({
  display: 'flex',
  flexDirection: 'row',
  height: 'inherit',
  padding: 24,
  paddingLeft: 16,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
});

export const CreateNewCard = styled(CardActionArea)({
  display: 'flex',
  flexDirection: 'column',
  height: 'inherit',
  alignItems: 'center',
  justifyContent: 'center',
});

export const CardWrapper = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: 10,
  height: 312,
  width: 312,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const ContentWrapper = styled('div')(({ theme }) => ({
  color: theme.palette.info.main,
  textAlign: 'center',
}));

export const CardDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  textAlign: 'left',
  width: '100%',
  marginTop: 16,
}));

export const NewStudyContent = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: 'flex',
  width: '100%',
  wordBreak: 'break-word',
  marginBottom: 16,
}));

export const InfoContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  paddingLeft: 12,
});

export const Bottom = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  flexGrow: 2,
  paddingBottom: 32,
});

export const CreationText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  marginBottom: 4,
}));
