import { Card, FormControl, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  padding: '24px 34px',
  margin: '48px 0px',
});

export const StyledHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StyledFormControl = styled(FormControl)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  rowGap: 16,
  columnGap: 130,
  margin: '0px 14px 24px',
});

export const InputContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
});
