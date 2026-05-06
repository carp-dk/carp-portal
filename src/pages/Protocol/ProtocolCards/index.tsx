import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import ProtocolCardsView from '@Components/ProtocolCards';
import { StyledCard, StyledContainer, StyledNameCard } from '@Components/ProtocolCards/styles';
import { useGetByVersion } from '@Utils/queries/protocols';
import { getRandomNumber } from '@Utils/utility';
import { Skeleton } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const ProtocolNameCardSkeleton: React.FC = () => {
  return (
    <StyledNameCard elevation={2}>
      <Skeleton height={32} animation="wave" variant="text" width={70} />
      <Skeleton height={28} animation="wave" variant="text" width="83%" />
      <Skeleton height={32} animation="wave" variant="text" width={130} />
      <Skeleton animation="wave" variant="text" width="60%" />
    </StyledNameCard>
  );
};

const ProtocolCardSkeleton: React.FC = () => {
  return (
    <StyledCard elevation={2}>
      <Skeleton
        height={32}
        animation="wave"
        variant="text"
        width={`${getRandomNumber(20, 50)}%`}
      />
      {[1, 2].map(() => {
        return (
          <Skeleton
            key={uuidv4()}
            animation="wave"
            variant="text"
            width={`${getRandomNumber(40, 70)}%`}
          />
        );
      })}
    </StyledCard>
  );
};

const ProtocolCards = () => {
  const { id: protocolId } = useParams();
  const [searchParams] = useSearchParams();
  const version = searchParams.get('version');
  const {
    data: protocol,
    isLoading: protocolLoading,
    error: protocolError,
  } = useGetByVersion(protocolId, version);

  if (protocolLoading)
    return (
      <StyledContainer>
        <ProtocolNameCardSkeleton />
        <ProtocolCardSkeleton />
        <ProtocolCardSkeleton />
        <ProtocolCardSkeleton />
      </StyledContainer>
    );

  if (protocolError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading protocol"
        error={protocolError}
      />
    );
  }

  return <ProtocolCardsView protocol={protocol} />;
};

export default ProtocolCards;
