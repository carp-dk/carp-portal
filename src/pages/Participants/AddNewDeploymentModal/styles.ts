import {
  Divider,
  Select,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@Utils/theme';
import { ModalBox as BaseModalBox } from '@Components/Modal/styles';

export {
  CancelButton,
  DoneButton,
  ModalActions,
  TextFieldLabel,
} from '@Components/Modal/styles';

export const ModalBox = styled(BaseModalBox)({
  padding: 24,
  maxWidth: 800,
  display: 'flex',
  flexDirection: 'column',
});

export const ModalTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 4,
}));

export const ModalDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: 8,
}));

export const StyledList = styled('ul')(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: 0,
  marginBottom: 8,
  listStyleType: 'disc',
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
  height: 32,
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
