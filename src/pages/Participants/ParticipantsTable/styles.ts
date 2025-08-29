import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div')(({ theme }) => ({
  'position': 'relative',
  '& label.MuiInputLabel-outlined': {
    color: theme.palette.primary.main,
    height: 100,
    fontWeight: 500,
  },
  '& label.MuiInputLabel-outlined ~ div': {
    height: 56,
  },
  '& label': {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  '& table': {
    borderSpacing: '0 4px',
  },
  '& .MuiToolbar-root > div:first-of-type': {
    minHeight: '52px!important',
    gridRow: 2,
  },
  '& tr > td:first-of-type': {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  '& tr > td:last-child': {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  '& .MuiPaper-root': {
    backgroundColor: '#fff',
  },
  '& > .MuiPaper-root': {
    padding: '40px 40px 0 40px',
  },
  '& .MuiTableContainer-root': {
    padding: '0 20px',
    boxShadow: 'none',
    maxHeight: '52vh',
  },
  '& .MuiTableContainer-root table': {
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
  },
  '& div.MuiToolbar-root:nth-of-type(3) > div > div ': {
    left: 0,
    right: 'initial',
  },
  '& .MuiFormControl-root': {
    display: 'flex',
    width: '100%',
    maxWidth: 500,
  },
  '& thead tr': {
    boxShadow: 'none',
  },
  '& thead th:hover': {
    '& svg': {
      opacity: '0.5',
    },
  },
  '& thead th > div': {
    width: '100%',
  },
  '& td': {
    border: 'none',
    backgroundColor: '#fff',
  },
  '& th': {
    backgroundColor: '#fff',
    verticalAlign: 'middle',
  },
  '& .MuiCollapse-wrapper, & .MuiCollapse-wrapperInner, & .MuiCollapse-root': {
    width: '100%',
  },
  '& tfoot': {
    outline: 'none',
  },
  '& .MuiToolbar-root': {
    boxShadow: 'none',
  },
  '& .MuiTableCell-head': {
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
  },
  '& .MuiTableCell-root': {
    padding: 8,
  },
  '& .MuiBox-root': {
    backgroundColor: '#fff',
    boxShadow: 'none',
  },
  '& .MuiPaper-root > div.MuiBox-root:last-of-type > div > div': {
    width: '100%',
    flexDirection: 'row-reverse',
    padding: '0 26px',
  },
}));

export const TopToolbarButton = styled(Button)(({ theme }) => ({
  'border': `1px solid ${theme.palette.grey[700]}`,
  'borderRadius': 16,
  'textTransform': 'none',
  'padding': '8px 16px',
  'color': theme.palette.primary.main,
  'display': 'flex',
  'flexDirection': 'row',
  'justifyContent': 'center',
  'gap': 8,
  '&:disabled': {
    color: theme.palette.primary.main,
    opacity: '0.4',
  },
}));

export const CustomTopToolbar = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  justifyContent: 'flex-end',
  minWidth: 350,
  alignSelf: 'center',
});

export const StatusCell = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 4,
});

export const AddUserButton = styled(Fab)(({ theme }) => ({
  'position': 'absolute',
  'boxShadow': theme.shadows[2],
  'bottom': 72,
  'right': 72,
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
}));
