import { Add } from '@mui/icons-material';
import { Grow, Typography } from '@mui/material';
import { CardWrapper, CreateNewCard, NewStudyContent } from './styles';

interface Props {
  onClick: () => void;
  actionText: string;
}

const StudyActionCard = ({ onClick, actionText }: Props) => {
  return (
    <Grow in mountOnEnter unmountOnExit>
      <CardWrapper elevation={2} onClick={onClick}>
        <CreateNewCard>
          <NewStudyContent>
            <Add fontSize="large" />
            <Typography variant="h5">{actionText}</Typography>
          </NewStudyContent>
        </CreateNewCard>
      </CardWrapper>
    </Grow>
  );
};

export default StudyActionCard;
