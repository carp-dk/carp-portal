import { Button } from '@mui/material';
import { formatDate } from '@Utils/utility';
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
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (e) {
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
  return (
    <AnnouncementLeft>
      <AnnouncementHeader>
        <AnnouncementDate variant="h5">
          {formatDate(new Date().toISOString())}
        </AnnouncementDate>
        <AnnouncementType
          label={type || <i>no type yet</i>}
          color="primary"
          size="small"
        />
      </AnnouncementHeader>
      {file != null && file instanceof File
        ? (
            <img src={URL.createObjectURL(file)} alt="Announcement" />
          )
        : (
            <img src={file as string} alt="Announcement" />
          )}
      <AnnouncementTitle variant="h2">
        {!title ? <i>No title yet</i> : title.trim()}
      </AnnouncementTitle>
      {subTitle && (
        <AnnouncementSubtitle variant="subtitle1">
          {subTitle?.trim()}
        </AnnouncementSubtitle>
      )}
      <AnnouncementMessage variant="body1">
        {!message ? <i>No message yet</i> : message.trim()}
      </AnnouncementMessage>
      {url && extractHostname(url) && (
        <Button>
          View more (
          {extractHostname(url)}
          )
        </Button>
      )}
    </AnnouncementLeft>
  );
};

export default StudyAnnouncementPreview;
