import BannerAccountButton from '@Components/Buttons/BannerAccountButton';
import { useStudyDetails } from '@Utils/queries/studies';
import { useSnackbar } from '@Utils/snackbar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import {
  ContentWrapper,
  CustomContainer,
  MenuButton,
  PageWrapper,
  StudyPageBanner,
} from './styles';

interface Props {
  children: ReactNode;
}

const StudyPageLayout = ({ children }: Props) => {
  const { id: studyId } = useParams();
  const { error, isError } = useStudyDetails(studyId);
  const navigate = useNavigate();
  const { setSnackbarError } = useSnackbar();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    // TODO: 404 check?
    if (error) {
      navigate('/studies', { replace: true });
      setSnackbarError('Study was not found!');
    }
  }, [isError, error, navigate, setSnackbarError]);

  return (
    <PageWrapper>
      <NavigationBar
        phoneOpen={navOpen}
        onPhoneClose={() => setNavOpen(false)}
      />
      <ContentWrapper component="main">
        <StudyPageBanner>
          <MenuButton
            size="large"
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation"
            aria-controls="study-navigation"
            aria-expanded={navOpen}
          >
            <MenuRoundedIcon />
          </MenuButton>
          <BannerAccountButton />
        </StudyPageBanner>
        <CustomContainer maxWidth="xl">{children}</CustomContainer>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default StudyPageLayout;
