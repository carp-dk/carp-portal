import PrivatePageLayout from '@Components/Layout/PrivatePageLayout';
import ProtocolsSection from './ProtocolsSection';
import StudiesSection from './StudiesSection';
import StyledDivider from './StyledDivider';
import WelcomeHeader from './WelcomeHeader';

const Studies = () => {
  return (
    <PrivatePageLayout>
      <WelcomeHeader />
      <StudiesSection />
      <StyledDivider />
      <ProtocolsSection />
    </PrivatePageLayout>
  );
};

export default Studies;
