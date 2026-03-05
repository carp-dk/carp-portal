import { styled } from '@Utils/theme';

const StyledCommitHash = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 6,
  left: 60,
  backgroundColor: theme.palette.drawer.active,
  padding: '4px 8px',
  borderRadius: 4,
  color: theme.palette.primary.dark,
}));

export default StyledCommitHash;
