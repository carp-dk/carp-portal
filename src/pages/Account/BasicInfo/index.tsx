import CopyButton from '@Components/Buttons/CopyButton';
import { Skeleton } from '@mui/material';
import { useCurrentUser } from '@Utils/queries/auth';
import { getRandomNumber } from '@Utils/utility';
import {
  DataContainer,
  EmailText,
  IdContainer,
  IdText,
  Initials,
  NameText,
  ProfilePicture,
  StyledContainer,
} from './styles';

const BasicInfoSkeleton = () => {
  return (
    <StyledContainer>
      <Skeleton
        variant="circular"
        height="200px"
        width="200px"
        animation="wave"
      />
      <DataContainer>
        <NameText variant="h2">
          <Skeleton width={getRandomNumber(140, 276)} animation="wave" />
        </NameText>
        <EmailText variant="h4">
          <Skeleton width={getRandomNumber(140, 276)} animation="wave" />
        </EmailText>
        <IdContainer>
          <IdText variant="h6">
            <Skeleton width={309} animation="wave" />
          </IdText>
        </IdContainer>
      </DataContainer>
    </StyledContainer>
  );
};

const BasicInfo = () => {
  const { data: currentUser, isLoading: currentUserIsLoading }
    = useCurrentUser();
  if (currentUserIsLoading) {
    return <BasicInfoSkeleton />;
  }
  return (
    <StyledContainer>
      <ProfilePicture>
        <Initials>
          {!currentUser.firstName || !currentUser.lastName
            ? currentUser.role[0]
            : `${currentUser.firstName[0]}${currentUser.lastName[0]}`}
        </Initials>
      </ProfilePicture>
      <DataContainer>
        <NameText variant="h2">{`${currentUser.firstName} ${currentUser.lastName}`}</NameText>
        <EmailText variant="h4">{currentUser.email}</EmailText>
        <IdContainer>
          <IdText variant="h6">{`ID: ${currentUser.accountId}`}</IdText>
          <CopyButton textToCopy={currentUser.accountId} idType="Account" />
        </IdContainer>
      </DataContainer>
    </StyledContainer>
  );
};

export default BasicInfo;
