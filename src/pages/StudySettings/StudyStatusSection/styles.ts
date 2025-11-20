import { Button, Card, Divider, Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { getStudyStatusColor } from '@Utils/utility';

export const Container = styled(Card)(({ theme }) => ({
  'borderRadius': 8,
  'height': 88,
  'border': `1px ${theme.palette.grey[500]} solid`,
  'width': '100%',
  'margin': '12px 0px',
  'display': 'flex',
  'flexDirection': 'row',
  'justifyContent': 'space-between',
  'alignItems': 'center',
  'padding': '0 32px',
  'boxShadow': 'none',
  'gap': 24,
  '@media (max-width: 1250px)': {
    height: 'auto',
    padding: '16px 32px',
    gap: 16,
    flexDirection: 'column',
    alignItems: 'start',
  },
}));

export const Left = styled('div')({
  'display': 'flex',
  'flexDirection': 'row',
  'justifyContent': 'start',
  'alignItems': 'center',
  'gap': 8,
  'height': '100%',
  'flexShrink': 2,
  '@media (max-width: 1250px)': {
    justifyContent: 'space-between',
    width: '100%',
  },
});

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
  alignItems: 'flex-end',
  gap: '4px',
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
  width: isHorizontal ? '100%' : 1,
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

export const DeleteStudyButton = styled(Button)(({ theme }) => ({
  'padding': '8px 16px',
  'height': 36,
  'alignSelf': 'flex-end',
  'color': theme.palette.error.main,
  'border': `1px solid ${theme.palette.grey[700]}`,
  'borderRadius': 16,
  'textTransform': 'none',
  'gap': '8px',
  '@media (max-width: 1250px)': {
    alignSelf: 'flex-start',
  },
}));

export const Status = styled('div', {
  shouldForwardProp: prop => prop !== 'status',
})<{ status?: string }>(({ status }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  color: getStudyStatusColor(status),
}));

export const StatusName = styled(Typography, {
  shouldForwardProp: prop => prop !== 'status',
})<{ status?: string }>(({ status, theme }) => {
  let color;
  if (status === 'Draft') {
    color = theme.palette.status.draft;
  }
  else if (status === 'Ready') {
    color = theme.palette.status.ready;
  }
  else {
    color = theme.palette.status.live;
  }

  return {
    color,
    textTransform: 'uppercase',
    textAlign: 'center',
  };
});

export const StatusDescription = styled(Typography)(({ theme }) => ({
  'color': theme.palette.secondary.main,
  'marginLeft': 12,
  'flexShrink': 5,
  'maxWidth': 500,
  '@media (max-width: 1250px)': {
    maxWidth: '100%',
    flexShrink: 2,
  },
}));

export const GoLiveButton = styled(Button)(({ theme }) => ({
  'backgroundColor': theme.palette.primary.main,
  'color': theme.palette.common.white,
  'marginLeft': 12,
  'borderRadius': '24px',
  'display': 'flex',
  'gap': 6,
  'padding': '10px 18px 10px 12px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    'backgroundColor': theme.palette.grey[200],
    'color': theme.palette.text.disabled,
    '& svg': {
      color: theme.palette.grey[500],
    },
  },
}));

export const StyledStatusDot = styled('div', {
  shouldForwardProp: prop => prop !== 'status',
})<{ status?: string }>(({ status }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: getStudyStatusColor(status),
  marginBottom: 4,
}));
