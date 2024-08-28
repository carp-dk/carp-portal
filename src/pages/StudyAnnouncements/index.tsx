import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import StudyPageLayout from "@Components/Layout/StudyPageLayout";
import StudyHeader from "@Components/StudyHeader";
import StyledTooltip from "@Components/StyledTooltip";
import { useStudyAnnouncements } from "@Utils/queries/studies";
import { MessageData } from "@carp-dk/client";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import StudyAnnouncement, {
  StudyAnnouncmentSkeleton,
} from "./StudyAnnouncement";
import { AnnouncementsContainer, StyledFab } from "./styles";

const StudyAnnouncements = () => {
  const { id: studyId } = useParams();
  const {
    data: announcements,
    isLoading,
    error,
  } = useStudyAnnouncements(studyId);
  const navigate = useNavigate();

  const goToNewAnnouncement = () => {
    navigate(`/studies/${studyId}/announcements/new`);
  };

  if (error && error.code !== 404) {
    return (
      <StudyPageLayout>
        <StudyHeader
          path={["Announcements"]}
          description="View announcements created by researchers for this study"
        />
        <CarpErrorCardComponent
          message="An error occurred while loading announcements"
          error={error}
        />
      </StudyPageLayout>
    );
  }

  return (
    <StudyPageLayout>
      <StudyHeader
        path={["Announcements"]}
        description="View announcements created by researchers for this study"
      />
      <AnnouncementsContainer>
        {isLoading
          ? [1, 2, 3].map(() => <StudyAnnouncmentSkeleton key={uuidv4()} />)
          : announcements?.documents.map((announcement) => (
              <StudyAnnouncement
                announcement={announcement.data as MessageData}
                announcementId={announcement.id}
                key={announcement.id}
                studyId={studyId}
              />
            ))}
      </AnnouncementsContainer>
      <StyledTooltip title="Make new announcement">
        <StyledFab color="primary" onClick={goToNewAnnouncement}>
          <AddIcon />
        </StyledFab>
      </StyledTooltip>
    </StudyPageLayout>
  );
};

export default StudyAnnouncements;
