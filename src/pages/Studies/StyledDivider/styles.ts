import { styled } from '@Utils/theme';

const StyledContainer = styled('div')(({ theme }) => ({
  margin: '56px 0',
  '& hr': {
    borderColor: theme.palette.text.disabled,
  },
}));

export default StyledContainer;
