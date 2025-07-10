import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@Utils/theme';

export const AccountIcon = styled(AccountCircleRoundedIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 40,
}));

export const StyledIconButton = styled(IconButton)({
  padding: 0,
});

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  'height': 48,
  'width': 96,
  '&:hover': {
    backgroundColor: '#ededed',
  },
  '&:first-of-type': {
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  '&:last-of-type': {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },
  '& a': {
    'textTransform': 'capitalize',
    'fontWeight': 300,
    'color': theme.palette.text.primary,
    'textDecoration': 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

export const StyledMenu = styled(Menu)({
  '& .MuiList-root': {
    paddingTop: 0,
    paddingBottom: 0,
  },
});
