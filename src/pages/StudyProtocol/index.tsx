import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import LoadingLandingPage from "@Components/Layout/LoadingLandingPage";
import StudyPageLayout from "@Components/Layout/StudyPageLayout";
import SiteUnavailable from "@Components/SiteUnavailable";
import StudyHeader from "@Components/StudyHeader";
import { useStudyDetails } from "@Utils/queries/studies";
import { useParams } from "react-router-dom";
import ProtocolCards from "./ProtocolCards";
import ProtocolInfo from "./ProtocolInfo";

const StudyProtocol = () => {
  const { id: studyId } = useParams();
  const {
    data: study,
    isLoading: studyLoading,
    error: studyError,
  } = useStudyDetails(studyId);
  const sectionName = "Study Protocol";
  const description = "See detailed information of Study Protocol.";
  const siteUnavailableDescription = [
    "In order to overview Study Protocol Page, it is necessary to set a protocol for your study first.",
    "To begin, please navigate to the study settings page.",
  ];
  const siteUnavailableLinkText = "Study Settings Page";
  const siteUnavailableLinkUrl = `/studies/${studyId}/settings`;

  if (studyLoading) {
    return <LoadingLandingPage />;
  }

  if (studyError) {
    return (
      <StudyPageLayout>
        <StudyHeader path={[sectionName]} description={description} />
        <CarpErrorCardComponent
          message="An error occurred while loading study protocol"
          error={studyError}
        />
      </StudyPageLayout>
    );
  }

  return (
    <StudyPageLayout>
      {study.protocolSnapshot == null ? (
        <>
          <StudyHeader path={[sectionName]} description={description} />
          <SiteUnavailable
            siteUnavailableDescription={siteUnavailableDescription}
            siteUnavailableLinkText={siteUnavailableLinkText}
            siteUnavailableLinkUrl={siteUnavailableLinkUrl}
          />
        </>
      ) : (
        <>
          <StudyHeader
            path={[sectionName, study.protocolSnapshot.name]}
            description={description}
          />
          <ProtocolInfo
            protocolId={study.protocolSnapshot.id.stringRepresentation}
          />
          <ProtocolCards
            protocolId={study.protocolSnapshot.id.stringRepresentation}
          />
        </>
      )}
    </StudyPageLayout>
  );
};

export default StudyProtocol;
