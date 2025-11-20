import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import StudyPageLayout from '@Components/Layout/StudyPageLayout';
import SiteUnavailable from '@Components/SiteUnavailable';
import StudyHeader from '@Components/StudyHeader';
import { useParticipantGroupsAccountsAndStatus } from '@Utils/queries/participants';
import { useStudyStatus } from '@Utils/queries/studies';
import { ParticipantGroup, StudyStatus } from '@carp-dk/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUri, PageType } from '@Utils/utility';
import DeploymentCard, { DeploymentSkeletonCard } from './DeploymentCard';
import Pagination from './Pagination';
import Toolbar from './Toolbar';

const PageSize = 8;

const Deployments = () => {
  const { id: studyId } = useParams();
  const [searchText, setSearchText] = useState('');
  const [deployments, setDeployments] = useState([] as ParticipantGroup[]);
  const [paginatedDeployments, setPaginatedDeployments] = useState(
    [] as ParticipantGroup[],
  );
  const {
    data: deploymentsData,
    isLoading: isdeploymentsLoading,
    error: deploymentsError,
  } = useParticipantGroupsAccountsAndStatus(studyId);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: studyStatus, isLoading: isStudyStatusLoading } =
    useStudyStatus(studyId);
  const [openCardCount, setOpenCardCount] = useState(0);

  const toggleAllCards = () => {
    setOpenCardCount((prevOpenCardCount) =>
      prevOpenCardCount === paginatedDeployments.length ?
        0 :
        paginatedDeployments.length,
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  useEffect(() => {
    setOpenCardCount(0);
    if (
      studyStatus instanceof StudyStatus.Live &&
      deploymentsData?.groups !== undefined &&
      deploymentsData?.groups.length !== 0
    ) {
      if (searchText === '') {
        setDeployments(deploymentsData?.groups);
        setPaginatedDeployments(
          deploymentsData?.groups.slice(
            (currentPage - 1) * PageSize,
            currentPage * PageSize,
          ),
        );
      } else {
        const newDeployments = deploymentsData?.groups.filter(
          (deployment) =>
            deployment?.participantGroupId.includes(searchText) ||
            deployment?.participants?.some(
              (participant) =>
                (participant.firstName &&
                  participant.lastName &&
                  `${participant.firstName} ${participant.lastName}`
                    .toLowerCase()
                    .includes(searchText)) ||
                    (participant.email &&
                      participant.email.toLowerCase().includes(searchText)),
            ),
        );
        setDeployments(newDeployments);
        setPaginatedDeployments(
          newDeployments.slice(
            (currentPage - 1) * PageSize,
            currentPage * PageSize,
          ),
        );
      }
    }
  }, [searchText, currentPage, deploymentsData, studyStatus]);

  const sectionName = {
    name: 'Deployments',
    uri: getUri(PageType.DEPLOYMENTS),
  };
  const description =
    'See all the deployments, expand them for more information.';
  const siteUnavailableDescription = [
    'In order to overview Deployments page, it is necessary to start your study first.',
    'To begin, please navigate to the study settings page.',
  ];
  const siteUnavailableLinkText = 'Study Settings Page';
  const siteUnavailableLinkUrl = `/studies/${studyId}/settings`;
  const siteUnavailableDescription2 = [
    'In order to overview Deployments page, you have to create a deployment first.',
    'To begin, please navigate to the study participants page.',
  ];
  const siteUnavailableLinkText2 = 'Study Participants Page';
  const siteUnavailableLinkUrl2 = `/studies/${studyId}/participants`;

  if (isdeploymentsLoading || isStudyStatusLoading) {
    return (
      <StudyPageLayout>
        <StudyHeader path={[sectionName]} description={description} />
        <Toolbar
          searchDeployments={() => {}}
          toggleAllCards={() => {}}
          isAllCardsOpen={false} // error here: length of undefined
        />
        <DeploymentSkeletonCard />
      </StudyPageLayout>
    );
  }

  if (!(studyStatus instanceof StudyStatus.Live)) {
    return (
      <StudyPageLayout>
        <SiteUnavailable
          siteUnavailableDescription={siteUnavailableDescription}
          siteUnavailableLinkText={siteUnavailableLinkText}
          siteUnavailableLinkUrl={siteUnavailableLinkUrl}
        />
      </StudyPageLayout>
    );
  }

  if (deploymentsError) {
    return (
      <StudyPageLayout>
        <CarpErrorCardComponent
          message="An error occurred while loading deployments"
          error={deploymentsError}
        />
      </StudyPageLayout>
    );
  }

  if (deploymentsData?.groups.length === 0) {
    return (
      <StudyPageLayout>
        <SiteUnavailable
          siteUnavailableDescription={siteUnavailableDescription2}
          siteUnavailableLinkText={siteUnavailableLinkText2}
          siteUnavailableLinkUrl={siteUnavailableLinkUrl2}
        />
      </StudyPageLayout>
    );
  }
  return (
    <StudyPageLayout>
      <StudyHeader path={[sectionName]} description={description} />
      <Toolbar
        searchDeployments={(text) => setSearchText(text)}
        toggleAllCards={toggleAllCards}
        isAllCardsOpen={
          openCardCount === paginatedDeployments.length &&
          paginatedDeployments.length !== 0
        } // error here: length of undefined
      />
      {paginatedDeployments.map((deployment) => (
        <DeploymentCard
          deployment={deployment}
          openCardCount={openCardCount}
          setOpenCardCount={setOpenCardCount}
          allDeploymentCount={paginatedDeployments.length}
          key={deployment.participantGroupId}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalCount={deployments.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </StudyPageLayout>
  );
};

export default Deployments;
