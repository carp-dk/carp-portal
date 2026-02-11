import { Path } from '@Components/StudyHeader/styles';
import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs } from '@mui/material';
import { useProtocolDetails } from '@Utils/queries/protocols';
import { Link, useParams } from 'react-router-dom';
import { Description, HeaderContainer, PathContainer } from './styles';

const Header = () => {
  const { id: protocolId } = useParams();
  const { data: protocol, isLoading: protocolLoading } =
    useProtocolDetails(protocolId);
  const description = 'See detailed information of the Protocol.';

  if (protocolLoading) return null;
  return (
    <HeaderContainer>
      <Breadcrumbs separator={<NavigateNext />}>
        <Link
          to={'/protocols'}
          replace={false}
          key={'protocols'}
          style={{ textDecoration: 'none' }}
        >
          <Path variant="h2" section>
            Protocols
          </Path>
        </Link>
        <Link
          to={`/protocols/${protocolId}`}
          replace={false}
          key={protocolId}
          style={{ textDecoration: 'none' }}
        >
          <Path variant="h2" section>
            {protocol.name}
          </Path>
        </Link>
      </Breadcrumbs>
      <PathContainer />
      <Description variant="h5">{description}</Description>
    </HeaderContainer>
  );
};

export default Header;
