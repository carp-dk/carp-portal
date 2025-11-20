import { ReactElement } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';
import CommitHash from '../CommitHash';

interface PublicRouteProps {
  children: ReactElement;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to="/studies" replace />;
  }

  return (
    <>
      {children}
      {process.env.NODE_ENV === 'development' &&
        import.meta.env.VITE_GIT_COMMIT && <CommitHash />}
    </>
  );
};

export default PublicRoute;
