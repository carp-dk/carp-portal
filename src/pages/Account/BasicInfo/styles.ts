import { Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div')({
  marginTop: 40,
  display: 'flex',
  gap: 24,
});

export const DataContainer = styled('div')({
  padding: '16px 10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  borderBottom: '1px solid #76777A',
});

export const ProfilePicture = styled('div')(({ theme }) => ({
  borderRadius: '50%',
  width: 200,
  height: 200,
  backgroundColor: theme.palette.company.isotype,
  position: 'relative',
}));

export const Initials = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '51%',
  transform: 'translate(-50%, -50%)',
  color: theme.palette.common.white,
  fontSize: 80,
}));

export const NameText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.heading,
  marginBottom: 12,
}));

export const EmailText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: 12,
}));

export const IdText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const IdContainer = styled('div')({
  display: 'flex',
  gap: 10,
  flexDirection: 'row',
  alignItems: 'center',
});
