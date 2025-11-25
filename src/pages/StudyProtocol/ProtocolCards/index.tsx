import getInputDataName from '@Assets/inputTypeNames';
import carpCommon from '@cachet/carp-common';
import carpProtocols from '@cachet/carp-protocols-core';
import { StudyProtocolSnapshot } from '@carp-dk/client';
import { Typography } from '@mui/material';
import DeviceDropdown from '../DeviceDropdown';
import {
  CardTitle,
  ProtocolDescription,
  ProtocolName,
  StyledCard,
  StyledContainer,
  StyledNameCard,
} from './styles';
import DeviceConnection = carpProtocols.dk.cachet.carp.protocols.application.StudyProtocolSnapshot.DeviceConnection;

type ParticipantRole =
  carpCommon.dk.cachet.carp.common.application.users.ParticipantRole;

type Props = {
  protocol: StudyProtocolSnapshot;
};

const ProtocolCards = ({ protocol }: Props) => {
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
      {protocol.primaryDevices.size() > 0 &&
        protocol.connectedDevices.size() > 0 && (
          <StyledCard elevation={2}>
            <CardTitle variant="h2">Devices</CardTitle>
            {protocol.primaryDevices.toArray().map((device) => {
              return (
                <DeviceDropdown
                  connectedDevices={protocol.connectedDevices.toArray()}
                  connections={protocol.connections
                    .toArray()
                    .filter((connection: DeviceConnection) => {
                      return connection.connectedToRoleName === device.roleName;
                    })}
                  key={device.roleName}
                  device={device}
                />
              );
            })}
          </StyledCard>
        )}
      {protocol.expectedParticipantData.size() > 0 && (
        <StyledCard elevation={2}>
          <CardTitle variant="h2">Participant data</CardTitle>
          <ul>
            {protocol.expectedParticipantData.toArray().map((data) => {
              return (
                <li
                  key={data.inputDataType.toString()}
                  style={{ marginBottom: 10 }}
                >
                  <Typography variant="h4">
                    {getInputDataName(data.attribute.inputDataType.name)}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </StyledCard>
      )}
      {protocol.participantRoles.size() > 0 && (
        <StyledCard elevation={2}>
          <CardTitle variant="h2">Participant roles</CardTitle>
          <ul>
            {protocol.participantRoles
              .toArray()
              .map((role: ParticipantRole) => {
                return (
                  <li key={role.role} style={{ marginBottom: 10 }}>
                    <Typography variant="h4">{role.role}</Typography>
                  </li>
                );
              })}
          </ul>
        </StyledCard>
      )}
      {protocol.tasks.size() > 0 && (
        <StyledCard elevation={2}>
          <CardTitle variant="h2">Tasks</CardTitle>
          <ul>
            {protocol.tasks.toArray().map((task) => {
              return (
                <li key={task.name} style={{ marginBottom: 10 }}>
                  <Typography variant="h4">{task.name}</Typography>
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
