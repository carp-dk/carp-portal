import { Button, Typography } from "@mui/material";
import { styled } from "@Utils/theme";

export const ModalBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  backgroundColor: theme.palette.common.white,
  borderRadius: 16,
  padding: 24,
  maxWidth: 820,
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: 8,
}));

export const HorizontalInputContainer = styled("div")({
  height: 40,
  display: "flex",
  gap: 10,
  alignItems: "center",
});

export const HorizontalInputContainerWithAutoHeight = styled(
  HorizontalInputContainer,
)({
  height: "auto",
});

export const VerticalInputContainer = styled("div")({
  display: "flex",
  gap: 10,
  flexDirection: "column",
});

export const Content = styled("div")({
  display: "flex",
  gap: 4,
  flexDirection: "column",
  height: "100%",
  padding: "0px 0px 0px 12px",
});

export const ModalActions = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: 8,
  marginTop: 24,
  width: "100%",
  justifyContent: "flex-end",
});

export const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "none",
  padding: "8px 24px",
  borderRadius: 16,
}));

export const DoneButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: "none",
  padding: "8px 24px",
  borderRadius: 16,
}));

export const TypographyVariant = styled(Typography)(() => ({
  marginTop: "10px",
  marginBottom: "auto",
  width: "56px",
}));
