import { Skeleton, Typography } from '@mui/material';
import { getRandomNumber } from '@Utils/utility';
import { StyledCard, StyledDescription, Top } from './styles';

const LoadingSkeleton = () => {
  return (
    <StyledCard elevation={2}>
      <Top>
        <Typography variant="h2">
          <Skeleton width={getRandomNumber(140, 276)} animation="wave" />
        </Typography>
        <StyledDescription variant="h4">
          <Skeleton width={getRandomNumber(140, 276)} animation="wave" />
        </StyledDescription>
      </Top>
      <div>
        <Skeleton width={`${getRandomNumber(40, 90)}%`} animation="wave" />
        <Skeleton width={`${getRandomNumber(40, 90)}%`} animation="wave" />
        <Skeleton width={`${getRandomNumber(40, 90)}%`} animation="wave" />
        <Skeleton width={`${getRandomNumber(40, 90)}%`} animation="wave" />
      </div>
    </StyledCard>
  );
};

export default LoadingSkeleton;
