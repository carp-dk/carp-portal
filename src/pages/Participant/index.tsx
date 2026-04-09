import StudyPageLayout from '@Components/Layout/StudyPageLayout';
import StudyHeader from '@Components/StudyHeader';
import { PageType, useGetUri } from '@Utils/utility';
import BasicInfo from './BasicInfo';
import DataVisualizationForParticipant from './DataVisualizationForParticipant';
import Deployment from './Deployment';
import InformedConsent from './InformedConsent';
import ParticipantDataCard from './ParticipantDataCard';

const Participant = () => {
  const sectionName = [
    { name: 'Deployments', uri: useGetUri(PageType.DEPLOYMENTS) },
    { name: 'Deployment', uri: useGetUri(PageType.DEPLOYMENT) },
    { name: 'Participant', uri: useGetUri(PageType.PARTICIPANT) },
  ];
  const description = 'See detailed data of the Participant.';
  return (
    <StudyPageLayout>
      <StudyHeader path={sectionName} description={description} />
      <BasicInfo />
      <Deployment />
      <InformedConsent />
      <ParticipantDataCard />
      <DataVisualizationForParticipant />
    </StudyPageLayout>
  );
};

export default Participant;
