import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import {
  useDeviceDeployed,
  useParticipantGroupsAccountsAndStatus,
  useRegisterDevice,
} from "@Utils/queries/participants";
import { Checkbox, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarpAccordion from "@Components/CarpAccordion";
import LoadingSkeleton from "../LoadingSkeleton";
import {
  ActionButton,
  Bottom,
  CancelButton,
  Description,
  DescriptionContainer,
  ModalBox,
  StyledStatusDot,
  Title,
} from "./styles";
import { t } from "i18next";
import { useStudyDetails } from "@Utils/queries/studies";
import { getDeviceIcon } from "@Utils/utility";
import { title } from "process";
import { CarpServiceError } from "@carp-dk/client";
import { randomUUID } from "crypto";
import { v4 } from "uuid";

const Devices = () => {
  const { id: studyId, deploymentId } = useParams();

  const {
    data: study,
    isLoading: studyLoading,
    error: studyError,
  } = useStudyDetails(studyId);

  const {
    data: participantGroupsAndStatuses,
    isLoading: participantGroupsAndStatusesLoading,
    error: participantGroupsAndStatusesError,
  } = useParticipantGroupsAccountsAndStatus(studyId);

  const registerDevice = useRegisterDevice(studyId);
  const deviceDeployed = useDeviceDeployed(studyId);

  const [devices, setDevices] = useState<
    {
      primaryDevice: { name: string; type: string; status: string };
      connections: { name: string; type: string; status: string }[];
    }[]
  >([]);

  const [modalState, setModalState] = useState<{
    open: boolean;
    roleName: string;
    deviceId: string;
  }>({ open: false, roleName: "", deviceId: "" });
  const [allowDeploy, setAllowDeploy] = useState(false);

  const onConfirm = async () => {
    console.log(modalState.roleName);
    await registerDevice
      .mutateAsync({
        studyDeploymentId: deploymentId,
        roleName: modalState.roleName,
        deviceId: modalState.deviceId,
      })
      .catch((err) => {
        if (
          (err as CarpServiceError).httpResponseMessage !==
          "The passed device is already registered."
        ) {
          throw err;
        }
      });
    console.log("deploying");
    await deviceDeployed.mutateAsync({
      studyDeploymentId: deploymentId,
      roleName: modalState.roleName,
    });

    setModalState({ open: false, roleName: "", deviceId: "" });
  };

  useEffect(() => {
    if (study && participantGroupsAndStatuses) {
      const connectedDevices = study.protocolSnapshot.primaryDevices
        .toArray()
        .map((device) => {
          const connections = study.protocolSnapshot.connections
            .toArray()
            .filter((connection) => {
              return connection.connectedToRoleName === device.roleName;
            })
            .map((connection) => {
              const deviceStatus = participantGroupsAndStatuses.groups
                .find((s) => s.participantGroupId === deploymentId)
                .deploymentStatus.deviceStatusList.find(
                  (d) => d.device.roleName === connection.roleName,
                );
              return {
                name: connection.roleName,
                type: deviceStatus.device.__type,
                status: deviceStatus.__type.split(".").pop(),
              };
            });
          const deviceStatus = participantGroupsAndStatuses.groups
            .find((s) => s.participantGroupId === deploymentId)
            .deploymentStatus.deviceStatusList.find(
              (d) => d.device.roleName === device.roleName,
            );
          return {
            primaryDevice: {
              name: device.roleName,
              type: deviceStatus.device.__type,
              status: deviceStatus.__type.split(".").pop(),
            },
            connections,
          };
        });
      setDevices(connectedDevices);
    }
  }, [participantGroupsAndStatuses, deploymentId]);

  if (studyLoading || participantGroupsAndStatusesLoading)
    return <LoadingSkeleton />;

  if (studyError || participantGroupsAndStatusesError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading participants"
        error={studyError ?? participantGroupsAndStatusesError}
      />
    );
  }
  console.log(devices);
  return (
    <CarpAccordion
      title={t("deployment:devices_card.title")}
      description={t("deployment:devices_card.description")}
    >
      <Modal
        open={modalState.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox sx={{ boxShadow: 24 }}>
          <Title variant="h2">{"Deployment of a Master Device"}</Title>
          <DescriptionContainer>
            <Description variant="h4">
              {
                "The device will be permanently deployed. You can not undo this action."
              }
            </Description>
          </DescriptionContainer>
          <Bottom>
            <Stack direction={"row"} alignItems={"center"} gap={"8px"}>
              <Checkbox onClick={() => setAllowDeploy(!allowDeploy)} />
              <Typography variant="h5">
                {"I'm sure I want to deploy it"}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={"8px"}>
              <CancelButton
                onClick={() => {
                  setModalState({ open: false, roleName: "", deviceId: "" });
                  setAllowDeploy(false);
                }}
              >
                Cancel
              </CancelButton>
              <ActionButton
                variant="contained"
                color="primary"
                onClick={() => onConfirm()}
                disabled={!allowDeploy}
              >
                {"Deploy"}
              </ActionButton>
            </Stack>
          </Bottom>
        </ModalBox>
      </Modal>

      <Stack spacing={"16px"} direction={"row"}>
        {devices &&
          devices.map(({ primaryDevice, connections }) => (
            <Stack
              key={primaryDevice.name}
              gap={"8px"}
              border={"1px solid #ABABAB"}
              borderRadius={"16px"}
              display={"flex"}
              width={"100%"}
              maxWidth={"25%"}
              padding={"16px 16px"}
            >
              <Stack
                direction={"row"}
                gap={"16px"}
                padding={"4px 8px 4px 4px"}
                display={"grid"}
                gridTemplateColumns={"1fr 8px 16px"}
                onClick={() =>
                  setModalState({
                    open: true,
                    roleName: primaryDevice.name,
                    deviceId: v4(),
                  })
                }
                sx={{
                  "&:hover": {
                    backgroundColor: "#ededed",
                    borderRadius: "100px",
                    cursor: "pointer",
                  },
                }}
                justifyContent={"center"}
              >
                <Stack
                  direction={"row"}
                  gap={"8px"}
                  display={"grid"}
                  gridTemplateColumns={"18px 1fr"}
                >
                  {getDeviceIcon(primaryDevice.type)}
                  <Typography variant="h4" noWrap>
                    {primaryDevice.name}
                  </Typography>
                </Stack>
                <StyledStatusDot status={primaryDevice.status} />
              </Stack>
              <Stack gap={"4px"}>
                {connections.map((connection) => {
                  return (
                    <Stack
                      key={connection.name}
                      direction={"row"}
                      gap={"16px"}
                      padding={"4px 8px 4px 24px"}
                      display={"grid"}
                      gridTemplateColumns={"1fr 8px 16px"}
                      justifyContent={"center"}
                    >
                      <Stack
                        direction={"row"}
                        gap={"8px"}
                        display={"grid"}
                        gridTemplateColumns={"18px 1fr"}
                      >
                        {getDeviceIcon(connection.type)}
                        <Typography variant="h5" noWrap>
                          {connection.name}
                        </Typography>
                      </Stack>
                      <StyledStatusDot status={connection.status} />
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          ))}
      </Stack>
    </CarpAccordion>
  );
};

export default Devices;
