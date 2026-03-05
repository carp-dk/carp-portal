import CopyButton from '@Components/Buttons/CopyButton';
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
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [version, setVersion] = useState(null);
  const { data: protocol, isLoading: protocolLoading } = useGetByVersion(
    protocolId,
    version,
  );
  const { data: versions, isLoading: versionsLoading } =
    useGetVersionHistory(protocolId);
  const [modalOpen, setModalOpen] = useState(false);
  if (protocolLoading || versionsLoading || !protocol)
    return <ProtocolInfoSkeleton />;
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
            <Stack direction="row" gap={2} alignItems="center">
              <ProtocolVersion variant="h4">
                Current version: {version ?? versions[0].tag}
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
                  value={version}
                  onChange={(e) => {
                    setVersion(
                      e.target.value === '' ? undefined : e.target.value,
                    );
                    navigate(
                      `/protocols/${protocolId}?version=${e.target.value}`,
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
                {formatDateTime(
                  versions[versions.length - 1].date.toEpochMilliseconds(),
                )}
              </Typography>
            </CreationInfoContainer>
            <CreationInfoContainer>
              <Typography variant="h6">Last version</Typography>
              <Typography variant="h6">
                {formatDateTime(protocol.createdOn.toEpochMilliseconds())}
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
