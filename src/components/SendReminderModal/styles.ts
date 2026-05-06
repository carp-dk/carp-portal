import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { ModalBox as BaseModalBox } from '@Components/Modal/styles';

export { CancelButton, DoneButton, ModalActions } from '@Components/Modal/styles';

export const ModalBox = styled(BaseModalBox)({
  padding: 24,
  maxWidth: 820,
  display: 'flex',
  flexDirection: 'column',
});

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 8,
}));

export const HorizontalInputContainer = styled('div')({
  height: 40,
  display: 'flex',
  gap: 10,
  alignItems: 'center',
});

export const HorizontalInputContainerWithAutoHeight = styled(
  HorizontalInputContainer,
)({
  height: 'auto',
});

export const VerticalInputContainer = styled('div')({
  display: 'flex',
  gap: 10,
  flexDirection: 'column',
});

export const Content = styled('div')({
  display: 'flex',
  gap: 4,
  flexDirection: 'column',
  height: '100%',
  padding: '0px 0px 0px 12px',
});

export const TypographyVariant = styled(Typography)(() => ({
  marginTop: '10px',
  marginBottom: 'auto',
  width: '56px',
}));
