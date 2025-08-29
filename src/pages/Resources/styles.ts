import { Card, Fab, TableCell, TableRow, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  'borderBottomColor': theme.palette.grey[500],
  'backgroundColor': theme.palette.common.white,
  'borderBottomWidth': 1,
  'zIndex': 0,
  '&:nth-of-type(1)': {
    paddingLeft: 56,
    width: '52%',
  },
  '&:nth-of-type(2)': {
    width: '48%',
  },
  '&:nth-of-type(3)': {
    textAlign: 'center',
    paddingRight: 56,
    width: 220,
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: 16,
  position: 'relative',
  padding: 16,
}));

export const PrimaryCellText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const SecondaryCellText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const TertiaryCellText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
}));

export const HeaderText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledTableRow = styled(TableRow)({
  '& > *': {
    '&:nth-of-type(1)': {
      paddingLeft: 56,
    },
    '&:nth-of-type(3)': {
      textAlign: 'center',
      paddingRight: 56,
    },
  },
  '&:hover': {
    backgroundColor: '#F5F5F5',
    transition: 'background-color 0.2s ease-in-out',
    cursor: 'pointer',
  },
});

export const AddResourceButton = styled(Fab)(({ theme }) => ({
  'position': 'absolute',
  'boxShadow': theme.shadows[2],
  'bottom': 36,
  'right': 36,
  'backgroundColor': theme.palette.secondary.light,
  'borderRadius': 16,
  'width': 72,
  'height': 72,
  '& > svg': {
    color: theme.palette.primary.main,
    fontSize: 48,
    stroke: theme.palette.secondary.light,
    strokeWidth: '0.50px',
  },
  '&:hover': {
    'backgroundColor': '#C7D7E4',
    '& > svg': {
      stroke: '#C7D7E4',
    },
  },
  'zIndex': 0,
}));
