import { StudyProtocolSnapshot } from '@carp-dk/client';
import CopyButton from '@Components/Buttons/CopyButton';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import LinkIcon from '@mui/icons-material/Link';
import { Typography, useMediaQuery } from '@mui/material';
import { downloadProtocolAsJSONFile, formatDateTime } from '@Utils/utility';
import {
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
  StyledLink,
  Subtitle,
} from './styles';

type Props = {
  protocol: StudyProtocolSnapshot;
};

const ProtocolInfo = ({ protocol }: Props) => {
  const isDownMd = useMediaQuery('(max-width:1725px)');

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
          <ProtocolVersion variant="h4">
            Study protocol
            {/* Study protocol v{protocol.version} */}
          </ProtocolVersion>
          <Subtitle variant="h6">
            Update the Protocol by adding a new version in{' '}
            <StyledLink to={`/protocols/${protocol.id.stringRepresentation}`}>
              Protocol&#39;s main page
            </StyledLink>
            <LinkIcon fontSize="small" color="primary" />
          </Subtitle>
        </Left>
        {isDownMd && <StyledDivider isHorizontal />}
        <Right>
          <InnerLeftContainer>
            <CreationInfoContainer>
              <Typography variant="h6">Created on</Typography>
              <Typography variant="h6">
                {formatDateTime(protocol.createdOn.toEpochMilliseconds())}
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
                {protocol.id.stringRepresentation}
              </Typography>
              <CopyButton
                textToCopy={protocol.id.stringRepresentation}
                idType="Protocol"
              />
            </IDContainer>
          </IDsContainer>
        </Right>
      </StyledContainer>
    </>
  );
};

export default ProtocolInfo;
