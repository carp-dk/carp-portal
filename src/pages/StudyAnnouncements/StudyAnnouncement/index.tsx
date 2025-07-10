import StyledTooltip from '@Components/StyledTooltip';
import { useDeleteStudyAnnouncement } from '@Utils/queries/studies';
import { formatDate, getRandomNumber } from '@Utils/utility';
import { MessageData } from '@carp-dk/client';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Collapse, IconButton, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeletionPrompt from '../../../components/Dialogs/DeletionPrompt';
import {
  AnnouncementActions,
  AnnouncementDate,
  AnnouncementHeader,
  AnnouncementLeft,
  AnnouncementMessage,
  AnnouncementSubtitle,
  AnnouncementTitle,
  AnnouncementType,
  CollapseWrapper,
  StyledAlert,
} from './styles';

type Props = {
  studyId: string;
  announcement: MessageData;
  announcementId: string;
};

const StudyAnnouncment = ({ studyId, announcement, announcementId }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const deleteAnnouncement = useDeleteStudyAnnouncement();
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const doDelete = () => {
    deleteAnnouncement.mutate({
      studyId,
      announcementId,
    });
  };

  useEffect(() => {
    if (deleteAnnouncement.isSuccess) {
      hideDeleteModal();
    }
  }, [deleteAnnouncement.isSuccess]);

  return (
    <StyledAlert elevation={2} variant="outlined">
      <AnnouncementLeft>
        <AnnouncementHeader>
          <AnnouncementDate variant="h5">
            {formatDate(announcement.timestamp.toString())}
          </AnnouncementDate>
          <AnnouncementType
            label={announcement.type}
            color="primary"
            size="small"
          />
          <AnnouncementActions>
            <StyledTooltip title="Edit">
              <IconButton
                onClick={() =>
                  navigate(
                    `/studies/${studyId}/announcements/${announcementId}/edit`,
                  )}
              >
                <EditIcon />
              </IconButton>
            </StyledTooltip>
            <StyledTooltip title="Delete announcement">
              <IconButton color="error" onClick={showDeleteModal}>
                <DeleteIcon />
              </IconButton>
            </StyledTooltip>
          </AnnouncementActions>
        </AnnouncementHeader>
        {announcement.image && (
          <img src={announcement.image} alt="announcement preview" />
        )}
        <AnnouncementTitle variant="h2">{announcement.title}</AnnouncementTitle>
        {announcement.sub_title ?? (
          <AnnouncementSubtitle variant="subtitle1">
            {announcement.sub_title}
          </AnnouncementSubtitle>
        )}
        {announcement.message.length > 200 ?
            (
              <CollapseWrapper>
                <Collapse in={expanded} collapsedSize={186}>
                  <AnnouncementMessage variant="body1">
                    {announcement.message}
                  </AnnouncementMessage>
                </Collapse>
                <Button
                  onClick={handleExpandClick}
                  startIcon={expanded ?
                      <ExpandLessIcon /> :
                      <ExpandMoreIcon />}
                >
                  {expanded ?
                    'Show less' :
                    'Show more'}
                </Button>
              </CollapseWrapper>
            ) :
            (
              <AnnouncementMessage variant="body1">
                {announcement.message}
              </AnnouncementMessage>
            )}
        {announcement.url && (
          <Button>
            View more (
            {new URL(announcement.url).hostname}
            )
          </Button>
        )}
      </AnnouncementLeft>
      <DeletionPrompt
        open={deleteModalVisible}
        onClose={hideDeleteModal}
        action={doDelete}
        loading={deleteAnnouncement.isPending}
        title="Delete this announcement?"
        description="Are you sure you want to delete this announcement? This action cannot be undone."
      />
    </StyledAlert>
  );
};

export const StudyAnnouncmentSkeleton = () => {
  return (
    <StyledAlert isSkeleton elevation={2} variant="outlined">
      <AnnouncementLeft>
        <AnnouncementHeader>
          <Skeleton animation="wave" variant="text" width={60} />
          <Skeleton
            animation="wave"
            variant="rounded"
            width={`${getRandomNumber(80, 130)}px`}
          />
          <AnnouncementActions>
            <IconButton disabled onClick={() => {}}>
              <EditIcon />
            </IconButton>
            <IconButton disabled color="error" onClick={() => {}}>
              <DeleteIcon />
            </IconButton>
          </AnnouncementActions>
        </AnnouncementHeader>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={`${getRandomNumber(300, 500)}px`}
        />
        <AnnouncementTitle variant="h2">
          <Skeleton animation="wave" variant="text" width={100} />
        </AnnouncementTitle>
        <AnnouncementSubtitle variant="subtitle1">
          <Skeleton animation="wave" variant="text" width={100} />
        </AnnouncementSubtitle>
        <AnnouncementMessage variant="body1">
          <Skeleton
            animation="wave"
            variant="rounded"
            width="100%"
            height={`${getRandomNumber(50, 100)}px`}
          />
        </AnnouncementMessage>
      </AnnouncementLeft>
    </StyledAlert>
  );
};

export default StudyAnnouncment;
