/* eslint-disable no-underscore-dangle */
import CopyButton from "@Components/Buttons/CopyButton";
import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import {
  useParticipantGroupsAccountsAndStatus,
  useStopParticipantGroup,
} from "@Utils/queries/participants";
import { ParticipantGroup } from "@carp-dk/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { formatDateTime } from "@Utils/utility";
import { Stop } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useCreateSummary } from "@Utils/queries/studies";
import DeleteConfirmationModal from "@Components/DeleteConfirmationModal";
import {
  ExportButton,
  Left,
  Right,
  SecondaryText,
  StyledButton,
  StyledCard,
  StyledDivider,
  StyledStatusDot,
  StyledStatusText,
} from "./styles";
import LoadingSkeleton from "../LoadingSkeleton";

const BasicInfo = () => {
  const { deploymentId, id: studyId } = useParams();
  const { t } = useTranslation();

  const {
    data: participantData,
    isLoading: participantDataLoading,
    error: participantError,
  } = useParticipantGroupsAccountsAndStatus(studyId);
  const stopDeployment = useStopParticipantGroup(studyId);

  const [deployment, setDeployment] = useState<ParticipantGroup | null>(null);
  const [openStopConfirmationModal, setOpenStopConfirmationModal] =
    useState(false);

  const handleStopDeployment = () => {
    setOpenStopConfirmationModal(false);
    stopDeployment.mutate(deployment.participantGroupId);
  };

  const confirmationModalProps = {
    open: openStopConfirmationModal,
    onClose: () => setOpenStopConfirmationModal(false),
    onConfirm: handleStopDeployment,
    title: t("deployment:stop_deployment.title"),
    description: t("deployment:stop_deployment.description"),
    boldText: t("deployment:stop_deployment.alert"),
    checkboxLabel: t("deployment:stop_deployment.confirm"),
    actionButtonLabel: t("deployment:stop_deployment.stop"),
  };

  const generateExport = useCreateSummary();

  useEffect(() => {
    if (!participantDataLoading && participantData && participantData.groups) {
      setDeployment(
        participantData.groups.find(
          (g) => g.participantGroupId === deploymentId,
        ),
      );
    }
  }, [participantData, participantDataLoading, deploymentId]);

  if (participantDataLoading || !deployment) return <LoadingSkeleton />;

  if (participantError)
    return (
      <CarpErrorCardComponent
        message={t("error.deployment_data")}
        error={participantError}
      />
    );

  return (
    <>
      <DeleteConfirmationModal
        open={confirmationModalProps.open}
        title={confirmationModalProps.title}
        description={confirmationModalProps.description}
        boldText={confirmationModalProps.boldText}
        checkboxLabel={confirmationModalProps.checkboxLabel}
        actionButtonLabel={confirmationModalProps.actionButtonLabel}
        onClose={confirmationModalProps.onClose}
        onConfirm={confirmationModalProps.onConfirm}
      />
      <Box display="flex" justifyContent="flex-end" marginBottom="16px">
        <ExportButton
          onClick={() =>
            generateExport.mutate({ studyId, deploymentIds: [deploymentId] })
          }
        >
          <FileDownloadOutlinedIcon fontSize="small" />
          <Typography variant="h5">{t("common:export_data")}</Typography>
        </ExportButton>
      </Box>
      <StyledCard elevation={2}>
        <Left>
          <Stack direction="column" gap="8px" alignItems="center">
            <StyledStatusDot
              status={deployment.deploymentStatus.__type.split(".").pop()}
            />
            <StyledStatusText
              variant="h6"
              status={deployment.deploymentStatus.__type.split(".").pop()}
              align="center"
            >
              {deployment.deploymentStatus.__type
                .split(".")
                .pop()
                .replace(/([a-z])([A-Z])/g, "$1 $2")}
            </StyledStatusText>
          </Stack>
          {!deployment.deploymentStatus.__type.includes("Stopped") && (
            <StyledButton
              variant="outlined"
              onClick={() => setOpenStopConfirmationModal(true)}
            >
              <Stop fontSize="small" />
              {t("deployment:stop_deployment.title")}
            </StyledButton>
          )}
        </Left>
        <Right>
          <Stack direction="column">
            <Stack
              direction="row"
              gap="8px"
              justifyContent="end"
              marginRight="36px"
            >
              <SecondaryText variant="h6">
                {`${t("common:created_on", {
                  date: formatDateTime(deployment.deploymentStatus.createdOn, {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }),
                })}`}
              </SecondaryText>
              {deployment.deploymentStatus.startedOn && (
                <SecondaryText variant="h6">
                  {`${t("common:started_on", {
                    date: formatDateTime(
                      deployment.deploymentStatus.startedOn,
                      {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      },
                    ),
                  })}`}
                </SecondaryText>
              )}
              {deployment.deploymentStatus.stoppedOn && (
                <SecondaryText variant="h6">
                  {`${t("common:stopped_on", {
                    date: formatDateTime(
                      deployment.deploymentStatus.stoppedOn,
                      {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      },
                    ),
                  })}`}
                </SecondaryText>
              )}
            </Stack>
            <StyledDivider />
            <Stack direction="row" gap="16px" justifyContent="end">
              <SecondaryText variant="h6">
                {t("common:deployment_id", { id: deploymentId })}
              </SecondaryText>
              <CopyButton textToCopy={deploymentId} idType="Deployment" />
            </Stack>
          </Stack>
        </Right>
      </StyledCard>
    </>
  );
};

export default BasicInfo;
