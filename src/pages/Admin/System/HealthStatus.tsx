import {
  Alert,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useServerInfo } from '@Utils/queries/admin';
import { formatDateTime } from '@Utils/utility';
import { SectionCard } from './styles';

const statusColor = (status: string) => {
  if (status === 'UP') return 'success';
  if (status === 'DOWN' || status === 'OUT_OF_SERVICE') return 'error';
  return 'default';
};

const formatUptime = (seconds: number) => {
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor((seconds % 86_400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

const toMegabytes = (bytes: number) =>
  `${Math.round(bytes / 1024 / 1024).toLocaleString('en-US')} MB`;

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 2 }}>
    <Typography variant="h6" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="h5_web" sx={{ textAlign: 'right' }}>
      {value}
    </Typography>
  </Stack>
);

const HealthStatus = () => {
  const { data: info, isLoading, isError, dataUpdatedAt } = useServerInfo();

  return (
    <SectionCard>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h3">Backend health</Typography>
        {info && (
          <Chip
            label={info.health.status}
            color={statusColor(info.health.status)}
          />
        )}
      </Stack>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
        {info ? `CAWS v${info.version} · ${info.environment} · ` : ''}
        {dataUpdatedAt
          ? `checked ${formatDateTime(dataUpdatedAt)}, refreshes every 30s`
          : ''}
      </Typography>
      {isLoading && <Skeleton height={120} animation="wave" />}
      {isError && (
        <Alert severity="error">
          Could not load server info from the backend.
        </Alert>
      )}
      {info && (
        <>
          <Stack sx={{ gap: 1 }}>
            {Object.entries(info.health.components).map(([name, status]) => (
              <Stack
                key={name}
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography variant="h5">{name}</Typography>
                <Chip size="small" label={status} color={statusColor(status)} />
              </Stack>
            ))}
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack sx={{ gap: 0.5 }}>
            {info.hostname && <DetailRow label="Host" value={info.hostname} />}
            <DetailRow
              label="Uptime"
              value={`${formatUptime(info.uptimeSeconds)}, since ${formatDateTime(info.startedAt)}`}
            />
            <DetailRow
              label="Memory (JVM heap)"
              value={`${toMegabytes(info.jvm.heapUsedBytes)} of ${toMegabytes(info.jvm.heapMaxBytes)}`}
            />
            <DetailRow
              label="Runtime"
              value={`Java ${info.jvm.javaVersion}, ${info.jvm.availableProcessors} CPUs`}
            />
          </Stack>
        </>
      )}
    </SectionCard>
  );
};

export default HealthStatus;
