import { ReactElement } from 'react';
import { useAuth } from 'react-oidc-context';

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    auth.signinRedirect({
      redirectMethod: 'replace',
    });
  }

  return children;
};

export default ProtectedRoute;
