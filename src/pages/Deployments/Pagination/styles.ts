import { Button } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 20,
});

export const PaginationButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active, theme }) => ({
  'color': active ?
    theme.palette.primary.main :
    theme.palette.grey[500],
  'borderRadius': 32,
  'minWidth': 32,
  'width': 32,
  'height': 32,
  'padding': 0,
  '& span': {
    margin: 0,
  },
}));
