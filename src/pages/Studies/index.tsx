import LoadingLandingPage from "@Components/Layout/LoadingLandingPage";
import PrivatePageLayout from "@Components/Layout/PrivatePageLayout";
import { useCurrentUser } from "@Utils/queries/auth";
import ProtocolsSection from "./ProtocolsSection";
import StudiesSection from "./StudiesSection";
import StyledDivider from "./StyledDivider";
import WelcomeHeader from "./WelcomeHeader";

const Studies = () => {
  const { data: currentUser, isLoading: currentUserLoading } = useCurrentUser();
  if (currentUserLoading) {
    return <LoadingLandingPage />;
  }

  const isAdmin =
    currentUser.role.includes("SYSTEM_ADMIN") ||
    currentUser.role.includes("CARP_ADMIN");

  return (
    <PrivatePageLayout>
      <WelcomeHeader />
      <StudiesSection isAdmin={isAdmin} />
      <StyledDivider />
      <ProtocolsSection />
    </PrivatePageLayout>
  );
};

export default Studies;
