import { Paper } from '@mui/material';
import { styled } from '@Utils/theme';

export const SectionCard = styled(Paper)({
  padding: 24,
  borderRadius: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const SectionGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 24,
  marginTop: 24,
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
}));
