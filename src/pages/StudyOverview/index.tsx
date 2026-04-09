import StudyPageLayout from '@Components/Layout/StudyPageLayout';
import StudyHeader from '@Components/StudyHeader';
import { PageType, useGetUri } from '@Utils/utility';
import Overview from './Overview';

const StudyOverview = () => {
  return (
    <StudyPageLayout>
      <StudyHeader
        path={[{ name: 'Study Overview', uri: useGetUri(PageType.OVERVIEW) }]}
        description="See an overview of the Study."
      />
      <Overview />
    </StudyPageLayout>
  );
};

export default StudyOverview;
