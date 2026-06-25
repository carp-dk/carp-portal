import { styled } from '@Utils/theme';

const ParticipantsRow = styled('button')(({ theme }) => ({
  padding: '6px 8px',
  margin: '0 -8px 2px',
  display: 'grid',
  gridTemplateColumns: '72px 1fr 24px',
  gap: 8,
  alignItems: 'center',
  width: 'calc(100% + 16px)',
  border: 0,
  background: 'transparent',
  font: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  borderRadius: 8,
  transition: 'background-color 150ms ease, transform 150ms ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(2px)',
  },
  '&:hover span:last-child, &:focus-visible span:last-child': {
    opacity: 1,
    transform: 'translateX(2px)',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StyledArrow = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.45,
  transition: 'opacity 150ms ease, transform 150ms ease',
});

export default ParticipantsRow;
