import { ParticipantGroup } from '@carp-dk/client';
import CopyButton from '@Components/Buttons/CopyButton';
import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import DeleteConfirmationModal from '@Components/DeleteConfirmationModal';
import { Check, Close, EditOutlined, Stop } from '@mui/icons-material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import {
  useParticipantGroupsAccountsAndStatus,
  useStopParticipantGroup,
  useUpdateParticipantGroup,
} from '@Utils/queries/participants';
import { useCreateSummary } from '@Utils/queries/studies';
import { formatDateTime, getDeploymentDisplayName } from '@Utils/utility';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import LoadingSkeleton from '../LoadingSkeleton';
import {
  ExportButton,
  Left,
  NameAction,
  Right,
  SecondaryText,
  StyledButton,
  StyledCard,
  StyledDivider,
  StyledStatusDot,
  StyledStatusText,
  Title,
} from './styles';

const BasicInfo = () => {
  const { deploymentId, id: studyId } = useParams();
  const { t } = useTranslation();

  const {
    data: participantData,
    isLoading: participantDataLoading,
    error: participantError,
  } = useParticipantGroupsAccountsAndStatus(studyId);
  const stopDeployment = useStopParticipantGroup(studyId);
  const updateDeployment = useUpdateParticipantGroup(studyId);

  const [deployment, setDeployment] = useState<ParticipantGroup | null>(null);
  const [openStopConfirmationModal, setOpenStopConfirmationModal] =
    useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const handleStopDeployment = () => {
    setOpenStopConfirmationModal(false);
    stopDeployment.mutate(deployment.participantGroupId);
  };

  const confirmationModalProps = {
    open: openStopConfirmationModal,
    onClose: () => setOpenStopConfirmationModal(false),
    onConfirm: handleStopDeployment,
    title: t('deployment:stop_deployment.title'),
    description: t('deployment:stop_deployment.description'),
    boldText: t('deployment:stop_deployment.alert'),
    checkboxLabel: t('deployment:stop_deployment.confirm'),
    actionButtonLabel: t('deployment:stop_deployment.stop'),
  };

  const generateExport = useCreateSummary();

  useEffect(() => {
    if (!participantDataLoading && participantData?.groups) {
      setDeployment(
        participantData.groups.find(
          (g) => g.participantGroupId === deploymentId,
        ),
      );
    }
  }, [participantData, participantDataLoading, deploymentId]);

  // carp.core 1.3 exposes an optional group representation name on the
  // untyped groupStatuses entries; look it up by deployment id (may be null).
  const representationName = useMemo(() => {
    const statuses = participantData?.groupStatuses as
      { id: string; representation?: { name: string | null } }[] | undefined;
    return (
      statuses?.find((s) => s.id === deploymentId)?.representation?.name ?? null
    );
  }, [participantData, deploymentId]);

  const displayName = useMemo(
    () => getDeploymentDisplayName(deployment, representationName),
    [deployment, representationName],
  );

  const handleStartEditName = () => {
    setNameInput(representationName ?? '');
    setIsEditingName(true);
  };

  const handleCancelEditName = () => setIsEditingName(false);

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed || trimmed === representationName) {
      setIsEditingName(false);
      return;
    }
    updateDeployment.mutate(
      { groupId: deployment.participantGroupId, representationName: trimmed },
      { onSuccess: () => setIsEditingName(false) },
    );
  };

  if (participantDataLoading || !deployment) return <LoadingSkeleton />;

  if (participantError)
    return (
      <CarpErrorCardComponent
        message={t('error.deployment_data')}
        error={participantError}
      />
    );

  return (
    <>
      <DeleteConfirmationModal
        open={confirmationModalProps.open}
        title={confirmationModalProps.title}
        description={confirmationModalProps.description}
        boldText={confirmationModalProps.boldText}
        checkboxLabel={confirmationModalProps.checkboxLabel}
        actionButtonLabel={confirmationModalProps.actionButtonLabel}
        onClose={confirmationModalProps.onClose}
        onConfirm={confirmationModalProps.onConfirm}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '16px',
        }}
      >
        <ExportButton
          onClick={() =>
            generateExport.mutate({ studyId, deploymentIds: [deploymentId] })
          }
        >
          <FileDownloadOutlinedIcon fontSize="small" />
          <Typography variant="h5">{t('common:export_data')}</Typography>
        </ExportButton>
      </Box>
      <StyledCard elevation={2}>
        <Left>
          <Stack direction="column" spacing="8px" sx={{ alignItems: 'center' }}>
            <StyledStatusDot
              status={deployment.deploymentStatus.__type.split('.').pop()}
            />
            <StyledStatusText
              variant="h6"
              status={deployment.deploymentStatus.__type.split('.').pop()}
              align="center"
            >
              {deployment.deploymentStatus.__type
                .split('.')
                .pop()
                .replaceAll(/([a-z])([A-Z])/g, '$1 $2')}
            </StyledStatusText>
          </Stack>
          <NameAction>
            {isEditingName ? (
              <Stack
                direction="row"
                spacing="4px"
                sx={{ alignItems: 'center' }}
              >
                <TextField
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') handleCancelEditName();
                  }}
                  placeholder={t('deployment:deployment_name')}
                  size="small"
                  variant="standard"
                  autoFocus
                  disabled={updateDeployment.isPending}
                  sx={{ minWidth: 220 }}
                />
                <IconButton
                  size="small"
                  color="primary"
                  onClick={handleSaveName}
                  disabled={updateDeployment.isPending}
                >
                  <Check fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleCancelEditName}
                  disabled={updateDeployment.isPending}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Stack>
            ) : (
              <Stack
                direction="row"
                spacing="4px"
                sx={{ alignItems: 'center' }}
              >
                {displayName.name && <Title noWrap>{displayName.name}</Title>}
                <IconButton
                  size="small"
                  color="primary"
                  onClick={handleStartEditName}
                  aria-label={t('deployment:deployment_name')}
                >
                  <EditOutlined fontSize="small" />
                </IconButton>
              </Stack>
            )}
            {!deployment.deploymentStatus.__type.includes('Stopped') && (
              <StyledButton
                variant="outlined"
                onClick={() => setOpenStopConfirmationModal(true)}
              >
                <Stop fontSize="small" />
                {t('deployment:stop_deployment.title')}
              </StyledButton>
            )}
          </NameAction>
        </Left>
        <Right>
          <Stack direction="column">
            <Stack
              direction="row"
              spacing="8px"
              sx={{ marginRight: '36px', justifyContent: 'end' }}
            >
              <SecondaryText variant="h6">
                {`${t('common:created_on', {
                  date: formatDateTime(deployment.deploymentStatus.createdOn, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }),
                })}`}
              </SecondaryText>
              {deployment.deploymentStatus.startedOn && (
                <SecondaryText variant="h6">
                  {`${t('common:started_on', {
                    date: formatDateTime(
                      deployment.deploymentStatus.startedOn,
                      {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      },
                    ),
                  })}`}
                </SecondaryText>
              )}
              {deployment.deploymentStatus.stoppedOn && (
                <SecondaryText variant="h6">
                  {`${t('common:stopped_on', {
                    date: formatDateTime(
                      deployment.deploymentStatus.stoppedOn,
                      {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      },
                    ),
                  })}`}
                </SecondaryText>
              )}
            </Stack>
            <StyledDivider />
            <Stack
              direction="row"
              spacing="16px"
              sx={{ justifyContent: 'end' }}
            >
              <SecondaryText variant="h6">
                {t('common:deployment_id', { id: deploymentId })}
              </SecondaryText>
              <CopyButton textToCopy={deploymentId} idType="Deployment" />
            </Stack>
          </Stack>
        </Right>
      </StyledCard>
    </>
  );
};

export default BasicInfo;
