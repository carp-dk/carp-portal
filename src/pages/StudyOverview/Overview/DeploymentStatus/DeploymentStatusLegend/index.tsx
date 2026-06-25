import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { PieValueType } from '@mui/x-charts';
import ParticipantsRow from './styles';

type Props = {
  data: PieValueType[];
  onStatusClick: (status: string) => void;
};

const statusByLabel: Record<string, string> = {
  Invited: 'Invited',
  Deploying: 'DeployingDevices',
  Running: 'Running',
  Stopped: 'Stopped',
};

const DeploymentStatusLegend = ({ data, onStatusClick }: Props) => {
  return (
    <Stack direction="column">
      {data.map((entry) => {
        const label = String(entry.label);

        return (
          <ParticipantsRow
            key={entry.id}
            type="button"
            onClick={() => onStatusClick(statusByLabel[label])}
            aria-label={`View ${label} deployments`}
          >
            <Typography
              component="span"
              variant="h3"
              sx={{ color: entry.color }}
              display="flex"
            >
              {entry.value}
            </Typography>
            <Typography
              component="span"
              variant="h3"
              sx={{ color: entry.color }}
              display="flex"
            >
              {label}
            </Typography>
          </ParticipantsRow>
        );
      })}
    </Stack>
  );
};

export default DeploymentStatusLegend;
