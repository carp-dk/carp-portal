import { ErrorPill, InProgressPill, Pill, SuccessPill } from './styles';

type Props = {
  status: string;
};

const StatusPill = ({ status }: Props) => {
  switch (status) {
    case 'ERROR':
      return <ErrorPill>Error</ErrorPill>;
    case 'IN_PROGRESS':
      return <InProgressPill>In Progress</InProgressPill>;
    case 'SUCCESS':
      return <SuccessPill>Ready</SuccessPill>;
    default:
      return <Pill>{status}</Pill>;
  }
};

export default StatusPill;
