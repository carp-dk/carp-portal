import BannerEditor from './BannerEditor';
import HealthStatus from './HealthStatus';
import ResearcherEmail from './ResearcherEmail';
import { SectionGrid } from './styles';

const System = () => (
  <SectionGrid>
    <HealthStatus />
    <BannerEditor />
    <ResearcherEmail />
  </SectionGrid>
);

export default System;
