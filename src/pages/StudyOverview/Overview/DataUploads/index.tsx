import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStudyDataUploads } from '@Utils/queries/studies';
import { useParams } from 'react-router-dom';
import {
  Activity,
  FigureLabel,
  Figures,
  FigureValue,
  LegendDot,
  StyledCard,
  StyledDescription,
  StyledTitle,
  Top,
} from './styles';

const HOUR_MS = 3_600_000;
const DAY_MS = 24 * HOUR_MS;

const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

/** "3 minutes ago", "yesterday"; past a month the date itself ("12 May 2025") says more. */
const formatLastUpload = (date: Date, ms: number) => {
  const minutes = Math.round(ms / 60_000);
  if (minutes < 60) return relative.format(-minutes, 'minute');
  if (ms < DAY_MS) return relative.format(-Math.round(ms / HOUR_MS), 'hour');
  const days = Math.round(ms / DAY_MS);
  if (days < 30) return relative.format(-days, 'day');
  return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
};

/** Whether the study is still receiving data, judged by its latest upload. */
const DataUploads = () => {
  const { id: studyId } = useParams();
  const theme = useTheme();
  const { data, dataUpdatedAt, isLoading, error } =
    useStudyDataUploads(studyId);

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        height={160}
        sx={{ borderRadius: '16px' }}
      />
    );
  }
  if (error) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading data uploads"
        error={error}
      />
    );
  }

  const lastUpload = data.lastDataUploadAt && new Date(data.lastDataUploadAt);
  // Measured from when the figures were fetched, so render stays pure.
  const sinceLastUpload = lastUpload
    ? Math.max(0, dataUpdatedAt - lastUpload.getTime())
    : null;

  const levels = [
    {
      label: 'Active',
      description: 'Data uploaded in the last 24 hours.',
      color: theme.palette.status.green,
    },
    {
      label: 'Quiet',
      description: 'Data uploaded in the last 7 days, but not the last 24 hours.',
      color: theme.palette.status.yellow,
    },
    {
      label: 'Inactive',
      description: 'No data uploaded for more than 7 days.',
      color: theme.palette.status.red,
    },
    {
      label: 'No data yet',
      description: 'Nothing has been uploaded to the study.',
      color: theme.palette.status.grey,
    },
  ];
  const [active, quiet, inactive, noData] = levels;
  let activity = inactive;
  if (sinceLastUpload == null) activity = noData;
  else if (sinceLastUpload < DAY_MS) activity = active;
  else if (sinceLastUpload < 7 * DAY_MS) activity = quiet;

  return (
    <StyledCard elevation={2}>
      <Top>
        <div>
          <StyledTitle variant="h2">Data uploads</StyledTitle>
          <StyledDescription variant="h6">
            Across all deployed participant groups
          </StyledDescription>
        </div>
        <Tooltip
          title={
            <Stack direction="column" spacing="12px">
              {levels.map((level) => (
                <Stack
                  key={level.label}
                  direction="row"
                  sx={{ alignItems: 'baseline', gap: '4px' }}
                >
                  <LegendDot color={level.color} />
                  <Typography variant="h5">
                    {level.label}: {level.description}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          }
          placement="right-start"
          slotProps={{
            tooltip: {
              sx: {
                color: 'text.primary',
                backgroundColor: 'common.white',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              },
            },
          }}
        >
          <Activity color={activity.color}>
            <FigureLabel variant="h6" sx={{ color: 'inherit' }}>
              {activity.label}
            </FigureLabel>
            <InfoOutlinedIcon sx={{ fontSize: 16, color: 'grey.500' }} />
          </Activity>
        </Tooltip>
      </Top>
      <Figures>
        <div>
          <FigureValue variant="h1">
            {data.measurementCount.toLocaleString()}
          </FigureValue>
          <FigureLabel variant="h6">data points</FigureLabel>
        </div>
        <div>
          <FigureValue variant="h1">
            {data.dataStreamCount.toLocaleString()}
          </FigureValue>
          <FigureLabel variant="h6">data streams</FigureLabel>
        </div>
        <div>
          <FigureValue variant="h1">
            {lastUpload ? (
              <Tooltip title={lastUpload.toLocaleString()}>
                <span>{formatLastUpload(lastUpload, sinceLastUpload)}</span>
              </Tooltip>
            ) : (
              '–'
            )}
          </FigureValue>
          <FigureLabel variant="h6">last upload</FigureLabel>
        </div>
      </Figures>
    </StyledCard>
  );
};

export default DataUploads;
