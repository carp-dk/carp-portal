import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { Stack } from '@mui/material';
import { BackButton, Container, Subtitle, Title } from './styles';

const ProtocolsHeader = () => {
  const title = 'Protocols';
  const subtitle =
    'See an overview of protocols. Select one protocol for further information.';
  return (
    <Container>
      <Stack direction="row" sx={{ marginLeft: -1 }}>
        <BackButton to="/">
          <KeyboardArrowLeftRoundedIcon />
          <Title variant="h2">{title}</Title>
        </BackButton>
      </Stack>
      <Subtitle variant="h5">{subtitle}</Subtitle>
    </Container>
  );
};

export default ProtocolsHeader;
