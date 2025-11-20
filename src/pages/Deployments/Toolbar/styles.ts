import { TextField } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div')(({ theme }) => ({
  'display': 'flex',
  'flexDirection': 'row',
  'justifyContent': 'space-between',
  'marginBottom': 16,
  '& > label span': {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: `${theme.typography.h5.fontWeight}!important`,
  },
}));

export const StyledTextField = styled(TextField)({
  minWidth: 500,
});
