import usePagination from '@Utils/pagination';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Typography } from '@mui/material';
import { PaginationButton, StyledContainer } from './styles';

type Props = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

const Pagination = ({
  currentPage,
  onPageChange,
  siblingCount = 1,
  pageSize,
  totalCount,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <StyledContainer>
      <PaginationButton
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<ArrowBackIosRoundedIcon />}
        disabled={currentPage === 1}
        onClick={onPrevious}
      />
      {paginationRange.map((pageNumber) => {
        if (pageNumber === '...') {
          return (
            <Typography key={pageNumber} variant="h4">
              &#8230;
            </Typography>
          );
        }
        return (
          <PaginationButton
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            active={pageNumber === currentPage}
            variant="text"
            color="primary"
          >
            {pageNumber}
          </PaginationButton>
        );
      })}
      <PaginationButton
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<ArrowForwardIosRoundedIcon />}
        disabled={currentPage === lastPage}
        onClick={onNext}
      />
    </StyledContainer>
  );
};

export default Pagination;
