import { Button, Card, FormControl, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  padding: '24px 34px',
});

export const StyledHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: '8px 24px',
  borderRadius: 16,
}));

export const StyledFormControl = styled(FormControl)({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 16,
  columnGap: 130,
  margin: '0px 14px 24px',
});

export const InputContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
