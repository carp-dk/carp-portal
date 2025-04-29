import {styled} from "@Utils/theme";
import {Button, Card, Typography} from "@mui/material";

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

export const StyledTitle = styled(Typography)<StyledTitleProps>(({theme, customcolor}) => ({
    color: customcolor || theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    gap: 8,
}));

export const StyledDescription = styled(Typography)(({theme}) => ({
    color: theme.palette.text.secondary,
    marginTop: 8,
}));

export const Wrapper = styled("div")({
    height: 300,
    display: "flex",
    flexDirection: "row",
});

export const RightWrapper = styled(Card)({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: '16px',
    paddingBottom: 0,
    borderRadius: '25px'
});

export const StyledControlButton = styled(Button)({
    alignSelf: "center",
    width: 36,
    minWidth: 0,
    color: 'black',
});

export const DateRangeLabel = styled("span")({
    fontSize: 12,
    fontWeight: 700,
    alignSelf: "flex-end",
});

export const ControlsAndChartWrapper = styled("div")({
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    flexGrow: 1,
});

export const StyledUl = styled("ul")({
    display: "flex",
    flexDirection: "column",
    paddingInlineStart: 24,
    gap: 8,
    width: 186,
    overflowY: "auto",
});

export const StyledLi = styled("li")({
    display: "flex",
    alignItems: "center",
    gap: 5,
});

export const StyledLabel = styled("span")({
    fontSize: 14,
    fontWeight: 700,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
});

export const BulletPoint = styled('div')({
    width: 14,
    height: 14,
    borderRadius: '50%',
    flexShrink: 0,
});