import { Card, CardActionArea, Typography } from "@mui/material";
import { styled } from "@Utils/theme";
import { getStudyStatusColor } from "@Utils/utility";

export const StyledCard = styled(CardActionArea)({
  display: "flex",
  flexDirection: "row",
  height: "inherit",
  padding: 24,
  paddingLeft: 16,
  alignItems: "flex-start",
  justifyContent: "flex-start",
});

export const CardWrapper = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  borderRadius: 10,
  height: 312,
  width: 312,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const ContentWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.info.main,
  textAlign: "center",
}));

export const CardDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: "left",
  marginTop: 16,
  display: "-webkit-box",
  WebkitLineClamp: 7,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  width: "100%",
  wordBreak: "break-word",
  marginBottom: 16,
}));

export const StatusDotContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "skeleton",
})<{ skeleton?: boolean }>(({ skeleton }) => ({
  display: "flex",
  alignItems: "flex-end",
  paddingTop: 8,
  paddingBottom: skeleton ? 4 : 0,
}));

export const InfoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  minWidth: 0,
  paddingLeft: 12,
});

export const Bottom = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  flexGrow: 2,
  paddingBottom: 32,
});

export const CreationText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  marginBottom: 4,
}));

export const StyledStatusDot = styled("div", {
  shouldForwardProp: (prop) => prop !== "status",
})<{ status?: string }>(({ status }) => ({
  width: 16,
  height: 16,
  borderRadius: "50%",
  backgroundColor: getStudyStatusColor(status),
}));
