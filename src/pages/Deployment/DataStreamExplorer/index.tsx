import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button, IconButton, MenuItem, Select, Skeleton } from '@mui/material';
import { useParticipantGroupsAccountsAndStatus } from '@Utils/queries/participants';
import { useStudyDetails } from '@Utils/queries/studies';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getExpectedStreams } from './helper';
import StreamSection from './StreamSection';
import {
  Controls,
  StyledContainer,
  StyledTitle,
  WindowLabel,
  WindowNav,
} from './styles';
import { CHART_HEIGHT } from './views/common';

const RANGES = {
  '24h': { hours: 24, bucket: 'hour' },
  '7d': { hours: 24 * 7, bucket: 'day' },
  '30d': { hours: 24 * 30, bucket: 'day' },
} as const;
type RangeKey = keyof typeof RANGES;

const HOUR_MS = 3_600_000;

/** The end of that day, or now if that's earlier, so a jump shows the whole day's uploads. */
const endOfDayUntilNow = (d: Date) => {
  const end = new Date(d);
  end.setHours(23, 59, 59, 999);
  return end.getTime() > Date.now() ? new Date() : end;
};

const DataStreamExplorer = () => {
  const { t } = useTranslation();
  const { id: studyId, deploymentId } = useParams();
  const { data: studyDetails, isLoading: studyLoading } =
    useStudyDetails(studyId);
  // Same query (and cache entry) as the page header uses to name the deployment.
  const { data: participantGroups } = useParticipantGroupsAccountsAndStatus(
    studyId,
    { page: 0, size: 1, search: deploymentId },
  );

  const streams = useMemo(
    () => getExpectedStreams(studyDetails?.protocolSnapshot),
    [studyDetails],
  );
  const [rangeKey, setRangeKey] = useState<RangeKey>('7d');
  // The window shown is [end - range, end]; it starts at now and moves with the arrows.
  // atNow: the window ends at the present, so there's nothing newer to step forward to.
  const [windowEnd, setWindowEnd] = useState(() => ({ end: new Date(), atNow: true }));
  const { end, atNow } = windowEnd;
  const setEnd = (d: Date) => setWindowEnd({ end: d, atNow: false });
  const goToNow = () => setWindowEnd({ end: new Date(), atNow: true });

  const range = RANGES[rangeKey];
  const rangeMs = range.hours * HOUR_MS;
  const from = useMemo(() => new Date(end.getTime() - rangeMs), [end, rangeMs]);
  const to = end;

  // The participants' last upload to this deployment, from any of its streams. The backend
  // doesn't expose it per stream, so some streams may have nothing on that day.
  const lastUpload = useMemo(() => {
    const group = participantGroups?.groups?.find(
      (g) => g.participantGroupId === deploymentId,
    );
    const times = (group?.participants ?? [])
      .map((p) => (p.dateOfLastDataUpload ? new Date(String(p.dateOfLastDataUpload)) : null))
      .filter((d): d is Date => d !== null && !Number.isNaN(d.getTime()))
      .map((d) => d.getTime());
    return times.length > 0 ? new Date(Math.max(...times)) : undefined;
  }, [participantGroups, deploymentId]);

  if (studyLoading) {
    return (
      <StyledContainer>
        <StyledTitle variant="h2">{t('deployment:data_streams_card.title')}</StyledTitle>
        <Skeleton variant="rectangular" height={CHART_HEIGHT} animation="wave" />
      </StyledContainer>
    );
  }

  if (streams.length === 0) return null;

  const stepBack = () => setEnd(new Date(end.getTime() - rangeMs));
  const stepForward = () => {
    const next = end.getTime() + rangeMs;
    if (next >= Date.now()) goToNow();
    else setEnd(new Date(next));
  };

  const formatEdge = (d: Date) =>
    range.bucket === 'hour'
      ? d.toLocaleString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
      : d.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <StyledContainer>
      <StyledTitle variant="h2">{t('deployment:data_streams_card.title')}</StyledTitle>
      <Controls elevation={2}>
          <Select
            size="small"
            value={rangeKey}
            onChange={(e) => setRangeKey(e.target.value as RangeKey)}
          >
            {Object.keys(RANGES).map((key) => (
              <MenuItem key={key} value={key}>
                {t(`deployment:data_streams_card.range_${key}`)}
              </MenuItem>
            ))}
          </Select>
          <WindowNav>
            <IconButton
              size="small"
              onClick={stepBack}
              aria-label={t('deployment:data_streams_card.previous')}
            >
              <ChevronLeft />
            </IconButton>
            <WindowLabel>
              {formatEdge(from)} – {formatEdge(to)}
            </WindowLabel>
            <IconButton
              size="small"
              onClick={stepForward}
              disabled={atNow}
              aria-label={t('deployment:data_streams_card.next')}
            >
              <ChevronRight />
            </IconButton>
          </WindowNav>
          <Button
            size="small"
            variant="outlined"
            disabled={!lastUpload}
            onClick={() => setEnd(endOfDayUntilNow(lastUpload))}
            title={
              lastUpload
                ? t('deployment:data_streams_card.latest_data_hint', {
                    date: lastUpload.toLocaleString(),
                    // A title attribute shows text as-is, so don't HTML-escape the date.
                    interpolation: { escapeValue: false },
                  })
                : t('deployment:data_streams_card.no_uploads')
            }
          >
            {t('deployment:data_streams_card.latest_data')}
          </Button>
          <Button size="small" disabled={atNow} onClick={goToNow}>
            {t('deployment:data_streams_card.today')}
          </Button>
      </Controls>
      {streams.map((s) => (
        <StreamSection
          key={`${s.deviceRoleName}|${s.dataType}`}
          deploymentId={deploymentId}
          deviceRoleName={s.deviceRoleName}
          dataType={s.dataType}
          from={from}
          to={to}
          bucket={range.bucket}
        />
      ))}
    </StyledContainer>
  );
};

export default DataStreamExplorer;
