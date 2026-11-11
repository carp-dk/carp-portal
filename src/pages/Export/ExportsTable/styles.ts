import { Button, ButtonGroup, Typography } from '@mui/material';
import { styled } from '@Utils/theme';

export const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  '& label': {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  '& table': {
    borderSpacing: '0 4px',
  },
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.common.white,
    borderRadius: 16,
  },
  '& > .MuiPaper-root': {
    padding: '20px 40px 0 40px',
    [theme.breakpoints.down('sm')]: {
      padding: '16px 16px 0 16px',
    },
  },
  '& .MuiTableContainer-root table': {
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
  },
  '& td': {
    border: 'none',
    backgroundColor: theme.palette.common.white,
  },
  '& MuiTableRow-root:hover td': {
    backgroundColor: theme.palette.common.white,
  },
  '& tr > td:first-of-type': {
    color: theme.palette.primary.main,
  },
  '& thead tr': {
    boxShadow: 'none',
  },
  '& th': {
    backgroundColor: theme.palette.common.white,
    verticalAlign: 'middle',
  },
  '& tfoot': {
    outline: 'none',
  },
  '& .MuiTableCell-head': {
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
  },
  '& .MuiTableCell-root': {
    padding: 0,
  },
  '& tr.MuiTableRow-root': {
    height: 40,
  },
  '& .MuiBox-root': {
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
  },
  '& .MuiPaper-root > div.MuiBox-root:last-of-type > div > div': {
    width: '100%',
    paddingLeft: 8,
    flexDirection: 'row-reverse',
  },
  '& table th:first-of-type': {
    paddingLeft: 16,
  },
  '& table td:first-of-type': {
    paddingLeft: 16,
  },
  '& th:last-of-type div': {
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& th:nth-of-type(4) div': {
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& td:last-of-type': {
    textAlign: 'center',
  },
  '& td:nth-of-type(4)': {
    textAlign: 'center',
  },
}));

export const CreateSummaryButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  alignSelf: 'flex-end',
  textTransform: 'none',
  borderRadius: 16,
  height: 36,
  borderColor: theme.palette.grey[700],
}));

export const CreateSummaryButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 16,
  height: 36,
  borderColor: theme.palette.grey[700],
}));

export const DeletingWarning = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  alignSelf: 'center',
}));
