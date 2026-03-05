import PrivatePageLayout from '@Components/Layout/PrivatePageLayout';
import Header from './Header';
import ProtocolCards from './ProtocolCards';
import ProtocolInfo from './ProtocolInfo';

const Protocol = () => {
  return (
    <PrivatePageLayout>
      <Header />
      <ProtocolInfo />
      <ProtocolCards />
    </PrivatePageLayout>
  );
};

export default Protocol;
