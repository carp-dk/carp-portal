import {
  useGetParticipantData,
  useParticipantGroupsAccountsAndStatus,
  useSetParticipantData,
} from "@Utils/queries/participants";
import EditIcon from "@mui/icons-material/Edit";
import { Button, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import carpCommon from "@cachet/carp-common";
import { useStudyDetails } from "@Utils/queries/studies";
import { InputDataType, ParticipantData } from "@carp-dk/client/models";
import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import {
  EditButton,
  Left,
  Right,
  StyledCard,
  StyledDescription,
  StyledDivider,
  Title,
  Top,
} from "./styles";
import getInputElement from "./InputElements/selector";

import dk = carpCommon.dk;
import CarpInputDataTypes = dk.cachet.carp.common.application.data.input.CarpInputDataTypes;
import SelectOne = dk.cachet.carp.common.application.data.input.elements.SelectOne;
import LoadingSkeleton from "../LoadingSkeleton";

const ParticipantDataCard = () => {
  const [editing, setEditing] = useState(false);
  const { participantId, id: studyId, deploymentId } = useParams();
  // TODO: Fetch participant data
  // const { data: participantData, isLoading: participantDataLoading } =
  //   useParticipantData(groupId);
  const {
    data: study,
    isLoading: studyLoading,
    error: studyError,
  } = useStudyDetails(studyId);
  const {
    data: participantGroupStatus,
    isLoading: participantGroupStatusLoading,
    error: participantGroupStatusError,
  } = useParticipantGroupsAccountsAndStatus(studyId);
  const setParticipantData = useSetParticipantData(deploymentId);
  const {
    data: participantData,
    isLoading: participantDataLoading,
    error: participantDataError,
  } = useGetParticipantData(deploymentId);

  const [participant, setParticipant] = useState<ParticipantData | null>(null);

  useEffect(() => {
    if (participantGroupStatus) {
      setParticipant(
        participantGroupStatus.groups
          .find((g) => g.participantGroupId === deploymentId)
          .participants.find((p) => p.participantId === participantId),
      );
    }
  }, [participantGroupStatus]);

  const [newParticipantData, setNewParticipantData] = useState<{
    [key: string]: InputDataType;
  }>({});

  const submit = (e) => {
    e.preventDefault();
    console.log(newParticipantData);
    setParticipantData.mutate({
      participantData: newParticipantData,
      role: participant.role,
    });
  };

  if (studyLoading || participantDataLoading || participantGroupStatusLoading) {
    return <LoadingSkeleton />;
  }

  if (studyError || participantDataError || participantGroupStatusError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading participant data"
        error={
          studyError ?? participantDataError ?? participantGroupStatusError
        }
      />
    );
  }

  // TODO: Add loading skeleton
  return (
    <StyledCard elevation={2}>
      <Top>
        <Left>
          <Title variant="h3">Participant Data</Title>
          <StyledDescription variant="h5">
            After editing data, all the changes will be autosaved.
          </StyledDescription>
        </Left>
        <Right>
          <StyledDivider />
          <EditButton onClick={() => setEditing(true)}>
            <Typography variant="h6">Edit Data</Typography>
            <EditIcon fontSize="small" />
          </EditButton>
        </Right>
      </Top>
      {/* <StyledFormControl onBlur={handleBlur}> */}
      <Stack gap={2}>
        {study?.protocolSnapshot.expectedParticipantData
          .toArray()
          .map((data) => {
            const inputData = participantData.common.values
              .toArray()
              .filter((v) => v)
              .find(
                // eslint-disable-next-line no-underscore-dangle
                (v) => v.__type.toString() === data.inputDataType.toString(),
              );
            if (CarpInputDataTypes.inputElements.get(data.inputDataType)) {
              const element = CarpInputDataTypes.inputElements.get(
                data.inputDataType,
              );
              if (element instanceof SelectOne) {
                return (
                  <Stack
                    direction="row"
                    gap={1}
                    alignItems="center"
                    key={data.inputDataType.name}
                  >
                    <Typography
                      variant="h4"
                      style={{ textTransform: "capitalize" }}
                    >
                      {data.attribute.inputDataType.name}
                    </Typography>
                    <Select
                      name={data.inputDataType.name}
                      defaultValue={inputData?.value}
                      onChange={(e) => {
                        setNewParticipantData((oldParticipantData) => ({
                          ...oldParticipantData,
                          [`${data.inputDataType.namespace}.${
                            data.inputDataType.name
                          }`]: {
                            __type: `${data.inputDataType.namespace}.${
                              data.inputDataType.name
                            }`,
                            value: e.target.value,
                          },
                        }));
                      }}
                    >
                      {element.options.toArray().map((option) => {
                        return (
                          <MenuItem id={option} value={option} key={option}>
                            {option}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Stack>
                );
              }
            } else if (data.inputDataType.name) {
              if (data.inputDataType.name !== "informed_consent") {
                return getInputElement(
                  data.inputDataType.name,
                  inputData,
                  setNewParticipantData,
                );
              }
            }
            return null;
          })}
      </Stack>
      <Button type="submit" variant="contained" onClick={submit}>
        Submit
      </Button>
      {/* </StyledFormControl> */}
    </StyledCard>
  );
};

export default ParticipantDataCard;
