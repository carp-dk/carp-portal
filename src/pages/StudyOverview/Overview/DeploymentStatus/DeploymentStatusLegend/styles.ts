import { styled } from '@Utils/theme';

const ParticipantsRow = styled('button')(({ theme }) => ({
  paddingBottom: 10,
  marginBottom: 0,
  display: 'grid',
  gridTemplateColumns: '80px 1fr',
  gap: 8,
  alignItems: 'center',
  paddingLeft: 0,
  paddingRight: 0,
  border: 0,
  background: 'transparent',
  font: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

export default ParticipantsRow;
