import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import StyledStatusDot from './styles';

const TooltipContent = () => {
  return (
    <Stack direction="column" spacing="12px">
      <Stack direction="row" sx={{ alignItems: 'baseline', gap: '4px' }}>
        <StyledStatusDot status="Unregistered" />
        <Typography variant="h5">
          Unregistered: The device has not been registered.
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ alignItems: 'baseline', gap: '4px' }}>
        <StyledStatusDot status="Registered" />
        <Typography variant="h5">
          Registered: The device has been registered.
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ alignItems: 'baseline', gap: '4px' }}>
        <StyledStatusDot status="Deployed" />
        <Typography variant="h5">
          Deployed: The device was able to load all the necessary plugins to
          execute the study.
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ alignItems: 'baseline', gap: '4px' }}>
        <StyledStatusDot status="NeedsRedeployment" />
        <Typography variant="h5">
          Needs Redeployment: The device has previously been deployed correctly,
          but due to changes in the device registration needs to be redeployed.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default TooltipContent;
