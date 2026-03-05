import { styled } from '@Utils/theme';

export const Pill = styled('span')(({ theme }) => ({
  display: 'inline-block',
  padding: '0.25rem 0.75rem',
  borderRadius: '1rem',
  textTransform: 'uppercase',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
}));

export const ErrorPill = styled(Pill)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
}));

export const InProgressPill = styled(Pill)(({ theme }) => ({
  backgroundColor: theme.palette.status.draft,
}));

export const SuccessPill = styled(Pill)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
}));
