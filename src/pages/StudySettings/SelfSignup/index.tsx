import { StudyStatus } from '@carp-dk/client';
import CopyButton from '@Components/Buttons/CopyButton';
import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import DeleteConfirmationModal from '@Components/DeleteConfirmationModal';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import { Typography } from '@mui/material';
import {
  useEndSelfSignup,
  useSelfSignupConfig,
  useStudyDetails,
  useStudyStatus,
} from '@Utils/queries/studies';
import { getApplicationName } from '@Utils/utility';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StudySetupSkeleton from '../StudySetupSkeleton';
import { getSignupCodeUrl } from './appsites';
import QrCode from './QrCode';
import SelfSignupModal from './SelfSignupModal';
import {
  ActionButton,
  ButtonsContainer,
  Detail,
  DetailLabel,
  DetailsContainer,
  DetailValue,
  EmptyText,
  Heading,
  ShortCode,
  ShortCodeRow,
  StatusDot,
  StatusRow,
  StyledCard,
  Subheading,
  Top,
} from './styles';

const SelfSignup = () => {
  const { id: studyId } = useParams();
  const {
    data: studyStatus,
    isLoading: studyStatusLoading,
    error: studyStatusError,
  } = useStudyStatus(studyId);
  const {
    data: studyDetails,
    isLoading: studyDetailsLoading,
    error: studyDetailsError,
  } = useStudyDetails(studyId);
  const isLive = studyStatus instanceof StudyStatus.Live;
  const {
    data: config,
    isLoading: configLoading,
    error: configError,
  } = useSelfSignupConfig(studyId, isLive);
  const endSelfSignup = useEndSelfSignup(studyId);

  const [openSetupModal, setOpenSetupModal] = useState(false);
  const [openEndConfirmationModal, setOpenEndConfirmationModal] =
    useState(false);

  if (studyStatusLoading || studyDetailsLoading || configLoading)
    return <StudySetupSkeleton />;

  if (studyStatusError || studyDetailsError || configError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading self sign-up"
        error={studyStatusError ?? studyDetailsError ?? configError}
      />
    );
  }

  // Only apps that declare an `applicationName` on their protocol support self
  // sign-up. No protocol means no application data, so this also covers the
  // "protocol not set" case.
  const applicationName = getApplicationName(
    studyDetails.protocolSnapshot?.applicationData,
  );
  if (!applicationName) return null;

  // The service only accepts a self-signup config once the study is live.
  const canConfigure = isLive;
  const lockReason = isLive
    ? null
    : 'Self sign-up becomes available once the study is live.';

  // A config that exists but is not enabled was ended before; re-enabling it
  // resumes under the same short code.
  const setupLabel = (() => {
    if (!config) return 'Set up self sign-up';
    return config.enabled ? 'Edit' : 'Re-enable';
  })();

  const signupUrl = config
    ? getSignupCodeUrl(applicationName, config.shortCode)
    : null;

  const handleEndSelfSignup = () => {
    setOpenEndConfirmationModal(false);
    endSelfSignup.mutate();
  };

  return (
    <StyledCard elevation={2} isDisabled={!canConfigure}>
      <Top>
        <div>
          <Heading disabled={!canConfigure} variant="h2">
            Self sign-up
          </Heading>
          <Subheading disabled={!canConfigure} variant="h6">
            Share a short code so participants can join the study themselves,
            without being invited one by one.
          </Subheading>
        </div>
        <ButtonsContainer>
          {config?.enabled && (
            <ActionButton
              disabled={!canConfigure || endSelfSignup.isPending}
              onClick={() => setOpenEndConfirmationModal(true)}
            >
              <Typography variant="h5">End sign-up</Typography>
            </ActionButton>
          )}
          <ActionButton
            disabled={!canConfigure}
            onClick={() => setOpenSetupModal(true)}
          >
            <HowToRegRoundedIcon fontSize="small" />
            <Typography variant="h5">{setupLabel}</Typography>
          </ActionButton>
        </ButtonsContainer>
      </Top>

      {lockReason ? (
        <EmptyText variant="h5">{lockReason}</EmptyText>
      ) : !config ? (
        <EmptyText variant="h5">
          Self sign-up has not been set up for this study yet.
        </EmptyText>
      ) : (
        <DetailsContainer>
          <Detail>
            <DetailLabel variant="h6">Short code</DetailLabel>
            <ShortCodeRow>
              <ShortCode variant="h4">{config.shortCode}</ShortCode>
              <CopyButton textToCopy={config.shortCode} idType="Short code" />
            </ShortCodeRow>
          </Detail>
          <Detail>
            <DetailLabel variant="h6">Status</DetailLabel>
            <StatusRow>
              <StatusDot isLive={config.enabled} />
              <DetailValue variant="h4">
                {config.enabled ? 'Live' : 'Ended'}
              </DetailValue>
            </StatusRow>
          </Detail>
          <Detail>
            <DetailLabel variant="h6">Role</DetailLabel>
            <DetailValue variant="h4">{config.participantRoleName}</DetailValue>
          </Detail>
          <Detail>
            <DetailLabel variant="h6">Signed up</DetailLabel>
            <DetailValue variant="h4">
              {config.maxParticipants
                ? `${config.currentParticipantCount} / ${config.maxParticipants}`
                : config.currentParticipantCount}
            </DetailValue>
          </Detail>
          {signupUrl && (
            <Detail>
              <DetailLabel variant="h6">QR</DetailLabel>
              <QrCode
                url={signupUrl}
                shortCode={config.shortCode}
                isLive={config.enabled}
              />
            </Detail>
          )}
        </DetailsContainer>
      )}

      {canConfigure && openSetupModal && (
        <SelfSignupModal
          open={openSetupModal}
          onClose={() => setOpenSetupModal(false)}
          studyId={studyId}
          studyDetails={studyDetails}
          config={config}
        />
      )}
      <DeleteConfirmationModal
        open={openEndConfirmationModal}
        onClose={() => setOpenEndConfirmationModal(false)}
        onConfirm={handleEndSelfSignup}
        title="End self sign-up"
        description="No new participants will be able to join with the short code. Participants who already signed up keep their access."
        boldText="The short code and sign-up count are kept, so you can re-enable it later."
        checkboxLabel="I'm sure I want to end it"
        actionButtonLabel="End"
      />
    </StyledCard>
  );
};

export default SelfSignup;
