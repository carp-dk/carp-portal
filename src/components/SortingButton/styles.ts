import { Button } from '@mui/material';
import { styled } from '@Utils/theme';

const StyledButton = styled(Button)({
  'display': 'flex',
  'flexDirection': 'column',
  'justifyContent': 'center',
  'alignItems': 'center',
  'width': 16,
  'minWidth': 16,
  '& svg': {
    margin: 0,
  },
  '& svg:nth-of-type(1)': {
    marginBottom: -6,
  },
  'height': 26,
});

export default StyledButton;
