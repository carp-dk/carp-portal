import BannerAccountButton from '@Components/Buttons/BannerAccountButton';
import { useStudyDetails } from '@Utils/queries/studies';
import { useSnackbar } from '@Utils/snackbar';
import { ReactNode, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import {
  ContentWrapper,
  CustomContainer,
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

  useEffect(() => {
    // TODO: 404 check?
    if (error) {
      navigate('/studies', { replace: true });
      setSnackbarError('Study was not found!');
    }
  }, [isError, error]);

  return (
    <PageWrapper>
      <NavigationBar />
      <ContentWrapper component="main">
        <StudyPageBanner>
          <BannerAccountButton />
        </StudyPageBanner>
        <CustomContainer maxWidth="xl">{children}</CustomContainer>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default StudyPageLayout;
