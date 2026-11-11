import { Box, Container, IconButton } from '@mui/material';
import { styled } from '@Utils/theme';
import { ElementType } from 'react';

export const PageWrapper = styled(Box)({
  display: 'flex',
});

export const ContentWrapper = styled(Box)<{ component: ElementType }>({
  flexGrow: 1,
  // Let wide content (tables) scroll inside the page instead of widening it
  minWidth: 0,
});

export const StudyPageBanner = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '2.6rem 80px 2rem',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1rem 1.5rem',
  },
}));

// Only shown on phones, where the navigation rail is replaced by a drawer
export const MenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  color: theme.palette.text.heading,
  [theme.breakpoints.down('sm')]: {
    display: 'inline-flex',
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
