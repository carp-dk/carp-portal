import { styled } from '@Utils/theme';

const TooltipContainer = styled('div')({
  backgroundColor: '#ededed',
  display: 'none',
  flexDirection: 'column',
  position: 'absolute',
  padding: 8,
  borderRadius: 4,
  zIndex: 1,
  width: '85%',
  bottom: '155%',
  maxWidth: 240,
});

export const HorizontalContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export default TooltipContainer;
