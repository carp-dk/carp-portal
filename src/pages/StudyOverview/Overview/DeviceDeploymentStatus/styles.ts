import { Card, TableCell, TableRow, Typography } from '@mui/material';
import { styled } from '@Utils/theme';
import { getDeviceStatusColor } from '@Utils/utility';

export const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  // gridColumn: 'span 2',
  padding: 24,
  height: 288,
  borderRadius: 16,
});

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: 8,
}));

export const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  borderBottomColor: theme.palette.grey[500],
  backgroundColor: theme.palette.common.white,
  borderBottomWidth: 1,
  zIndex: 0,
  width: '30%',
  paddingLeft: 0,
  paddingBottom: 0,
}));

export const SecondaryCellText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const HeaderText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledTableRow = styled(TableRow)({
  paddingLeft: 0,
  '&:hover': {
    backgroundColor: '#F5F5F5',
    transition: 'background-color 0.2s ease-in-out',
    cursor: 'pointer',
  },
});

export const StyledTableCell = styled(TableCell)({
  paddingLeft: 0,
  paddingBottom: '8px',
  paddingTop: '8px',
  border: 'none',
});

export const StatusContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

export const StyledStatusDot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status?: string }>(({ status }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: getDeviceStatusColor(status),
}));
