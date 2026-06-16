import CopyButton from '@Components/Buttons/CopyButton';
import CarpErrorCardComponent from '@Components/CarpErrorCardComponent';
import {
  useGetByVersion,
  useGetVersionHistory,
} from '@Utils/queries/protocols';
import { downloadProtocolAsJSONFile, formatDateTime } from '@Utils/utility';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import AddProtocolVersionModal from '../AddProtocolVersionModal';
import {
  AddVersionButton,
  CreationInfoContainer,
  DownloadButton,
  DownloadButtonContainer,
  IDContainer,
  IDsContainer,
  InnerLeftContainer,
  Left,
  ProtocolVersion,
  Right,
  StyledContainer,
  StyledDivider,
  VersionContainer,
} from './styles';

const ProtocolInfoSkeleton: React.FC = () => {
  const isDownMd = useMediaQuery('(max-width:1250px)');
  return (
    <StyledContainer>
      <Left>
        <Skeleton animation="wave" variant="text" width={200} />
        <Skeleton animation="wave" variant="text" width={410} />
      </Left>
      {isDownMd && <StyledDivider isHorizontal />}
      <Right>
        <InnerLeftContainer>
          <CreationInfoContainer>
            <Skeleton animation="wave" variant="text" width={70} />
            <Skeleton animation="wave" variant="text" width={110} />
          </CreationInfoContainer>
          <CreationInfoContainer>
            <Skeleton animation="wave" variant="text" width={70} />
            <Skeleton animation="wave" variant="text" width={110} />
          </CreationInfoContainer>
        </InnerLeftContainer>
        {!isDownMd && <StyledDivider />}
        <IDsContainer>
          <IDContainer>
            <Skeleton animation="wave" variant="text" width={60} />
            <Skeleton animation="wave" variant="text" width={300} />
          </IDContainer>
          <IDContainer>
            <Skeleton animation="wave" variant="text" width={60} />
            <Skeleton animation="wave" variant="text" width={300} />
          </IDContainer>
        </IDsContainer>
      </Right>
    </StyledContainer>
  );
};

const ProtocolInfo = () => {
  const isDownMd = useMediaQuery('(max-width:1250px)');
  const { id: protocolId } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const version = searchParams.get('version');
  const {
    data: protocol,
    isLoading: protocolLoading,
    error: protocolError,
  } = useGetByVersion(protocolId, version);
  const {
    data: versions,
    isLoading: versionsLoading,
    error: versionsError,
  } = useGetVersionHistory(protocolId);
  const [modalOpen, setModalOpen] = useState(false);
  const latestVersion = versions
    ?.toSorted((a, b) => b.date.d14() - a.date.d14())
    .at(0)?.tag;

  useEffect(() => {
    if (!version && latestVersion) {
      setSearchParams(
        { version: latestVersion },
        { replace: true, state: location.state },
      );
    }
  }, [latestVersion, location.state, setSearchParams, version]);

  if (protocolLoading || versionsLoading) return <ProtocolInfoSkeleton />;
  if (versionsError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading protocol versions"
        error={versionsError}
      />
    );
  }
  if (!versions?.length) {
    return (
      <CarpErrorCardComponent message="No protocol versions are available" />
    );
  }
  if (protocolError || !protocol || !version) return null;

  return (
    <>
      <DownloadButtonContainer>
        <DownloadButton
          variant="outlined"
          color="primary"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={() => {
            downloadProtocolAsJSONFile(protocol);
          }}
        >
          Export Protocol
        </DownloadButton>
      </DownloadButtonContainer>
      <StyledContainer>
        <Left>
          <AddVersionButton
            onClick={() => setModalOpen(true)}
            variant="contained"
            color="primary"
          >
            Add version
          </AddVersionButton>
          <VersionContainer>
            <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
              <ProtocolVersion variant="h4">
                Current version: {version}
              </ProtocolVersion>
              <FormControl sx={{ width: '175px' }}>
                <InputLabel
                  id="protocol-version-select"
                  sx={{
                    top: '50%',
                    transform: 'translate(14px, -50%) scale(1)',
                    '&.MuiInputLabel-shrink': {
                      top: 0,
                      transform: 'translate(14px, -9px) scale(0.75)',
                    },
                  }}
                >
                  Protocol version
                </InputLabel>
                <Select
                  labelId="protocol-version-select"
                  size="small"
                  label="Protocol version"
                  value={version ?? ''}
                  onChange={(e) => {
                    const selectedVersion = e.target.value;
                    setSearchParams(
                      selectedVersion ? { version: selectedVersion } : {},
                      { state: location.state },
                    );
                  }}
                  sx={{ maxHeight: '32px' }}
                >
                  {versions.map((version) => (
                    <MenuItem key={version.tag} value={version.tag}>
                      {version.tag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Typography variant="h6">
              Update the Protocol data by adding a new version
            </Typography>
          </VersionContainer>
        </Left>
        {isDownMd && <StyledDivider isHorizontal />}
        <Right>
          <InnerLeftContainer>
            <CreationInfoContainer>
              <Typography variant="h6">Created on</Typography>
              <Typography variant="h6">
                {/** TODO: This should be toEpochMilliseconds */}
                {formatDateTime(versions[versions.length - 1].date.d14())}
              </Typography>
            </CreationInfoContainer>
            <CreationInfoContainer>
              <Typography variant="h6">Last version</Typography>
              <Typography variant="h6">
                {/** TODO: This should be toEpochMilliseconds */}
                {formatDateTime(protocol.createdOn.d14())}
              </Typography>
            </CreationInfoContainer>
          </InnerLeftContainer>
          {!isDownMd && <StyledDivider />}
          <IDsContainer>
            <IDContainer>
              <Typography variant="h6">Owner ID:</Typography>
              <Typography variant="h6">
                {protocol.ownerId.stringRepresentation}
              </Typography>
              <CopyButton
                textToCopy={protocol.ownerId.stringRepresentation}
                idType="Owner"
              />
            </IDContainer>
            <IDContainer>
              <Typography variant="h6">Protocol ID:</Typography>
              <Typography variant="h6">
                {protocol.id.stringRepresentation ?? 'N/A'}
              </Typography>
              <CopyButton
                textToCopy={protocol.id.stringRepresentation ?? ''}
                idType="Protocol"
              />
            </IDContainer>
          </IDsContainer>
        </Right>
      </StyledContainer>
      <AddProtocolVersionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        originalProtocolId={protocol.id.stringRepresentation ?? ''}
      />
    </>
  );
};

export default ProtocolInfo;
