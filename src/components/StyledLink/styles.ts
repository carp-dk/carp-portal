import { styled } from '@Utils/theme';
import { Link } from 'react-router-dom';

const StyledStyledLink = styled(Link, {
  shouldForwardProp: prop => prop !== 'isBold',
})<{ isBold?: boolean }>(({ isBold, theme }) => ({
  textDecoration: 'none',
  fontSize: 'inherit',
  color: theme.palette.primary.main,
  fontWeight: isBold ? 700 : 'inherit',
}));

export default StyledStyledLink;
