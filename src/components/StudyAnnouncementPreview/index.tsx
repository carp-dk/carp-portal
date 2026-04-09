import { Button } from '@mui/material';
import { formatDate } from '@Utils/utility';
import { useMemo } from 'react';
import {
  AnnouncementDate,
  AnnouncementHeader,
  AnnouncementLeft,
  AnnouncementMessage,
  AnnouncementSubtitle,
  AnnouncementTitle,
  AnnouncementType,
} from './styles';

type Props = {
  type: string;
  title: string;
  subTitle?: string;
  message: string;
  file?: File | string;
  url?: string;
};

const extractHostname = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
};

const StudyAnnouncementPreview = ({
  type,
  title,
  subTitle,
  message,
  file,
  url,
}: Props) => {
  const currentDate = useMemo(() => new Date().toISOString(), []);
  const imageUrl = useMemo(
    () =>
      file != null && file instanceof File
        ? URL.createObjectURL(file)
        : (file as string),
    [file],
  );

  return (
    <AnnouncementLeft>
      <AnnouncementHeader>
        <AnnouncementDate variant="h5">
          {formatDate(currentDate)}
        </AnnouncementDate>
        <AnnouncementType
          label={type || <i>no type yet</i>}
          color="primary"
          size="small"
        />
      </AnnouncementHeader>
      <img src={imageUrl} alt="Announcement" />
      <AnnouncementTitle variant="h2">
        {title ? title.trim() : <i>No title yet</i>}
      </AnnouncementTitle>
      {subTitle && (
        <AnnouncementSubtitle variant="subtitle1">
          {subTitle?.trim()}
        </AnnouncementSubtitle>
      )}
      <AnnouncementMessage variant="body1">
        {message ? message.trim() : <i>No message yet</i>}
      </AnnouncementMessage>
      {url && extractHostname(url) && (
        <Button>View more ({extractHostname(url)})</Button>
      )}
    </AnnouncementLeft>
  );
};

export default StudyAnnouncementPreview;
