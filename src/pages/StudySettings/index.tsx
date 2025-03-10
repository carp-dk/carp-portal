import LoadingLandingPage from "@Components/Layout/LoadingLandingPage";
import StudyPageLayout from "@Components/Layout/StudyPageLayout";
import StudyHeader from "@Components/StudyHeader";
import { useStudyDetails } from "@Utils/queries/studies";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getUri, PageType } from "@Utils/utility";
import AddResearcherModal from "./AddResearcherModal";
import Invitations from "./Invitations";
import StudyData from "./StudyData";
import StudyResearchers from "./StudyResearchers";
import StudyStatusSection from "./StudyStatusSection";
import { StyledContainer } from "./styles";

const Studies: React.FC = () => {
  const sectionName = {
    name: "Study Settings",
    uri: getUri(PageType.SETTINGS),
  };
  const description =
    "Give a name, description, set a protocol and invitation.";
  const { id: studyId } = useParams();
  const { isLoading: studyLoading } = useStudyDetails(studyId);
  const [openAddResearcherModal, setOpenAddResearcherModal] = useState(false);

  if (studyLoading) {
    return <LoadingLandingPage />;
  }

  return (
    <StudyPageLayout>
      <StudyHeader path={[sectionName]} description={description} />
      <StudyStatusSection />
      <StyledContainer>
        <StudyData />
        <Invitations />
        <StudyResearchers
          setOpenAddResearcherModal={() => setOpenAddResearcherModal(true)}
        />
        <AddResearcherModal
          open={openAddResearcherModal}
          onClose={() => setOpenAddResearcherModal(false)}
        />
      </StyledContainer>
    </StudyPageLayout>
  );
};

export default Studies;
