import { Stack } from '@mui/material';
import DataVisualizationForStudy from './DataVisualizationForStudy';
import DeploymentsInProgress from './DeploymentsInProgress';
import DeploymentStatus from './DeploymentStatus';
import InactiveDeployments from './InactiveDeployments';
import Status from './Status';
import StyledContainer from './styles';

const Overview = () => {
  return (
    <StyledContainer>
      <Stack sx={{ gap: '56px' }}>
        <Status />
        <DeploymentStatus />
      </Stack>
      <DeploymentsInProgress />
      <InactiveDeployments />
      <div style={{ gridColumn: '1 / -1' }}>
        <DataVisualizationForStudy />
      </div>
    </StyledContainer>
  );
};

export default Overview;
