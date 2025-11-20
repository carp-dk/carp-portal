import { Tooltip } from '@mui/material';

type Props = {
  title: string;
  children: React.ReactNode;
};

const StyledTooltip = ({ title, children }: Props) => {
  return (
    <Tooltip title={title} enterDelay={500} arrow>
      {children as React.ReactElement}
    </Tooltip>
  );
};

export default StyledTooltip;
