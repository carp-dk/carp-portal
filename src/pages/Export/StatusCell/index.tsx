// import { useParams } from "react-router-dom";
import { Export } from '@carp-dk/client';
import { Typography } from '@mui/material';
import { MRT_Cell } from 'material-react-table';
import { StyledContainer, StyledStatusDot } from './styles';

type StatusCellProps = {
  cell: MRT_Cell<Export, unknown>;
};

const StatusCell = ({ cell }: StatusCellProps) => {
  const { status } = cell.row.original;
  let statusText = '';
  switch (status) {
    case 'AVAILABLE':
      statusText = 'Created';
      break;
    case 'IN_PROGRESS':
      statusText = 'In progress';
      break;
    case 'ERROR':
      statusText = 'Error';
      break;
    default:
      statusText = 'Unknown';
  }
  return (
    <StyledContainer>
      <StyledStatusDot statusColor={status} />
      <Typography variant="h6">{statusText}</Typography>
    </StyledContainer>
  );
};

export default StatusCell;
