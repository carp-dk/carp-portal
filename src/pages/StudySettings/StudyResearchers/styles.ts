import { Button, Card, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledCard = styled(Card, {
  shouldForwardProp: prop => prop !== 'isDisabled',
})<{ isDisabled?: boolean }>(({ isDisabled }) => ({
  display: 'block',
  borderRadius: 16,
  opacity: isDisabled ? '0.5' : 1,
  gridColumn: 'span 2',
  padding: 28,
}));

export const Top = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const ResearchersContainer = styled('div')({
  marginTop: 20,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: 20,
});

export const AddResearcherButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[700]}`,
  borderRadius: 18,
  textTransform: 'none',
  padding: '12px 22px',
  color: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 8,
}));
