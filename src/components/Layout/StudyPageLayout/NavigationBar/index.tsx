import Logo from '@Components/Logo';
import AnnouncementRoundedIcon from '@mui/icons-material/AnnouncementRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import DeploymentsIcon from '@mui/icons-material/Groups';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ParticipantsIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { List, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBarItem from './NavigationBarItem';
import {
  Container,
  LogoWrapper,
  MinimizeButton,
  MinimizeWrapper,
  PhoneContainer,
  SectionTitle,
  StyledBackdrop,
  StyledDivider,
} from './styles';

type Props = {
  phoneOpen: boolean;
  onPhoneClose: () => void;
};

const NavigationBar = ({ phoneOpen, onPhoneClose }: Props) => {
  const { id: currentStudyId } = useParams();
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const isLarge = useMediaQuery('(min-width: 1540px)');
  const studyPath = `/studies/${currentStudyId}`;
  const breakpoint = 1540;
  const [open, setOpen] = useState(window.innerWidth >= breakpoint);

  useEffect(() => {
    let currentWidth = window.innerWidth;
    let lastChangedWidth = currentWidth;

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

    window.addEventListener('resize', handleWidthChange);

    return () => {
      window.removeEventListener('resize', handleWidthChange);
    };
  }, [breakpoint]);

  const renderLinks = (expanded: boolean, onNavigate?: () => void) => (
    <>
      <LogoWrapper open={expanded}>
        <Logo type="flat-white" />
      </LogoWrapper>
      <SectionTitle open={expanded}>Study</SectionTitle>
      <List>
        <NavigationBarItem
          text="Overview"
          path={`${studyPath}/overview`}
          icon={<DashboardIcon />}
          showTooltip={!expanded}
          onClick={onNavigate}
        />
        <NavigationBarItem
          text="Settings"
          path={`${studyPath}/settings`}
          icon={<SettingsIcon />}
          showTooltip={!expanded}
          onClick={onNavigate}
        />
        <NavigationBarItem
          text="Resources"
          path={`${studyPath}/resources`}
          icon={<InsertDriveFileIcon />}
          showTooltip={!expanded}
          onClick={onNavigate}
        />
      </List>
      <StyledDivider open={expanded} />
      <SectionTitle open={expanded}>Recruitment</SectionTitle>
      <List>
        <NavigationBarItem
          text="Participants"
          path={`${studyPath}/participants`}
          exact
          icon={<ParticipantsIcon />}
          showTooltip={!expanded}
          onClick={onNavigate}
        />
      </List>
      <StyledDivider open={expanded} />
      <SectionTitle open={expanded}>Run</SectionTitle>
      <List>
        <NavigationBarItem
          text="Deployments"
          path={`${studyPath}/deployments`}
          icon={<DeploymentsIcon />}
          showTooltip={!expanded}
          onClick={onNavigate}
        />
        <NavigationBarItem
          text="Announcements"
          path={`${studyPath}/announcements`}
          icon={<AnnouncementRoundedIcon />}
          showTooltip={!expanded}
          onClick={onNavigate}
        />
        <NavigationBarItem
          text="Exports"
          path={`${studyPath}/export`}
          icon={<DownloadForOfflineRoundedIcon />}
          showTooltip={!expanded}
          onClick={onNavigate}
        />
      </List>
    </>
  );

  if (isPhone) {
    return (
      <PhoneContainer
        id="study-navigation"
        variant="temporary"
        anchor="left"
        open={phoneOpen}
        onClose={onPhoneClose}
      >
        {renderLinks(true, onPhoneClose)}
      </PhoneContainer>
    );
  }

  return (
    <>
      <Container
        variant="permanent"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        {renderLinks(open)}
        <MinimizeWrapper open={open}>
          <MinimizeButton
            onClick={() => setOpen(!open)}
            open={open}
            aria-label={open ? 'Collapse navigation' : 'Expand navigation'}
            aria-expanded={open}
          >
            <KeyboardArrowLeftRoundedIcon />
          </MinimizeButton>
        </MinimizeWrapper>
      </Container>
      <StyledBackdrop open={open && !isLarge} onClick={() => setOpen(false)} />
    </>
  );
};
export default NavigationBar;
