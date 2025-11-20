import { Button, Card, Divider, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled(Card)(({ theme }) => ({
  'borderRadius': 8,
  'height': 88,
  'border': `1px ${theme.palette.grey[500]} solid`,
  'width': '100%',
  'marginBottom': 56,
  'display': 'flex',
  'flexDirection': 'row',
  'justifyContent': 'space-between',
  'alignItems': 'center',
  'padding': '0 32px',
  'boxShadow': 'none',
  'gap': 24,
  '@media (max-width: 1250px)': {
    height: 'auto',
    padding: 24,
    flexDirection: 'column',
    alignItems: 'start',
  },
}));

export const Left = styled('div')({
  'display': 'flex',
  'gap': 26,
  'flexShrink': 2,
  '@media (max-width: 1250px)': {
    justifyContent: 'flex-start',
    width: '100%',
  },
});

export const VersionContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 4,
});

export const ProtocolVersion = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const HorizontalContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  alignItems: 'center',
  flexShrink: 0,
});

export const Right = styled('div')({
  'display': 'flex',
  'flexDirection': 'row',
  'justifyContent': 'end',
  'flexShrink': 0,
  'gap': 18,
  '@media (max-width: 1250px)': {
    justifyContent: 'space-between',
    width: '100%',
  },
});

export const InnerLeftContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 12,
  flexShrink: 0,
});

export const IDsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 12,
  flexShrink: 0,
});

export const StyledDivider = styled(Divider, {
  shouldForwardProp: prop => prop !== 'isHorizontal',
})<{ isHorizontal?: boolean }>(({ isHorizontal, theme }) => ({
  color: theme.palette.grey[300],
  borderWidth: 1,
  orientation: isHorizontal ? 'horizontal' : 'vertical',
  width: isHorizontal ? '94%' : 1,
  margin: isHorizontal ? '0 auto' : '0',
}));

export const IDContainer = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 5,
  flexShrink: 0,
}));

export const CreationInfoContainer = styled('div')(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'flex-end',
  'gap': 5,
  'color': theme.palette.text.secondary,
  'height': 20,
  'padding': 2,
  '@media (max-width: 1250px)': {
    justifyContent: 'flex-start',
  },
}));

export const AddVersionButton = styled(Button)({
  borderRadius: 100,
  textTransform: 'capitalize',
});

export const DownloadButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderColor: theme.palette.grey[500],
  borderRadius: 16,
  backgroundColor: 'transparent',
  textTransform: 'none',
  padding: '10px 24px',
}));

export const DownloadButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginBottom: 16,
});
