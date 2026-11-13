import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import StudyPageLayout from '@Components/Layout/StudyPageLayout';
import SiteUnavailable from '@Components/SiteUnavailable';
import StudyHeader from '@Components/StudyHeader';
import { useParticipantGroupsAccountsAndStatus } from '@Utils/queries/participants';
import { useStudyStatus } from '@Utils/queries/studies';
import { PageType, useGetUri } from '@Utils/utility';
import { StudyStatus } from '@carp-dk/client';
import { Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import DeploymentCard, { DeploymentSkeletonCard } from './DeploymentCard';
import Pagination from './Pagination';
import Toolbar from './Toolbar';

const PageSize = 8;
const deploymentStatuses = [
  'Invited',
  'DeployingDevices',
  'Running',
  'Stopped',
];

const Deployments = () => {
  const { id: studyId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  const selectedStatus =
    statusParam && deploymentStatuses.includes(statusParam)
      ? statusParam
      : 'all';

  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  // The page number belongs to the filter it was picked under, so changing the
  // filter or (debounced) search goes back to the first page.
  const filterKey = `${selectedStatus}|${debouncedSearch}`;
  const [page, setPage] = useState({ filterKey, number: 1 });
  const currentPage = page.filterKey === filterKey ? page.number : 1;
  const setCurrentPage = (number: number) => setPage({ filterKey, number });
  // Expanded cards, by deployment id. A new page shows other ids, so it starts
  // collapsed.
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());

  // Debounce the search box so we don't fire a request on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchText), 300);
    return () => clearTimeout(timeout);
  }, [searchText]);

  // Server-side paging/filtering/search: only the current page is fetched and enriched, so this
  // scales to studies with thousands of deployments.
  const {
    data: deploymentsData,
    isLoading: isdeploymentsLoading,
    error: deploymentsError,
  } = useParticipantGroupsAccountsAndStatus(studyId, {
    page: currentPage - 1,
    size: PageSize,
    search: debouncedSearch || undefined,
    status: selectedStatus === 'all' ? undefined : selectedStatus,
  });

  const { data: studyStatus, isLoading: isStudyStatusLoading } =
    useStudyStatus(studyId);

  const deployments = deploymentsData?.groups ?? [];
  const totalCount = deploymentsData?.total ?? 0;
  const hasFilters = debouncedSearch !== '' || selectedStatus !== 'all';

  // carp.core 1.3 exposes an optional group representation name on the
  // groupStatuses entries; map it by deployment id (falls back when null).
  const representationNameById = useMemo(() => {
    const map = new Map<string, string | null>();
    (
      deploymentsData?.groupStatuses as
        { id: string; representation?: { name: string | null } }[] | undefined
    )?.forEach((status) => {
      map.set(status.id, status.representation?.name ?? null);
    });
    return map;
  }, [deploymentsData]);

  const filterDeploymentsByStatus = (status: string) => {
    setSearchParams((params) => {
      const nextParams = new URLSearchParams(params);
      if (status === 'all') {
        nextParams.delete('status');
      } else {
        nextParams.set('status', status);
      }
      return nextParams;
    });
  };

  const isAllCardsOpen =
    deployments.length !== 0 &&
    deployments.every((d) => openIds.has(d.participantGroupId));

  const toggleAllCards = () => {
    setOpenIds(
      isAllCardsOpen
        ? new Set()
        : new Set(deployments.map((d) => d.participantGroupId)),
    );
  };

  const toggleCard = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sectionName = {
    name: 'Deployments',
    uri: useGetUri(PageType.DEPLOYMENTS),
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
          filterDeploymentsByStatus={() => {}}
          selectedStatus="all"
          toggleAllCards={() => {}}
          isAllCardsOpen={false}
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

  // No filters/search and nothing came back → the study genuinely has no deployments yet.
  // (Also require an empty page so a backend that doesn't return `total` degrades gracefully.)
  if (totalCount === 0 && !hasFilters && deployments.length === 0) {
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
        searchDeployments={setSearchText}
        filterDeploymentsByStatus={filterDeploymentsByStatus}
        selectedStatus={selectedStatus}
        toggleAllCards={toggleAllCards}
        isAllCardsOpen={isAllCardsOpen}
      />
      {deployments.map((deployment) => (
        <DeploymentCard
          deployment={deployment}
          representationName={representationNameById.get(
            deployment.participantGroupId,
          )}
          isOpen={openIds.has(deployment.participantGroupId)}
          onToggle={() => toggleCard(deployment.participantGroupId)}
          key={deployment.participantGroupId}
        />
      ))}
      {totalCount === 0 && deployments.length === 0 && (
        <Typography variant="h5">
          No deployments match the current filters.
        </Typography>
      )}
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </StudyPageLayout>
  );
};

export default Deployments;
