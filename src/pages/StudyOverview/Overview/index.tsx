import DeploymentStatus from "./DeploymentStatus";
import DeviceDeploymentStatus from "./DeviceDeploymentStatus";
import InactiveParticipants from "./InactiveParticipants";
import Status from "./Status";
import StyledContainer from "./styles";

const Overview = () => {
  return (
    <StyledContainer>
      <Status />
      <DeploymentStatus />
      {/* <StudyDataTypes /> */}
      <InactiveParticipants />
      <DeviceDeploymentStatus />
      {/* <StudyData /> */}
    </StyledContainer>
  );
};

export default Overview;
