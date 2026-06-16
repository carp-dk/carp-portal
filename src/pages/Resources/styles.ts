import { Box, Card, Fab, TableCell, TableRow, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  borderBottomColor: theme.palette.grey[500],
  backgroundColor: theme.palette.common.white,
  borderBottomWidth: 1,
  zIndex: 0,
  '&:nth-of-type(1)': {
    paddingLeft: 56,
    width: '40%',
  },
  '&:nth-of-type(2)': {
    width: 180,
  },
  '&:nth-of-type(3)': {
    width: '36%',
  },
  '&:nth-of-type(4)': {
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
  '& + &': {
    marginTop: 24,
  },
}));

export const ResourceSectionHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 32px 0 32px',
});

export const ResourceSectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
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
    '&:nth-of-type(4)': {
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
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.secondary.light,
  borderRadius: 16,
  width: 72,
  height: 72,
  '& > svg': {
    color: theme.palette.primary.main,
    fontSize: 48,
    stroke: theme.palette.secondary.light,
    strokeWidth: '0.50px',
  },
  '&:hover': {
    backgroundColor: '#C7D7E4',
    '& > svg': {
      stroke: '#C7D7E4',
    },
  },
  zIndex: 0,
}));

export const AddResourceButtonGroup = styled(Box)({
  position: 'absolute',
  right: 36,
  bottom: 36,
  display: 'flex',
  gap: 12,
});

export const CountryFlagIcon = styled('div')({
  fontSize: 24,
});

export const LanguageWrapper = styled('div')({
  display: 'flex',
  columnGap: 8,
});

export const CountryLanguage = styled('div')({
  lineHeight: '1.75em',
});
