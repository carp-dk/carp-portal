import { useCurrentUser } from '@Utils/queries/auth';
import { isUserAdmin } from '@Utils/utility';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: ReactElement;
}

/** UI guard only; CAWS enforces the actual permissions on every admin call. */
const AdminRoute = ({ children }: AdminRouteProps) => {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  if (!isUserAdmin(currentUser)) {
    return <Navigate to="/studies" replace />;
  }

  return children;
};

export default AdminRoute;
