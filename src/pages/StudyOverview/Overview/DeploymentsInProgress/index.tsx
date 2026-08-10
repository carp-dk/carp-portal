import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import {
  useDeploymentStatusCounts,
  useParticipantGroupsAccountsAndStatus,
} from '@Utils/queries/participants';
import { useEffect, useState } from 'react';
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

// This card fetches every participant group's full status, which is wasteful and not useful for
// large studies — skip the fetch entirely past this many participant groups.
const LARGE_STUDY_THRESHOLD = 1000;

const DeploymentsInProgress = () => {
  const { id: studyId } = useParams();
  const navigate = useNavigate();
  const { data: counts, isLoading: countsLoading } =
    useDeploymentStatusCounts(studyId);
  const isLargeStudy = (counts?.total ?? 0) > LARGE_STUDY_THRESHOLD;
  const {
    data: deploymentsAccountAndStatus,
    isLoading: isDeploymentsAccountAndStatusLoading,
    error: deploymentsAccountAndStatusError,
  } = useParticipantGroupsAccountsAndStatus(
    studyId,
    undefined,
    // Only fetch once we know it's a small study, so large studies never trigger the full fetch.
    !countsLoading && !isLargeStudy,
  );
  const [deploymentProgress, setDeploymentProgress] = useState<
    {
      deploymentId: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      devices: any[];
    }[]
  >([]);

  useEffect(() => {
    if (
      deploymentsAccountAndStatus?.groups !== undefined &&
      deploymentsAccountAndStatus?.groups.length !== 0
    ) {
      const deployments = deploymentsAccountAndStatus.groups
        .filter((g) => !g.deploymentStatus.__type.includes('Stopped'))
        .map((g) => {
          const devices = g.deploymentStatus.deviceStatusList.filter(
            (dl) => dl.device.isPrimaryDevice,
          );
          return { deploymentId: g.participantGroupId, devices };
        })
        .flat();
      setDeploymentProgress(deployments);
    }
  }, [deploymentsAccountAndStatus]);

  if (countsLoading) {
    return <LoadingSkeleton />;
  }

  if (isLargeStudy) {
    return (
      <StyledCard elevation={2}>
        <StyledTitle variant="h2">Deployments in Progress</StyledTitle>
        <StyledDescription variant="h6">
          Not shown for studies with more than {LARGE_STUDY_THRESHOLD}{' '}
          participants. Use the Deployments page to browse and filter
          deployments.
        </StyledDescription>
      </StyledCard>
    );
  }

  if (isDeploymentsAccountAndStatusLoading) {
    return <LoadingSkeleton />;
  }

  if (deploymentsAccountAndStatusError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading participants"
        error={deploymentsAccountAndStatusError}
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
                backgroundColor: '#FFF',
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
                        backgroundColor: '#EDEDED',
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
    </StyledCard>
  );
};

export default DeploymentsInProgress;
