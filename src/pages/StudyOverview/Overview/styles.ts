import { styled } from '@Utils/theme';

const StyledContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
  gap: '56px',
});

export default StyledContainer;
