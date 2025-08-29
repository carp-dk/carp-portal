import { Typography } from '@mui/material';
import { formatDate } from '@Utils/utility';
import TooltipContainer, { HorizontalContainer } from './styles';

type Props = {
  invitedAt: string;
  startedAt: string;
  stoppedAt: string;
};

const DateTooltip = ({ invitedAt, startedAt, stoppedAt }: Props) => {
  return (
    <TooltipContainer>
      <HorizontalContainer>
        <Typography variant="h6">Invited:</Typography>
        <Typography variant="h6">{formatDate(invitedAt)}</Typography>
      </HorizontalContainer>
      {startedAt && (
        <HorizontalContainer>
          <Typography variant="h6">Started:</Typography>
          <Typography variant="h6">{formatDate(startedAt)}</Typography>
        </HorizontalContainer>
      )}
      {stoppedAt && (
        <HorizontalContainer>
          <Typography variant="h6">Stopped:</Typography>
          <Typography variant="h6">{formatDate(stoppedAt)}</Typography>
        </HorizontalContainer>
      )}
    </TooltipContainer>
  );
};

export default DateTooltip;
