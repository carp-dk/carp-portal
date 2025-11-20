/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDeviceIcon } from '@Utils/utility';
import carpProtocols from '@cachet/carp-protocols-core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeviceIcon from '@mui/icons-material/Smartphone';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  ConnectedDeviceItem,
  ConnectedDevicesContainer,
  DeviceName,
  DropdownBar,
  ExpandButton,
  StyledContainer,
} from './styles';
import DeviceConnection = carpProtocols.dk.cachet.carp.protocols.application.StudyProtocolSnapshot.DeviceConnection;
import DeviceConfiguration = carpProtocols.dk.cachet.carp.common.application.devices.DeviceConfiguration;

type Props = {
  device: DeviceConfiguration<any, any>;
  connections?: DeviceConnection[];
  connectedDevices?: DeviceConfiguration<any, any>[];
};

const DeviceDropdown = ({ device, connections, connectedDevices }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledContainer numberOfConnections={connections.length} open={open}>
      <DropdownBar onClick={() => setOpen(!open)}>
        <DeviceIcon color="primary" fontSize="small" />
        <DeviceName variant="h3">{device.roleName}</DeviceName>
        <ExpandButton open={open}>
          <ExpandMoreIcon color="primary" fontSize="large" />
        </ExpandButton>
      </DropdownBar>
      <ConnectedDevicesContainer>
        {connections.map((connection) => {
          const deviceType =
            // TODO: CORE missing js type for i20_1, so for now we will go with the HACK
            (
              connectedDevices.find((connectedDevice) => {
                return connectedDevice.roleName === connection.roleName;
              }) as any
            ).i20_1;
          return (
            <ConnectedDeviceItem key={uuidv4()}>
              {getDeviceIcon(deviceType, true)}
              <Typography variant="h4">{connection.roleName}</Typography>
            </ConnectedDeviceItem>
          );
        })}
      </ConnectedDevicesContainer>
    </StyledContainer>
  );
};

export default DeviceDropdown;
