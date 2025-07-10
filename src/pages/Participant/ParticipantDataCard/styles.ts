import { Button, Card, Divider, FormControl, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 32,
  padding: '16px 24px',
  borderRadius: 8,
});

export const Top = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 24,
});

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const Left = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const Right = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: 32,
});

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  borderWidth: 1,
  width: 1,
  marginRight: 8,
  marginLeft: 4,
  height: 20,
}));

export const EditButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  textTransform: 'none',
  gap: 4,
}));

export const StyledFormControl = styled(FormControl)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(max(400px, 20vw), 1fr))',
  rowGap: 16,
  columnGap: 130,
  margin: '0px 14px 24px',
});

export const InputContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '2fr 5fr',
  alignItems: 'center',
  height: 56,
});
