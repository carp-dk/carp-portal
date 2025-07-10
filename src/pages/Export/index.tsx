import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import StudyPageLayout from '@Components/Layout/StudyPageLayout';
import StudyHeader from '@Components/StudyHeader';
import { useExports } from '@Utils/queries/studies';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUri, PageType } from '@Utils/utility';
import ExportsTable from './ExportsTable';

const Export: React.FC = () => {
  const sectionName = { name: 'Exports', uri: getUri(PageType.EXPORTS) };
  const description
    = 'In order to export study data, click on the New Export button.';
  const { id: studyId } = useParams();
  const queryClient = useQueryClient();
  const {
    data: exports,
    isLoading: exportsLoading,
    error: exportsError,
  } = useExports(studyId);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkAndUpdateQuery = () => {
      if (
        !exportsLoading
        && exports.some(summary => summary.status === 'IN_PROGRESS')
      ) {
        timeoutId = setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['exports', studyId] });
          checkAndUpdateQuery();
        }, 3000);
      }
    };
    checkAndUpdateQuery();
    return () => {
      clearTimeout(timeoutId);
    };
  }, [exports]);

  if (exportsError) {
    return (
      <StudyPageLayout>
        <StudyHeader path={[sectionName]} description={description} />
        <CarpErrorCardComponent
          message="An error occurred while loading study exports"
          error={exportsError}
        />
      </StudyPageLayout>
    );
  }

  return (
    <StudyPageLayout>
      <StudyHeader path={[sectionName]} description={description} />
      <ExportsTable exports={exports} exportsLoading={exportsLoading} />
    </StudyPageLayout>
  );
};

export default Export;
