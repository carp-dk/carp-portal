import StudyPageLayout from "@Components/Layout/StudyPageLayout";
import StudyHeader from "@Components/StudyHeader";
import { getUri, PageType } from "@Utils/utility";
import BasicInfo from "./BasicInfo";
import Deployment from "./Deployment";
import InformedConsent from "./InformedConsent";
import ParticipantDataCard from "./ParticipantDataCard";

const Participant = () => {
  const sectionName = [
    { name: "Deployments", uri: getUri(PageType.DEPLOYMENTS) },
    { name: "Deployment", uri: getUri(PageType.DEPLOYMENT) },
    { name: "Participant", uri: getUri(PageType.PARTICIPANT) },
  ];
  const description = "See detailed data of the Participant.";
  return (
    <StudyPageLayout>
      <StudyHeader path={sectionName} description={description} />
      <BasicInfo />
      <Deployment />
      <InformedConsent />
      <ParticipantDataCard />
    </StudyPageLayout>
  );
};

export default Participant;
