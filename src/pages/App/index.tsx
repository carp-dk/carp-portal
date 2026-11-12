import LoadingLandingPage from '@Components/Layout/LoadingLandingPage';
import { lazy, Suspense } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import ProtectedRoute from './ProtectedRoute';
import StudyProtocolRedirect from './StudyProtocolRedirect';

// Each page is its own chunk, so a visit only downloads the pages it opens.
const Account = lazy(() => import('../Account'));
const Admin = lazy(() => import('../Admin'));
const Deployment = lazy(() => import('../Deployment'));
const Deployments = lazy(() => import('../Deployments'));
const Export = lazy(() => import('../Export'));
const Participant = lazy(() => import('../Participant'));
const Participants = lazy(() => import('../Participants'));
const Protocol = lazy(() => import('../Protocol'));
const Protocols = lazy(() => import('../Protocols'));
const Resources = lazy(() => import('../Resources'));
const Studies = lazy(() => import('../Studies'));
const StudyAnnouncementEdit = lazy(() => import('../StudyAnnouncementEdit'));
const StudyAnnouncementNew = lazy(() => import('../StudyAnnouncementNew'));
const StudyAnnouncements = lazy(() => import('../StudyAnnouncements'));
const StudyOverview = lazy(() => import('../StudyOverview'));
const StudySettings = lazy(() => import('../StudySettings'));

const TranslationsRedirect = () => {
  const { id: studyId } = useParams();

  return <Navigate to={`/studies/${studyId}/resources`} replace />;
};

const App = () => {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return (
      <Suspense fallback={<LoadingLandingPage />}>
        <Routes>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies"
            element={
              <ProtectedRoute>
                <Studies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/protocols"
            element={
              <ProtectedRoute>
                <Protocols />
              </ProtectedRoute>
            }
          />
          <Route
            path="/protocols/:id"
            element={
              <ProtectedRoute>
                <Protocol />
              </ProtectedRoute>
            }
          />

          <Route
            path="/studies/:id/overview"
            element={
              <ProtectedRoute>
                <StudyOverview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/settings"
            element={
              <ProtectedRoute>
                <StudySettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/protocol"
            element={
              <ProtectedRoute>
                <StudyProtocolRedirect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/resources"
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/translations"
            element={
              <ProtectedRoute>
                <TranslationsRedirect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/announcements"
            element={
              <ProtectedRoute>
                <StudyAnnouncements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/announcements/new"
            element={
              <ProtectedRoute>
                <StudyAnnouncementNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/announcements/:annId/edit"
            element={
              <ProtectedRoute>
                <StudyAnnouncementEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/export"
            element={
              <ProtectedRoute>
                <Export />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/deployments/:deploymentId/participants/:participantId"
            element={
              <ProtectedRoute>
                <Participant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/participants"
            element={
              <ProtectedRoute>
                <Participants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/deployments"
            element={
              <ProtectedRoute>
                <Deployments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studies/:id/deployments/:deploymentId"
            element={
              <ProtectedRoute>
                <Deployment />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/studies" />} />
        </Routes>
      </Suspense>
    );
  }

  return <LoadingLandingPage />;
};

export default App;
