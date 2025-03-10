import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import PieCenterLabel from "@Components/PieCenterLabel";
import { useParticipantsStatus } from "@Utils/queries/participants";
import { getDeploymentStatusColor } from "@Utils/utility";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { PieValueType } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ParticipantGroupStatus, StudyDeploymentStatus } from "@carp-dk/client";
import LoadingSkeleton from "../LoadingSkeleton";
import DeploymentStatusLegend from "./DeploymentStatusLegend";
import TooltipContent from "./TooltipContent";
import {
  StyledButton,
  StyledCard,
  StyledTitle,
  StyledTooltip,
  Top,
} from "./styles";

const DeploymentStatus = () => {
  const navigate = useNavigate();
  const { id: studyId } = useParams();
  const {
    data: participantStatus,
    isLoading: participantStatusLoading,
    error: participantStatusError,
  } = useParticipantsStatus(studyId);

  const [statuses, setStatuses] = useState<PieValueType[]>([]);

  useEffect(() => {
    if (!participantStatus) return;
    const data = participantStatus.toArray().reduce(
      (acc, curr) => {
        if (curr instanceof ParticipantGroupStatus.InDeployment) {
          const depStatus = curr.studyDeploymentStatus;
          if (depStatus instanceof StudyDeploymentStatus.Invited) {
            acc.invited.value += 1;
          } else if (depStatus instanceof StudyDeploymentStatus.Running) {
            acc.running.value += 1;
          } else if (depStatus instanceof StudyDeploymentStatus.Stopped) {
            acc.stopped.value += 1;
          } else if (
            depStatus instanceof StudyDeploymentStatus.DeployingDevices
          ) {
            acc.deploying.value += 1;
          }
        }
        return acc;
      },
      {
        invited: {
          id: 0,
          value: 0,
          label: "Invited",
          color: getDeploymentStatusColor("Invited"),
        },
        deploying: {
          id: 1,
          value: 0,
          label: "Deploying",
          color: getDeploymentStatusColor("DeployingDevices"),
        },
        running: {
          id: 2,
          value: 0,
          label: "Running",
          color: getDeploymentStatusColor("Running"),
        },
        stopped: {
          id: 3,
          value: 0,
          label: "Stopped",
          color: getDeploymentStatusColor("Stopped"),
        },
      },
    );
    setStatuses(Object.values(data));
  }, [participantStatus]);

  if (participantStatusLoading) return <LoadingSkeleton />;
  if (participantStatusError)
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading study status"
        error={participantStatusError}
      />
    );

  return (
    <StyledCard>
      <Top>
        <StyledTitle variant="h2">
          Deployment Status
          <StyledTooltip
            title={TooltipContent()}
            placement="right-start"
            componentsProps={{
              tooltip: {
                sx: {
                  color: "text.primary",
                  backgroundColor: "#FFF",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
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
      <Stack direction="row" alignItems="center">
        <div style={{ width: "200px", height: "200px", display: "flex" }}>
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
            slotProps={{
              legend: {
                hidden: true,
              },
            }}
            tooltip={{ trigger: "none" }}
          >
            <PieCenterLabel>{participantStatus.size()}</PieCenterLabel>
          </PieChart>
        </div>
        <DeploymentStatusLegend data={statuses} />
      </Stack>
    </StyledCard>
  );
};

export default DeploymentStatus;
