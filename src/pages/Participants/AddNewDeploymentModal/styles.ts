import {
  Box,
  Button,
  Divider,
  Select,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@Utils/theme';

export const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  backgroundColor: theme.palette.common.white,
  borderRadius: 16,
  padding: 24,
  maxWidth: 800,
  display: 'flex',
  flexDirection: 'column',
}));

export const ModalTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 4,
}));

export const ModalDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: 8,
}));

export const StyledList = styled('ul')(({ theme }) => ({
  'color': theme.palette.text.secondary,
  'marginTop': 0,
  'marginBottom': 8,
  'listStyleType': 'disc',
  '& li': {
    display: 'list-item',
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
    lineHeight: theme.typography.h5.lineHeight,
  },
}));

export const ModalContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

export const StyledTableContainer = styled(TableContainer)({
  padding: '12px 10px 24px',
  height: '100%',
});

export const ModalContent = styled('div')({
  flexGrow: 2,
});

export const TextFieldLabel = styled('label')(({ theme }) => ({
  marginTop: 12,
  color: theme.palette.secondary.dark,
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h4.fontWeight,
  lineHeight: theme.typography.h4.lineHeight,
}));

export const ModalActions = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  marginTop: 24,
  width: '100%',
  justifyContent: 'flex-end',
});

export const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: 'none',
  padding: '8px 24px',
  borderRadius: 16,
}));

export const DoneButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: '8px 24px',
  borderRadius: 16,
}));

export const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  borderBottomColor: theme.palette.grey[500],
  backgroundColor: theme.palette.common.white,
  borderBottomWidth: 1,
  padding: '0px 4px 8.5px 4px',
}));

export const PrimaryCellText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const SecondaryCellText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const HeaderText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledTableRow = styled(TableRow)({
  '& td': {
    border: 'none',
    padding: '8px 0px 0px 0px',
  },
});

export const StyledSelect = styled(Select)({
  'height': 32,
  '& #role-select': {
    padding: '8.5px 16px 4.5px 16px',
  },
});

export const StyledDivider = styled(Divider)({
  marginTop: 8,
  marginBottom: 8,
  borderColor: '#76777A',
});

export const Hint = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
