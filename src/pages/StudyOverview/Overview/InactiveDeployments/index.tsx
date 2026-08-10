import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import {
  MenuItem,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import {
  useDeploymentStatusCounts,
  useInactiveDeployments,
} from '@Utils/queries/participants';
import { formatDateTime } from '@Utils/utility';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSkeleton from '../LoadingSkeleton';
import {
  HeaderTableCell,
  HeaderText,
  SecondaryCellText,
  StyledCard,
  StyledDescription,
  StyledSelect,
  StyledTableCell,
  StyledTableRow,
  StyledTitle,
} from './styles';

// This card fetches all inactive deployments, which isn't useful for large studies — skip the
// fetch entirely past this many participant groups.
const LARGE_STUDY_THRESHOLD = 1000;

const InactiveDeployments = () => {
  const { id: studyId } = useParams();
  const navigate = useNavigate();
  const menuItems = [
    { value: 24, label: '24 h' },
    { value: 48, label: '48 h' },
    { value: 168, label: '1 week' },
    { value: 336, label: '2 weeks' },
    { value: 730, label: '1 month' },
    { value: 4380, label: '6 months' },
  ];

  const [lastUpdateTime, setLastUpdateTime] = useState<number>(
    menuItems[0].value,
  );

  const { data: counts, isLoading: countsLoading } =
    useDeploymentStatusCounts(studyId);
  const isLargeStudy = (counts?.total ?? 0) > LARGE_STUDY_THRESHOLD;

  const {
    data: inactiveDeployments,
    isLoading: isInactiveDeploymentsLoading,
    error: inactiveDeploymentsError,
  } = useInactiveDeployments(
    studyId,
    lastUpdateTime,
    // Only fetch once we know it's a small study, so large studies never trigger the full fetch.
    !countsLoading && !isLargeStudy,
  );

  if (countsLoading) {
    return <LoadingSkeleton />;
  }

  if (isLargeStudy) {
    return (
      <StyledCard elevation={2}>
        <StyledTitle variant="h2">Inactive Deployments</StyledTitle>
        <StyledDescription variant="h6">
          Not shown for studies with more than {LARGE_STUDY_THRESHOLD}{' '}
          participants. Use the Deployments page to browse and filter
          deployments.
        </StyledDescription>
      </StyledCard>
    );
  }

  if (isInactiveDeploymentsLoading) {
    return <LoadingSkeleton />;
  }

  if (inactiveDeploymentsError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading participant deployments"
        error={inactiveDeploymentsError}
      />
    );
  }

  return (
    <StyledCard elevation={2}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <StyledTitle variant="h2">Inactive Deployments</StyledTitle>
        <StyledSelect
          value={lastUpdateTime}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  width: '116px',
                  borderRadius: '16px',
                },
              },
            },
          }}
          renderValue={() => {
            const selectedItem = menuItems.find(
              (item) => item.value === lastUpdateTime,
            );
            return <Typography variant="h5">{selectedItem.label}</Typography>;
          }}
          onChange={(e) => {
            setLastUpdateTime(e.target.value as unknown as number);
          }}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <Typography variant="h5">{item.label}</Typography>
            </MenuItem>
          ))}
        </StyledSelect>
      </Stack>
      <StyledDescription variant="h6">
        The following Deployments have not uploaded any data in the timeframe
        selected. Select the Deployments ID for further information or to send a
        reminder.
      </StyledDescription>
      <TableContainer sx={{ paddingLeft: '4px', paddingRight: '16px' }}>
        <Table
          style={{ tableLayout: 'fixed' }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <StyledTableRow>
              <HeaderTableCell>
                <HeaderText variant="h5">Deployment ID</HeaderText>
              </HeaderTableCell>
              <HeaderTableCell width="25%" align="center">
                <HeaderText variant="h5">Last Data</HeaderText>
              </HeaderTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {inactiveDeployments.map((participant) => (
              <StyledTableRow
                onClick={() =>
                  navigate(
                    `/studies/${studyId}/deployments/${participant.deploymentId}`,
                  )
                }
                key={participant.deploymentId as unknown as string}
              >
                <StyledTableCell>
                  <SecondaryCellText variant="h5">
                    {participant.deploymentId as unknown as string}
                  </SecondaryCellText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <SecondaryCellText variant="h5">
                    {formatDateTime(
                      participant.dateOfLastDataUpload.toString(),
                      { year: 'numeric', month: 'numeric', day: 'numeric' },
                    )}
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

export default InactiveDeployments;
