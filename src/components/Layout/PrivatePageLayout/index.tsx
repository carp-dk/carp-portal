import Logo from '@Components/Logo';
import MaintenanceBanner from '@Components/MaintenanceBanner';
import { ReactNode } from 'react';
import BannerAccountButton from '../../Buttons/BannerAccountButton';
import { CustomContainer, PrivatePageBanner } from './styles';

type Props = {
  children: ReactNode;
};

const PrivatePageLayout = ({ children }: Props) => (
  <>
    <MaintenanceBanner />
    <PrivatePageBanner>
      <Logo type="flat-colored" />
      <BannerAccountButton />
    </PrivatePageBanner>
    <CustomContainer maxWidth={false}>{children}</CustomContainer>
  </>
);

export default PrivatePageLayout;
