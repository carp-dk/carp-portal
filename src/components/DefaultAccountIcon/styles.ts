import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div')({
  position: 'relative',
});

export const Initials = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '44%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  color: theme.palette.common.white,
}));
