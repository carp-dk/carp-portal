import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Link,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useParticipantGroupsAccountsAndStatus } from '@Utils/queries/participants';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSkeleton from '../LoadingSkeleton';
import {
  HeaderTableCell,
  HeaderText,
  SecondaryCellText,
  StyledCard,
  StyledDescription,
  StyledStatusDot,
  StyledTableCell,
  StyledTableRow,
  StyledTitle,
  StyledTooltip,
} from './styles';
import TooltipContent from './TooltipContent';

// Rows fetched per in-progress status. Each status is its own paged request (the API filters by
// one status at a time), so the card loads straight away at any study size instead of waiting
// for the counts and then downloading every deployment.
const PAGE_SIZE = 20;

const DeploymentsInProgress = () => {
  const { id: studyId } = useParams();
  const navigate = useNavigate();
  const invited = useParticipantGroupsAccountsAndStatus(studyId, {
    page: 0,
    size: PAGE_SIZE,
    status: 'Invited',
  });
  const deploying = useParticipantGroupsAccountsAndStatus(studyId, {
    page: 0,
    size: PAGE_SIZE,
    status: 'DeployingDevices',
  });
  const running = useParticipantGroupsAccountsAndStatus(studyId, {
    page: 0,
    size: PAGE_SIZE,
    status: 'Running',
  });
  const queries = [invited, deploying, running];
  const isLoading = queries.some((q) => q.isLoading);
  const error = queries.find((q) => q.error)?.error;

  const deploymentProgress = useMemo(
    () =>
      [invited.data, deploying.data, running.data].flatMap(
        (page) =>
          page?.groups.map((g) => ({
            deploymentId: g.participantGroupId,
            devices: g.deploymentStatus.deviceStatusList.filter(
              (dl) => dl.device.isPrimaryDevice,
            ),
          })) ?? [],
      ),
    [invited.data, deploying.data, running.data],
  );
  const totalInProgress = [invited.data, deploying.data, running.data].reduce(
    (sum, page) => sum + (page?.total ?? page?.groups.length ?? 0),
    0,
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading participants"
        error={error}
      />
    );
  }

  return (
    <StyledCard elevation={2}>
      <StyledTitle variant="h2">
        Deployments in Progress
        <StyledTooltip
          title={TooltipContent()}
          placement="right-start"
          slotProps={{
            tooltip: {
              sx: {
                color: 'text.primary',
                backgroundColor: 'common.white',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              },
            },
          }}
        >
          <InfoOutlinedIcon />
        </StyledTooltip>
      </StyledTitle>
      <StyledDescription variant="h6">
        The status of the master devices, for each Deployment. Select the
        Deployment ID for further information.
      </StyledDescription>
      <TableContainer sx={{ paddingLeft: '4px', paddingRight: '16px' }}>
        <Table
          style={{ tableLayout: 'fixed' }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <StyledTableRow>
              <HeaderTableCell width="150px">
                <HeaderText variant="h5">Deployment ID</HeaderText>
              </HeaderTableCell>
              <HeaderTableCell>
                <HeaderText variant="h5">Device Registration</HeaderText>
              </HeaderTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {deploymentProgress.map((g) => (
              <StyledTableRow key={g.deploymentId}>
                <StyledTableCell align="center">
                  <SecondaryCellText
                    variant="h5"
                    onClick={() =>
                      navigate(
                        `/studies/${studyId}/deployments/${g.deploymentId}`,
                      )
                    }
                    sx={{
                      '&:hover': {
                        backgroundColor: 'surface.hover',
                        transition: 'background-color 0.2s ease-in-out',
                        cursor: 'pointer',
                        borderRadius: '16px',
                      },
                    }}
                  >
                    {`... ${g.deploymentId.slice(-4)}`}
                  </SecondaryCellText>
                </StyledTableCell>
                <StyledTableCell>
                  <SecondaryCellText variant="h5" noWrap>
                    <Stack direction="row" spacing="16px">
                      {g.devices.map((d) => (
                        <Stack
                          direction="row"
                          sx={{ alignItems: 'center', gap: 0.5 }}
                          key={`${g.deploymentId}:${d.device.roleName}`}
                        >
                          <StyledStatusDot status={d.__type.split('.').pop()} />
                          <Typography variant="h6">
                            {d.device.roleName}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </SecondaryCellText>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {totalInProgress > deploymentProgress.length && (
        <StyledDescription variant="h6">
          Showing {deploymentProgress.length} of {totalInProgress}.{' '}
          <Link
            component="button"
            variant="h6"
            onClick={() => navigate(`/studies/${studyId}/deployments`)}
          >
            See all on the Deployments page
          </Link>
        </StyledDescription>
      )}
    </StyledCard>
  );
};

export default DeploymentsInProgress;
