import CarpAccordion from '@Components/CarpAccordion';
import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import { Skeleton } from '@mui/material';
import { useDataStreamByTime } from '@Utils/queries/dataStreams';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDataType, getPoints } from './helper';
import { Body, Note } from './styles';
import StreamView from './views';
import { CHART_HEIGHT } from './views/common';
import { Bucket } from './views/shapes';

type Props = {
  deploymentId: string;
  deviceRoleName: string;
  dataType: string;
  from: Date;
  to: Date;
  bucket: Bucket;
};

/** One data stream of the deployment over the shared window, in its own section. */
const StreamSection = ({ deploymentId, deviceRoleName, dataType, from, to, bucket }: Props) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useDataStreamByTime({
    deploymentId,
    deviceRoleName,
    dataType,
    from,
    to,
  });

  // The endpoint selects by upload time and returns whole sequences, so a batch can hold
  // points measured outside the window. Keep the chart to the window and say what was left out.
  const { inRange, outOfRange } = useMemo(() => {
    const all = data ? getPoints(data) : [];
    const kept = all.filter((p) => p.time >= from && p.time <= to);
    return { inRange: kept, outOfRange: all.length - kept.length };
  }, [data, from, to]);

  const name = formatDataType(dataType);
  const title = name.charAt(0).toUpperCase() + name.slice(1);

  const renderBody = () => {
    if (isLoading) {
      return (
        <Skeleton
          sx={{ borderRadius: '10px' }}
          variant="rectangular"
          height={CHART_HEIGHT}
          animation="wave"
        />
      );
    }
    if (error) {
      return (
        <CarpErrorCardComponent
          message={t('deployment:data_streams_card.error')}
          error={error}
        />
      );
    }
    const outOfRangeNote = outOfRange > 0 && (
      <Note variant="h6">
        {t('deployment:data_streams_card.out_of_range', { count: outOfRange })}
      </Note>
    );
    if (inRange.length === 0) {
      return (
        <>
          <Note variant="h6">{t('deployment:data_streams_card.empty')}</Note>
          {outOfRangeNote}
        </>
      );
    }
    return (
      <>
        <StreamView
          dataType={dataType}
          points={inRange}
          from={from}
          to={to}
          bucket={bucket}
        />
        {outOfRangeNote}
      </>
    );
  };

  return (
    <CarpAccordion
      title={title}
      description={`${deviceRoleName} · ${dataType}`}
      isExpanded
    >
      <Body>{renderBody()}</Body>
    </CarpAccordion>
  );
};

export default StreamSection;
