import { Card, Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { Link } from 'react-router-dom';

export {
  DownloadButton,
  DownloadButtonContainer,
  IDContainer,
  IDsContainer,
  InnerLeftContainer,
  ProtocolVersion,
  StyledDivider,
} from '@Components/ProtocolInfo/styles';

export const StyledContainer = styled(Card)(({ theme }) => ({
  borderRadius: 8,
  height: 88,
  border: `1px ${theme.palette.grey[500]} solid`,
  width: '100%',
  marginBottom: 56,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 32px',
  boxShadow: 'none',
  gap: 24,
  '@media (max-width: 1725px)': {
    height: 'auto',
    padding: 24,
    flexDirection: 'column',
    alignItems: 'start',
  },
}));

export const Left = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 8,
  height: '100%',
  flexShrink: 2,
  '@media (max-width: 1725px)': {
    justifyContent: 'space-between',
    width: '100%',
  },
});

export const Subtitle = styled(Typography)({
  display: 'flex',
  gap: 4,
  alignItems: 'center',
});

export const Right = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  flexShrink: 0,
  gap: 18,
  '@media (max-width: 1725px)': {
    justifyContent: 'space-between',
    width: '100%',
  },
});

export const CreationInfoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 5,
  color: theme.palette.text.secondary,
  height: 20,
  padding: 2,
  '@media (max-width: 1725px)': {
    justifyContent: 'flex-start',
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: 'inline-flex',
  '& svg': {
    paddingBottom: 2,
  },
}));
