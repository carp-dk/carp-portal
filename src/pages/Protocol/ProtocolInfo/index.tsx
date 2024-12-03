import CopyButton from "@Components/Buttons/CopyButton";
import { useLatestProtocol } from "@Utils/queries/protocols";
import { downloadProtocolAsJSONFile, formatDateTime } from "@Utils/utility";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddProtocolVersionModal from "../AddProtocolVersionModal";
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
} from "./styles";

const ProtocolInfoSkeleton: React.FC = () => {
  const isDownMd = useMediaQuery("(max-width:1250px)");
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
  const isDownMd = useMediaQuery("(max-width:1250px)");
  const { id: protocolId } = useParams();
  const { data: protocol, isLoading: protocolLoading } =
    useLatestProtocol(protocolId);
  const [modalOpen, setModalOpen] = useState(false);
  if (protocolLoading) return <ProtocolInfoSkeleton />;
  return (
    <>
      <DownloadButtonContainer>
        <DownloadButton
          variant="outlined"
          color="primary"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={() => {
            downloadProtocolAsJSONFile(protocol.snapshot);
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
            <ProtocolVersion variant="h4">
              Current version: {protocol.versionTag}
            </ProtocolVersion>
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
                {formatDateTime(protocol.firstVersionCreatedDate)}
              </Typography>
            </CreationInfoContainer>
            <CreationInfoContainer>
              <Typography variant="h6">Last version</Typography>
              <Typography variant="h6">
                {formatDateTime(protocol.lastVersionCreatedDate)}
              </Typography>
            </CreationInfoContainer>
          </InnerLeftContainer>
          {!isDownMd && <StyledDivider />}
          <IDsContainer>
            <IDContainer>
              <Typography variant="h6">Owner ID:</Typography>
              <Typography variant="h6">
                {protocol.snapshot.ownerId.stringRepresentation}
              </Typography>
              <CopyButton
                textToCopy={protocol.snapshot.ownerId.stringRepresentation}
                idType="Owner"
              />
            </IDContainer>
            <IDContainer>
              <Typography variant="h6">Protocol ID:</Typography>
              <Typography variant="h6">
                {protocol.snapshot.id.stringRepresentation}
              </Typography>
              <CopyButton
                textToCopy={protocol.snapshot.id.stringRepresentation}
                idType="Protocol"
              />
            </IDContainer>
          </IDsContainer>
        </Right>
      </StyledContainer>
      <AddProtocolVersionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        originalProtocolId={protocol.snapshot.id.stringRepresentation}
      />
    </>
  );
};

export default ProtocolInfo;
