import { Select, TextField } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
  '& > label span': {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: `${theme.typography.h5.fontWeight}!important`,
  },
}));

export const StyledTextField = styled(TextField)({
  minWidth: 500,
});

export const StyledSelect = styled(Select)({
  height: 40,
  minWidth: 160,
  borderRadius: 20,
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: 20,
  },
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 4,
    paddingTop: 4,
  },
});
