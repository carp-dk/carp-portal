import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import { formatDateTime } from "@Utils/utility";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetParticipantData } from "@Utils/queries/participants";
import LoadingSkeleton from "../LoadingSkeleton";
import {
  DownloadButton,
  LastUploadText,
  Right,
  StyledCard,
  StyledDivider,
  Title,
} from "./styles";

interface FileInfo {
  data: string;
  fileName: string;
  fileType: string;
}

const InformedConsent = () => {
  const { deploymentId } = useParams();

  const {
    data: participantData,
    isLoading,
    error,
  } = useGetParticipantData(deploymentId);
  const [consent, setConsent] = useState(null);

  const downloadFile = ({ data, fileName, fileType }: FileInfo) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToJson = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(consent),
      fileName: "informedConsent.json",
      fileType: "text/json",
    });
  };

  useEffect(() => {
    if (!isLoading) {
      if (participantData.common.keys) {
        const consentData = participantData.common.values.toArray().find(
          (v) =>
            // eslint-disable-next-line no-underscore-dangle
            (v as unknown as any)?.__type ===
            "dk.carp.webservices.input.informed_consent",
        );
        setConsent(consentData);
      }
    }
  }, [participantData]);

  const dateOfLastUpdate = useMemo(() => {
    if (consent) {
      return `Last Updated: ${formatDateTime(consent.signedTimestamp, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })}`;
    }
    return "Informed consent not found";
  }, [consent]);

  if (isLoading) return <LoadingSkeleton />;

  if (error) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading informed consent"
        error={error}
      />
    );
  }

  return (
    <StyledCard elevation={2}>
      <Title variant="h3">Informed Consent</Title>
      <Right>
        <LastUploadText variant="h6">{dateOfLastUpdate}</LastUploadText>
        {consent && (
          <>
            <StyledDivider />
            <DownloadButton onClick={(e) => exportToJson(e)}>
              <Typography variant="h6">Export</Typography>
              <FileDownloadOutlinedIcon fontSize="small" />
            </DownloadButton>
          </>
        )}
      </Right>
    </StyledCard>
  );
};

export default InformedConsent;
