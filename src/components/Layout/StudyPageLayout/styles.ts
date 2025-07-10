import { Box, Container } from '@mui/material';
import { styled } from '@Utils/theme';
import { ElementType } from 'react';

export const PageWrapper = styled(Box)({
  display: 'flex',
});

export const ContentWrapper = styled(Box)<{ component: ElementType }>({
  flexGrow: 1,
});

export const StudyPageBanner = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '2.6rem 80px 2rem',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem 2rem 2rem',
  },
}));

export const CustomContainer = styled(Container)(({ theme }) => ({
  marginLeft: 144,
  marginRight: 208,
  paddingBottom: 60,
  width: 'auto',
  [theme.breakpoints.down('xl')]: {
    marginLeft: 72,
    marginRight: 104,
  },
  [theme.breakpoints.down('lg')]: {
    marginLeft: 36,
    marginRight: 72,
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));
