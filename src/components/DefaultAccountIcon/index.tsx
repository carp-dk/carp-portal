import defaultAccoutIcon from '@Assets/images/default-account-icon.png';
import { Initials, StyledContainer } from './styles';

type Props = {
  firstName: string;
  lastName: string;
};

const DefaultAccountIcon = ({ firstName, lastName }: Props) => {
  return (
    <StyledContainer>
      <img width="52px" src={defaultAccoutIcon} alt="default account icon" />
      <Initials variant="h4">
        {firstName.charAt(0)}
        {lastName.charAt(0)}
      </Initials>
    </StyledContainer>
  );
};

export default DefaultAccountIcon;
