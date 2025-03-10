import Logo from "@Components/Logo";
import AnnouncementRoundedIcon from "@mui/icons-material/AnnouncementRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import DeploymentsIcon from "@mui/icons-material/Groups";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import LanguageIcon from "@mui/icons-material/Language";
import ParticipantsIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import { List, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBarItem from "./NavigationBarItem";
import {
  Container,
  LogoWrapper,
  MinimizeButton,
  MinimizeWrapper,
  SectionTitle,
  StyledBackdrop,
  StyledDivider,
} from "./styles";

const NavigationBar = () => {
  const { id: currentStudyId } = useParams();
  const isLarge = useMediaQuery("(min-width: 1540px)");
  const studyPath = `/studies/${currentStudyId}`;
  let currentWidth = window.innerWidth;
  let lastChangedWidth = currentWidth;
  const breakpoint = 1540;
  const [open, setOpen] = useState(currentWidth >= breakpoint);

  const handleWidthChange = () => {
    currentWidth = window.innerWidth;
    if (currentWidth >= breakpoint && lastChangedWidth < breakpoint) {
      setOpen(true);
      lastChangedWidth = currentWidth;
    } else if (currentWidth < breakpoint && lastChangedWidth >= breakpoint) {
      setOpen(false);
      lastChangedWidth = currentWidth;
    }
  };

  window.addEventListener("resize", handleWidthChange);

  return (
    <>
      <Container
        variant="permanent"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <LogoWrapper open={open}>
          <Logo type="flat-white" />
        </LogoWrapper>
        <SectionTitle open={open}>Study</SectionTitle>
        <List>
          <NavigationBarItem
            text="Overview"
            path={`${studyPath}/overview`}
            icon={<DashboardIcon />}
            showTooltip={!open}
          />
          <NavigationBarItem
            text="Settings"
            path={`${studyPath}/settings`}
            icon={<SettingsIcon />}
            showTooltip={!open}
          />
          <NavigationBarItem
            text="Protocol"
            path={`${studyPath}/protocol`}
            icon={<InsertDriveFileIcon />}
            showTooltip={!open}
          />
          <NavigationBarItem
            text="Resources"
            path={`${studyPath}/resources`}
            icon={<SecurityIcon />}
            showTooltip={!open}
          />
          <NavigationBarItem
            text="Translation"
            path={`${studyPath}/translations`}
            icon={<LanguageIcon />}
            showTooltip={!open}
          />
        </List>
        <StyledDivider open={open} />
        <SectionTitle open={open}>Recruitment</SectionTitle>
        <List>
          <NavigationBarItem
            text="Participants"
            path={`${studyPath}/participants`}
            exact
            icon={<ParticipantsIcon />}
            showTooltip={!open}
          />
        </List>
        <StyledDivider open={open} />
        <SectionTitle open={open}>Run</SectionTitle>
        <List>
          <NavigationBarItem
            text="Deployments"
            path={`${studyPath}/deployments`}
            icon={<DeploymentsIcon />}
            showTooltip={!open}
          />
          <NavigationBarItem
            text="Announcements"
            path={`${studyPath}/announcements`}
            icon={<AnnouncementRoundedIcon />}
            showTooltip={!open}
          />
          <NavigationBarItem
            text="Exports"
            path={`${studyPath}/export`}
            icon={<DownloadForOfflineRoundedIcon />}
            showTooltip={!open}
          />
        </List>
        <MinimizeWrapper open={open}>
          <MinimizeButton onClick={() => setOpen(!open)} open={open}>
            <KeyboardArrowLeftRoundedIcon />
          </MinimizeButton>
        </MinimizeWrapper>
      </Container>
      <StyledBackdrop open={open && !isLarge} onClick={() => setOpen(false)} />
    </>
  );
};
export default NavigationBar;
