import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import PrivatePageLayout from '@Components/Layout/PrivatePageLayout';
import ProtocolCards from '@Components/ProtocolCards';
import {
  StyledCard,
  StyledContainer,
  StyledNameCard,
} from '@Components/ProtocolCards/styles';
import { useGetByVersion } from '@Utils/queries/protocols';
import { getRandomNumber } from '@Utils/utility';
import { Skeleton } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import ProtocolInfo from './ProtocolInfo';

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

const Protocol = () => {
  const { id: protocolId } = useParams();
  const [searchParams] = useSearchParams();
  const version = searchParams.get('version');
  const {
    data: protocol,
    isLoading: protocolLoading,
    error: protocolError,
  } = useGetByVersion(protocolId, version);

  return (
    <PrivatePageLayout>
      <Header />
      <ProtocolInfo />
      {!version || protocolLoading ? (
        <StyledContainer>
          <ProtocolNameCardSkeleton />
          <ProtocolCardSkeleton />
          <ProtocolCardSkeleton />
          <ProtocolCardSkeleton />
        </StyledContainer>
      ) : protocolError ? (
        <CarpErrorCardComponent
          message="An error occurred while loading protocol"
          error={protocolError}
        />
      ) : protocol ? (
        <ProtocolCards protocol={protocol} />
      ) : null}
    </PrivatePageLayout>
  );
};

export default Protocol;
