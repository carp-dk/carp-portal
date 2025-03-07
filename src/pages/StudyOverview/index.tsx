import StudyPageLayout from "@Components/Layout/StudyPageLayout";
import StudyHeader from "@Components/StudyHeader";
import { getUri, PageType } from "@Utils/utility";
import Overview from "./Overview";

const StudyOverview = () => {
  return (
    <StudyPageLayout>
      <StudyHeader
        path={[{ name: "Study Overview", uri: getUri(PageType.OVERVIEW) }]}
        description="See an overview of the Study."
      />
      <Overview />
    </StudyPageLayout>
  );
};

export default StudyOverview;
