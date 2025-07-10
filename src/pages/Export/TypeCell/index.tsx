import { Export } from '@carp-dk/client';
import { MRT_Cell } from 'material-react-table';
import StyledTypography from './styles';

type StatusCellProps = {
  cell: MRT_Cell<Export, unknown>;
};

const TypeCell = ({ cell }: StatusCellProps) => {
  const { type } = cell.row.original;
  if (type) {
    const typeText = type.replaceAll('_', ' ').toLowerCase();
    return <StyledTypography variant="h5">{typeText}</StyledTypography>;
  }
  return null;
};

export default TypeCell;
