import { useProtocolDetails } from '@Utils/queries/protocols';
import { useParams } from 'react-router-dom';
import {
  Description,
  HeaderContainer,
  PathContainer,
  PathItem,
} from './styles';

const Header = () => {
  const { id: protocolId } = useParams();
  const { data: protocol, isLoading: protocolLoading }
    = useProtocolDetails(protocolId);
  const description = 'See detailed information of the Protocol.';

  if (protocolLoading) return null;
  return (
    <HeaderContainer>
      <PathContainer>
        <PathItem variant="h2">Protocols</PathItem>
        <PathItem variant="h2">&gt;</PathItem>
        <PathItem variant="h2" section>
          {protocol.name}
        </PathItem>
      </PathContainer>
      <Description variant="h5">{description}</Description>
    </HeaderContainer>
  );
};

export default Header;
