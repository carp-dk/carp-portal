import { Button, Card, Divider, Typography } from "@mui/material";
import { styled } from "@Utils/theme";
import { getDeploymentStatusColor } from "@Utils/utility";

export const GreyText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
}));

export const TopContainer = styled("div")({
  borderRadius: "16px",
  display: "grid",
  gridTemplateColumns: "1fr 40px 220px 400px 60px",
  alignItems: "center",
  marginBottom: 16,
  width: "100%",
  padding: "2px 0 2px 16px",
});

export const Names = styled(Typography)(({ theme }) => ({
  overflow: "hidden",
  minWidth: "200px",
  cursor: "pointer",
  ":hover": {
    textDecoration: "underline",
    color: theme.palette.primary.main,
  },
}));

export const HorizontalStatusContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 4,
  position: "relative",
  "&:hover": {
    "& > div": {
      display: "flex",
    },
  },
});

export const IdContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 8,
  "& button": {
    paddingBottom: 4,
    paddingRight: 4,
  },
  justifyContent: "flex-end",
});

export const StatusContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 16,
});

export const ParticipantsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ open, theme }) => ({
  margin: "32px 0",
  backgroundColor: theme.palette.common.white,
  borderRadius: 16,
  position: "relative",
  paddingLeft: 16,
  paddingBottom: open ? 16 : 0,
  height: open ? "auto" : 52,
  overflow: "initial",
}));

export const StopDeploymentButton = styled(Button)(({ theme }) => ({
  display: "flex",
  color: theme.palette.error.main,
  gap: 6,
  textTransform: "none",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 4,
}));

export const RightContainer = styled("div")({
  display: "flex",
});

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  borderWidth: 1,
  width: 1,
  marginRight: 4,
  marginLeft: 4,
  height: 20,
}));

export const StyledStatusDot = styled("div", {
  shouldForwardProp: (prop) => prop !== "status",
})<{ status?: string }>(({ status }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: getDeploymentStatusColor(status),
  marginLeft: 6,
  flexShrink: 0,
}));

export const MinimizeButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  minWidth: 36,
  color: theme.palette.grey[700],
  justifyContent: "flex-end",
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  transform: open ? "rotateX(180deg)" : "rotateX(0deg)",
  "& svg": {
    fontSize: 36,
  },
  "&:hover": {
    backgroundColor: "inherit",
  },
}));

export const DownloadButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  textTransform: "none",
  gap: 4,
  textDecoration: "underline",
  "&:hover": {
    textDecoration: "underline",
  },
}));
