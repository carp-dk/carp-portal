import { Link } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AccountIcon,
  StyledIconButton,
  StyledMenu,
  StyledMenuItem,
} from './styles';

const BannerAccountButton = () => {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    queryClient.clear();
    auth.signoutSilent({ silentRequestTimeoutInSeconds: 1 });
    navigate('/', { replace: true });
  };

  return (
    <>
      <StyledIconButton
        onClick={handleClick}
        data-testid="account-icon-button"
        size="large"
      >
        <AccountIcon fontSize="large" />
      </StyledIconButton>
      <StyledMenu
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        elevation={2}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/*
          <StyledMenuItem onClick={handleClose}>
            <Link
              component={RouterLink}
              variant="h4"
              to="/account"
              data-testid="account"
            >
              Account
            </Link>
          </StyledMenuItem>
        */}
        <StyledMenuItem onClick={handleLogOut}>
          <Link
            component={RouterLink}
            variant="h4"
            to="/"
            data-testid="sign-out"
          >
            Sign out
          </Link>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};

export default BannerAccountButton;
