/* eslint-disable no-underscore-dangle */
import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import { convertICToReactPdf, formatDateTime } from "@Utils/utility";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetParticipantData,
  useParticipantGroupsAccountsAndStatus,
} from "@Utils/queries/participants";
import { pdf } from "@react-pdf/renderer";
import LoadingSkeleton from "../LoadingSkeleton";
import {
  DownloadButton,
  LastUploadText,
  Right,
  StyledCard,
  StyledDivider,
  Title,
} from "./styles";

const InformedConsent = () => {
  const { participantId, deploymentId, id: studyId } = useParams();

  const {
    data: participantData,
    isLoading,
    error,
  } = useGetParticipantData(deploymentId);
  const [consent, setConsent] = useState(null);
  const {
    data: participantGroupStatus,
    isLoading: participantGroupStatusLoading,
    error: participantGroupStatusError,
  } = useParticipantGroupsAccountsAndStatus(studyId);

  const downloadPdf = async () => {
    const blob = await pdf(
      await convertICToReactPdf(JSON.parse(consent.consent)),
    ).toBlob();
    const a = document.createElement("a");
    a.download = "informedConsent.pdf";
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  useEffect(() => {
    if (!isLoading && !participantGroupStatusLoading) {
      const participant = participantGroupStatus.groups
        .find((g) => g.participantGroupId === deploymentId)
        .deploymentStatus.participantStatusList.find(
          (p) => p.participantId === participantId,
        );

      if (participantData.common.keys) {
        const consentData = participantData.common.values
          .toArray()
          .find((v) =>
            (v as unknown as any)?.__type.includes("informed_consent"),
          );
        setConsent(consentData);
      }

      const participantRoleData = (
        participantData.roles as any as Array<any>
      ).find(
        (v) => v.roleName === participant.assignedParticipantRoles.roleNames[0],
      );
      if (participantRoleData) {
        const roleConsent = Object.values(participantRoleData.data).find(
          (value) =>
            (value as unknown as any)?.__type.includes("informed_consent"),
        );
        setConsent(roleConsent);
      }
    }
  }, [participantGroupStatus, participantData]);

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

  if (isLoading || participantGroupStatusLoading) return <LoadingSkeleton />;

  if (error || participantGroupStatusError) {
    return (
      <CarpErrorCardComponent
        message="An error occurred while loading informed consent"
        error={error ?? participantGroupStatusError}
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
            <DownloadButton onClick={() => downloadPdf()}>
              <Typography variant="h6">Download PDF</Typography>
              <FileDownloadOutlinedIcon fontSize="small" />
            </DownloadButton>
          </>
        )}
      </Right>
    </StyledCard>
  );
};

export default InformedConsent;
