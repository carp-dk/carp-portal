import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import PieCenterLabel from '@Components/PieCenterLabel';
import { useDeploymentStatusCounts } from '@Utils/queries/participants';
import { getDeploymentStatusColor } from '@Utils/utility';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { PieValueType } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';
import { useNavigate, useParams } from 'react-router';
import LoadingSkeleton from '../LoadingSkeleton';
import DeploymentStatusLegend from './DeploymentStatusLegend';
import TooltipContent from './TooltipContent';
import {
  StyledButton,
  StyledCard,
  StyledTitle,
  StyledTooltip,
  Top,
} from './styles';

const DeploymentStatus = () => {
  const navigate = useNavigate();
  const { id: studyId } = useParams();
  const {
    data: counts,
    isLoading: countsLoading,
    error: countsError,
  } = useDeploymentStatusCounts(studyId);

  if (countsLoading) return <LoadingSkeleton />;
  if (countsError)
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading study status"
        error={countsError}
      />
    );

  // Counts arrive pre-aggregated from the server, so there is no full status list to fetch and reduce.
  const statuses: PieValueType[] = [
    {
      id: 0,
      value: counts.invited,
      label: 'Invited',
      color: getDeploymentStatusColor('Invited'),
    },
    {
      id: 1,
      value: counts.deployingDevices,
      label: 'Deploying',
      color: getDeploymentStatusColor('DeployingDevices'),
    },
    {
      id: 2,
      value: counts.running,
      label: 'Running',
      color: getDeploymentStatusColor('Running'),
    },
    {
      id: 3,
      value: counts.stopped,
      label: 'Stopped',
      color: getDeploymentStatusColor('Stopped'),
    },
  ];

  return (
    <StyledCard>
      <Top>
        <StyledTitle variant="h2">
          Deployment Status
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
        <StyledButton
          onClick={() => navigate(`/studies/${studyId}/deployments`)}
          variant="outlined"
        >
          <ManageAccountsIcon fontSize="small" color="primary" />
          <Typography variant="h5">Manage</Typography>
        </StyledButton>
      </Top>
      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <div style={{ width: '200px', height: '200px', display: 'flex' }}>
          <PieChart
            height={200}
            width={200}
            series={[
              {
                data: statuses,
                cx: 100,
                innerRadius: 50,
                outerRadius: 90,
                cornerRadius: 5,
                paddingAngle: 0,
                startAngle: 0,
                endAngle: -180,
              },
            ]}
            hideLegend
            slotProps={{
              tooltip: {
                hidden: true,
              },
            }}
          >
            <PieCenterLabel>{counts.total}</PieCenterLabel>
          </PieChart>
        </div>
        <DeploymentStatusLegend
          data={statuses}
          onStatusClick={(status) =>
            navigate(
              `/studies/${studyId}/deployments?status=${encodeURIComponent(status)}`,
            )
          }
        />
      </Stack>
    </StyledCard>
  );
};

export default DeploymentStatus;
