import { Path } from '@Components/StudyHeader/styles';
import { NavigateNext } from '@mui/icons-material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { Breadcrumbs } from '@mui/material';
import { useProtocolDetails } from '@Utils/queries/protocols';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  BackToStudyLink,
  Description,
  HeaderContainer,
  PathContainer,
} from './styles';

type ProtocolLocationState = {
  returnTo?: unknown;
};

const Header = () => {
  const { id: protocolId } = useParams();
  const location = useLocation();
  const { data: protocol, isLoading: protocolLoading } =
    useProtocolDetails(protocolId);
  const description = 'See detailed information of the Protocol.';
  const { returnTo } = (location.state as ProtocolLocationState | null) ?? {};
  const validReturnTo =
    typeof returnTo === 'string' &&
    /^\/studies\/[^/]+\/settings$/.test(returnTo)
      ? returnTo
      : null;

  if (protocolLoading) return null;
  return (
    <HeaderContainer>
      {validReturnTo && (
        <BackToStudyLink to={validReturnTo}>
          <KeyboardArrowLeftRoundedIcon />
          Back to Study
        </BackToStudyLink>
      )}
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
