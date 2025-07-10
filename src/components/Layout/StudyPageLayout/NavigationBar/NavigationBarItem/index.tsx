import { ListItem, ListItemText, Tooltip } from '@mui/material';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { StyledIcon, StyledListItemButton, StyledNavLink } from './styles';

type NavigationBarItemProps = {
  text: string;
  icon: ReactNode;
  path: string;
  showTooltip: boolean;
  exact?: boolean;
};

const NavigationBarItem = ({
  text,
  icon,
  path,
  showTooltip,
  exact,
}: NavigationBarItemProps) => {
  const location = useLocation();
  const children = (
    <StyledNavLink to={path || ''}>
      <ListItem disablePadding>
        <StyledListItemButton
          active={
            exact
              ? location.pathname === path
              : location.pathname.startsWith(path)
          }
        >
          <StyledIcon>{icon}</StyledIcon>
          <ListItemText primary={text} />
        </StyledListItemButton>
      </ListItem>
    </StyledNavLink>
  );

  return showTooltip
    ? (
        <Tooltip title={text} placement="right">
          {children}
        </Tooltip>
      )
    : (
        children
      );
};

export default NavigationBarItem;
