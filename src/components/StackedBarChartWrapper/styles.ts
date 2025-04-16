import {styled} from "@Utils/theme";
import {Card, Typography} from "@mui/material";

export const StyledCard = styled(Card)({
    display: "flex",
    flexDirection: "column",
    padding: 24,
    borderRadius: 16,
    width: "100%",
});

interface StyledTitleProps {
    customcolor?: string;
}

export const StyledTitle = styled(Typography)<StyledTitleProps>(({ theme, customcolor }) => ({
    color: customcolor || theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    gap: 8,
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginTop: 8,
}));

export const WrapperForControlsAndChart = styled("div")({
    height: 300,
    display: "flex",
    flexDirection: "row",
});