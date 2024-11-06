import { Button } from "@mui/material";
import { styled } from "@Utils/theme";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: 1,
  minWidth: 20,
  float: "right",
  alignSelf: "flex-end",
  color: theme.palette.primary.main,
  cursor: "pointer",
}));

export default StyledButton;
