import PrivatePageLayout from '@Components/Layout/PrivatePageLayout';
import BasicInfo from './BasicInfo';
// import ChangePassword from './ChangePassword';
import ProfileCard from './ProfileCard';

const Account = () => {
  return (
    <PrivatePageLayout>
      <BasicInfo />
      <ProfileCard />
      {/* <ChangePassword /> */}
    </PrivatePageLayout>
  );
};

export default Account;
