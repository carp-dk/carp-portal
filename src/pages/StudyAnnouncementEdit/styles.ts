import { Button, Card } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledButton = styled(Button)({
  borderRadius: 16,
  padding: '8px 16px',
  marginTop: 24,
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
});

export const StyledCard = styled(Card)({
  display: 'block',
  padding: 28,
  borderRadius: 16,
});

export const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 24,
});
