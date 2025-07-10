import { Subtitle, Title } from './styles';

const WelcomeHeader = () => {
  const pageTitle = 'Welcome to CARP';
  const subTitle
    = 'See an overview of ongoing studies and their status. Select protocols for further information.';
  return (
    <>
      <Title variant="h1">{pageTitle}</Title>
      <Subtitle variant="h5">{subTitle}</Subtitle>
    </>
  );
};

export default WelcomeHeader;
