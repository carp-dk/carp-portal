import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import StyledButton from './styles';

interface Props {
  columnName: 'name' | 'createdOn';
  toggleSortOrder: (field: 'name' | 'createdOn') => void;
  sortOrder: {
    field: 'name' | 'createdOn';
    ascending: boolean;
  };
}

const SortingButton = ({ columnName, toggleSortOrder, sortOrder }: Props) => {
  return (
    <StyledButton onClick={() => toggleSortOrder(columnName)}>
      <KeyboardArrowUpRoundedIcon
        color="secondary"
        fontSize="small"
        sx={{
          opacity:
            sortOrder.field === columnName && sortOrder.ascending
              ? '100%'
              : '20%',
        }}
      />
      <KeyboardArrowDownRoundedIcon
        color="secondary"
        fontSize="small"
        sx={{
          opacity:
            sortOrder.field === columnName && !sortOrder.ascending
              ? '100%'
              : '20%',
        }}
      />
    </StyledButton>
  );
};

export default SortingButton;
