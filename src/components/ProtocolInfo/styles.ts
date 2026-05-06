import { Button, Divider, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

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
  shouldForwardProp: (prop) => prop !== 'isHorizontal',
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
