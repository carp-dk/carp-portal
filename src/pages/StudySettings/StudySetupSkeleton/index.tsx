import { FormLabel, Skeleton } from '@mui/material';
import { Heading, StyledCard, Subheading } from '../styles';

const StudySetupSkeleton = () => {
  return (
    <StyledCard elevation={2}>
      <Heading variant="h2">
        <Skeleton animation="wave" variant="text" height={36} width={120} />
      </Heading>
      <Subheading variant="h6">
        <Skeleton animation="wave" variant="text" height={28} width="80%" />
      </Subheading>
      <FormLabel>
        <Skeleton animation="wave" variant="text" height={28} width={60} />
      </FormLabel>
      <Skeleton variant="rounded" animation="wave" width="100%" height={56} />
      <FormLabel>
        <Skeleton animation="wave" variant="text" height={28} width={80} />
      </FormLabel>
      <Skeleton variant="rounded" animation="wave" width="100%" height={171} />
    </StyledCard>
  );
};
export default StudySetupSkeleton;
