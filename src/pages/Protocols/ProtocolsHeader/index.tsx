import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { BackButton, Container, Subtitle, Title } from './styles';

const ProtocolsHeader = () => {
  const title = 'Protocols';
  const subtitle =
    'See an overview of protocols. Select one protocol for further information.';
  return (
    <Container>
      <Title variant="h2">{title}</Title>
      <Subtitle variant="h5">{subtitle}</Subtitle>
      <BackButton to="/">
        <KeyboardArrowLeftRoundedIcon />
      </BackButton>
    </Container>
  );
};

export default ProtocolsHeader;
