import StudyPageLayout from '@Components/Layout/StudyPageLayout';
import StudyHeader from '@Components/StudyHeader';
import { useParticipantGroupsAccountsAndStatus } from '@Utils/queries/participants';
import { getDeploymentDisplayName, PageType, useGetUri } from '@Utils/utility';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BasicInfo from './BasicInfo';
import DataVisualizationForDeployment from './DataVisualizationForDeployment';
import Devices from './Devices';
import InformedConsentCard from './InformedConsentCard';
import Participants from './Participants';

const Deployment = () => {
  const { t } = useTranslation();
  const { deploymentId, id: studyId } = useParams();

  const { data: participantData } =
    useParticipantGroupsAccountsAndStatus(studyId);

  // Resolve the deployment name for the breadcrumb using the same fallback as
  // the list and detail views; falls back to the generic label until loaded.
  const deploymentName = useMemo(() => {
    const deployment = participantData?.groups?.find(
      (g) => g.participantGroupId === deploymentId,
    );
    const statuses = participantData?.groupStatuses as
      { id: string; representation?: { name: string | null } }[] | undefined;
    const representationName =
      statuses?.find((s) => s.id === deploymentId)?.representation?.name ??
      null;
    return getDeploymentDisplayName(deployment, representationName).name;
  }, [participantData, deploymentId]);

  const sectionName = [
    { name: 'Deployments', uri: useGetUri(PageType.DEPLOYMENTS) },
    {
      name: deploymentName || 'Deployment',
      uri: useGetUri(PageType.DEPLOYMENT),
    },
  ];
  const description = t('deployment:page_description');

  return (
    <StudyPageLayout>
      <StudyHeader path={sectionName} description={description} />
      <BasicInfo />
      <Participants />
      <Devices />
      <InformedConsentCard />
      <DataVisualizationForDeployment />
    </StudyPageLayout>
  );
};

export default Deployment;
