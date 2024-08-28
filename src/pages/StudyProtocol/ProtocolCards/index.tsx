import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import { useProtocolDetails } from "@Utils/queries/protocols";
import { getRandomNumber } from "@Utils/utility";
import { Skeleton, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DeviceDropdown from "../DeviceDropdown";
import {
  CardTitle,
  ProtocolDescription,
  ProtocolName,
  StyledCard,
  StyledContainer,
  StyledNameCard,
} from "./styles";

import {StudyProtocolSnapshot, Set, Collection} from "@carp-dk/client/shared";
const ProtocolNameCardSkeleton: React.FC = () => {
  return (
    <StyledNameCard elevation={2}>
      <Skeleton height={32} animation="wave" variant="text" width={70} />
      <Skeleton height={28} animation="wave" variant="text" width="83%" />
      <Skeleton height={32} animation="wave" variant="text" width={130} />
      <Skeleton animation="wave" variant="text" width="60%" />
    </StyledNameCard>
  );
};

const ProtocolCardSkeleton: React.FC = () => {
  return (
    <StyledCard elevation={2}>
      <Skeleton
        height={32}
        animation="wave"
        variant="text"
        width={`${getRandomNumber(20, 50)}%`}
      />
      {[1, 2].map(() => {
        return (
          <Skeleton
            key={uuidv4()}
            animation="wave"
            variant="text"
            width={`${getRandomNumber(40, 70)}%`}
          />
        );
      })}
    </StyledCard>
  );
};

type Props = {
  protocolId: string;
};

const ProtocolCards = ({ protocolId }: Props) => {
  const {
    data: protocol,
    isLoading: protocolLoading,
    error: protocolError,
  } = useProtocolDetails(protocolId);
  if (protocolLoading)
    return (
      <StyledContainer>
        <ProtocolNameCardSkeleton />
        <ProtocolCardSkeleton />
        <ProtocolCardSkeleton />
        <ProtocolCardSkeleton />
      </StyledContainer>
    );

  if (protocolError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading protocol"
        error={protocolError}
      />
    );
  }

  return (
    <StyledContainer>
      <StyledNameCard elevation={2}>
        <CardTitle variant="h2">Name</CardTitle>
        <ProtocolName variant="h3">{protocol.name}</ProtocolName>
        <CardTitle variant="h2">Description</CardTitle>
        <ProtocolDescription variant="h4">
          {protocol.description}
        </ProtocolDescription>
      </StyledNameCard>
      {protocol.primaryDevices.toArray && protocol.connectedDevices.toArray &&
      protocol.primaryDevices.toArray().length > 0 &&
        protocol.connectedDevices.toArray().length > 0 && (
          <StyledCard elevation={2}>
            <CardTitle variant="h2">Devices</CardTitle>
            {protocol.primaryDevices.toArray().map((device) => {
              return (
                <DeviceDropdown
                  connectedDevices={protocol.connectedDevices.toArray()}
                  connections={protocol.connections
                    .toArray()
                    .filter((connection) => {
                      return connection.connectedToRoleName === device.roleName;
                    })}
                  key={uuidv4()}
                  device={device}
                />
              );
            })}
          </StyledCard>
        )}
      {protocol.expectedParticipantData.toArray && protocol.expectedParticipantData.toArray().length > 0 && (
        <StyledCard elevation={2}>
          <CardTitle variant="h2">Participant data</CardTitle>
          <ul>
            {protocol.expectedParticipantData.toArray().map((data) => {
              return (
                <li key={uuidv4()}>
                  <Typography variant="h4">
                    {data.attribute.inputDataType.name}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </StyledCard>
      )}
      {protocol.participantRoles.toArray && protocol.participantRoles.toArray().length > 0 && (
        <StyledCard elevation={2}>
          <CardTitle variant="h2">Participant roles</CardTitle>
          <ul>
            {protocol.participantRoles
              .toArray()
              .map((role) => {
                return (
                  <li key={uuidv4()}>
                    <Typography variant="h4">{role.role}</Typography>
                  </li>
                );
              })}
          </ul>
        </StyledCard>
      )}
    </StyledContainer>
  );
};

export default ProtocolCards;
