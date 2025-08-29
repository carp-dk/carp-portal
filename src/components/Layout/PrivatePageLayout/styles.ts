import { Container } from '@mui/system';
import { styled } from '@Utils/theme';

export const PrivatePageBanner = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '56px 72px 32px 72px',
  alignItems: 'center',
  [theme.breakpoints.down('xl')]: {
    padding: '36px 72px 26px 72px',
  },
  [theme.breakpoints.down('lg')]: {
    padding: '24px 36px 16px 36px',
  },
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export const CustomContainer = styled(Container)(({ theme }) => ({
  maxWidth: 1320,
  [theme.breakpoints.up('sm')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 'auto',
  [theme.breakpoints.up('xl')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  [theme.breakpoints.down('xl')]: {
    maxWidth: 1464,
    paddingLeft: 72,
    paddingRight: 72,
  },
  [theme.breakpoints.down('lg')]: {
    paddingLeft: 36,
    paddingRight: 36,
  },
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));
