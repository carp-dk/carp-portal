import LoadingLandingPage from '@Components/Layout/LoadingLandingPage';
import { useStudyDetails } from '@Utils/queries/studies';
import { getProtocolVersionTag } from '@Utils/utility';
import { Navigate, useParams } from 'react-router-dom';

const StudyProtocolRedirect = () => {
  const { id: studyId } = useParams();
  const { data: study, isLoading, isError } = useStudyDetails(studyId);

  if (isLoading) return <LoadingLandingPage />;
  if (isError) return <Navigate to="/studies" replace />;

  if (!study?.protocolSnapshot) {
    return <Navigate to={`/studies/${studyId}/settings`} replace />;
  }

  const version = getProtocolVersionTag(study.protocolSnapshot.applicationData);
  const versionQuery = version
    ? `?${new URLSearchParams({ version }).toString()}`
    : '';

  return (
    <Navigate
      to={`/protocols/${study.protocolSnapshot.id.stringRepresentation}${versionQuery}`}
      state={{
        returnTo: `/studies/${studyId}/settings`,
      }}
      replace
    />
  );
};

export default StudyProtocolRedirect;
