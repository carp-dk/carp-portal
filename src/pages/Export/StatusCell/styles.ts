import { styled } from '@Utils/theme';
import { getSummaryStatusColor } from '@Utils/utility';

export const StyledContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
});

export const StyledStatusDot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'statusColor',
})<{ statusColor?: string }>(({ statusColor }) => ({
  width: 8,
  height: 8,
  paddingBottom: 8,
  borderRadius: '50%',
  backgroundColor: getSummaryStatusColor(statusColor),
}));
