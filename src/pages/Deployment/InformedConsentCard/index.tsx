import {
  CarpFile,
  InformedConsentType,
  ParticipantDataInput,
} from '@carp-dk/client';
import CarpAccordion from '@Components/CarpAccordion';
import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { Stack, Typography } from '@mui/material';
import { pdf } from '@react-pdf/renderer';
import {
  useGetParticipantData,
  useParticipantGroupsAccountsAndStatus,
} from '@Utils/queries/participants';
import { useDownloadFile, useGetFiles } from '@Utils/queries/studies';
import { convertICToReactPdf, formatDateTime } from '@Utils/utility';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import LoadingSkeleton from '../LoadingSkeleton';
import {
  DownloadButton,
  LastUploadText,
  NameContainer,
  NotRegistedText,
  Right,
  StyledStack,
} from './styles';

const InformedConsentCard = () => {
  const { t } = useTranslation();
  const { id: studyId, deploymentId } = useParams();

  const {
    data: statuses,
    isLoading: statusesLoading,
    error: statusesError,
  } = useParticipantGroupsAccountsAndStatus(studyId);

  const {
    data: participantData,
    isLoading: participatnDataLoading,
    error: participantDataError,
  } = useGetParticipantData(deploymentId);

  const {
    data: files,
    isLoading: filesLoading,
    error: filesError,
  } = useGetFiles(studyId);

  const downloadFileMutation = useDownloadFile(studyId);

  const [consents, setConsents] = useState<
    {
      participant: ParticipantDataInput;
      consent: InformedConsentType;
      consentFile: CarpFile;
    }[]
  >();

  const downloadPdf = async (consent: InformedConsentType) => {
    const blob = await pdf(
      await convertICToReactPdf(JSON.parse(consent.consent)),
    ).toBlob();
    const a = document.createElement('a');
    a.download = 'informedConsent.pdf';
    a.href = globalThis.window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: globalThis.window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const downloadFile = async (consentFile: CarpFile) => {
    await downloadFileMutation.mutateAsync(consentFile);
  };

  useEffect(() => {
    if (statuses && participantData) {
      const participantGroup = statuses.groups.find(
        (s) => s.participantGroupId === deploymentId,
      );
      const commonConsent = participantData.common[
        InformedConsentType.type
      ] as InformedConsentType;
      const roleConsents = Object.entries(participantData.roles).map(
        ([role, v]) => {
          const c = v[InformedConsentType.type] as InformedConsentType;
          return { role, c };
        },
      );

      const participantsWithConsent = participantGroup.participants.map((p) => {
        const consent = roleConsents.find((rc) =>
          p.role.localeCompare(rc.role),
        );
        if (consent)
          return { participant: p, consent: consent.c, consentFile: null };
        if (commonConsent)
          return { participant: p, consent: commonConsent, consentFile: null };
        return { participant: p, consent: null, consentFile: null };
      });

      if (files) {
        const sortedFiles = files.toSorted((a, b) => {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        });
        participantsWithConsent.forEach((p, i) => {
          const file = sortedFiles.find(
            (f) =>
              f.metadata['participant-id'] === p.participant.participantId &&
              f.metadata['document-type'] === 'informed_consent',
          );
          participantsWithConsent[i].consentFile = file;
        });
      }

      setConsents(participantsWithConsent);
    }
  }, [statuses, deploymentId, participantData, files]);

  if (participatnDataLoading || statusesLoading || filesLoading)
    return <LoadingSkeleton />;

  if (participantDataError || statusesError || filesError) {
    return (
      <CarpErrorCardComponent
        message={t('error:informed_consents')}
        error={participantDataError ?? statusesError ?? filesError}
      />
    );
  }

  if (!consents) return null;

  return (
    <CarpAccordion
      isExpanded={true}
      title={t('deployment:informed_consents_card.title')}
    >
      <Stack sx={{ gap: '16px' }}>
        {consents.map(({ participant, consent, consentFile }) => {
          return (
            <StyledStack key={participant.participantId} direction="row">
              <Stack direction="row" sx={{ gap: '4px' }}>
                <PersonIcon fontSize="small" />
                <NameContainer>
                  {(participant.firstName && participant.lastName && (
                    <Typography variant="h4">{`${participant.firstName} ${participant.lastName}`}</Typography>
                  )) || (
                    <Typography variant="h4">
                      {participant.participantId}
                    </Typography>
                  )}
                </NameContainer>
              </Stack>
              <Right>
                {consent && (
                  <DownloadButton onClick={() => downloadPdf(consent)}>
                    <Stack>
                      <Stack
                        direction="row"
                        sx={{
                          gap: '4px',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FileDownloadOutlinedIcon />
                        <Typography variant="h6">
                          {t('common:download_pdf')}
                        </Typography>
                      </Stack>
                      <i>
                        <LastUploadText variant="h5">
                          {t('common:last_uploaded', {
                            date: formatDateTime(
                              consent.signedTimestamp.toString(),
                              {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                              },
                            ),
                          })}
                        </LastUploadText>
                      </i>
                    </Stack>
                  </DownloadButton>
                )}
                {consentFile && (
                  <DownloadButton onClick={() => downloadFile(consentFile)}>
                    <Stack>
                      <Stack
                        direction="row"
                        sx={{
                          gap: '4px',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FileDownloadOutlinedIcon />
                        <Typography variant="h6">
                          {t('common:download_uploaded_file')}
                        </Typography>
                      </Stack>
                      <i>
                        <LastUploadText variant="h5">
                          {t('common:last_uploaded', {
                            date: formatDateTime(
                              consentFile.updated_at.toString(),
                              {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                              },
                            ),
                          })}
                        </LastUploadText>
                      </i>
                    </Stack>
                  </DownloadButton>
                )}
              </Right>
              {!consent && !consentFile && (
                <NotRegistedText variant="h6">
                  {t('deployment:informed_consents_card.not_registered')}
                </NotRegistedText>
              )}
            </StyledStack>
          );
        })}
      </Stack>
    </CarpAccordion>
  );
};

export default InformedConsentCard;
