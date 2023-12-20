import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import CountersClips from '../pages/DisconnectedMetersReport/DisconnectedMetersReport';
import PageNine from '../pages/AbandonedReport/AbandonedReport';
import PageEight from '../pages/PageEight';
import LoginPage from '../pages/Login/LoginPage';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import CreateNewUser from '../pages/UserManagement/CreateNewUser';
import AllUsersAndRoles from '../pages/AllUsersAndRoles/AllUsersAndRoles';
import GarandelDetailedReport from '../pages/garandel/GarandelDetailedReport';
import MaintenanceAndTampering from '../pages/MaintenanceAndTamperingReport/MaintenanceAndTampering';
import GarandelReport from '../pages/garandel/GarandelReport';
import Statistics from '../pages/PowerBIDashboards/Statistics';
import TotalTechReport from '../pages/TotalTechReport/TotalTechReport';
import DetailedTechReport from '../pages/DetailedTechReport/DetailedTechReport';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/one" replace />, index: true },
        { path: 'AllUsersAndRoles', element: <AllUsersAndRoles /> },
        { path: 'EditUserInfo/:id', element: <EditUserInfo /> },
        { path: 'permission/:id', element: <PageEight /> },
        { path: 'statistics', element: <Statistics /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/meterdonebybranche" replace />, index: true },
            { path: 'meterdonebybranche', element: <PageFour /> },
            { path: 'statistics', element: <Statistics /> },
            { path: 'detailsbyteam', element: <PageFive /> },
            { path: 'CreateNewUser', element: <CreateNewUser /> },
            { path: 'detailsdetiction/:id', element: <PageSeven /> },
            { path: 'abandoned', element: <PageNine /> },
            { path: 'maintenanceandtampering', element: <MaintenanceAndTampering /> },
            { path: 'countersclips', element: <CountersClips /> },
            { path: 'garandelReport', element: <GarandelReport /> },
            { path: 'garandelDetailedReport', element: <GarandelDetailedReport /> },
            { path: 'total-tech-report', element: <TotalTechReport /> },
            { path: 'detailed-tech-report', element: <DetailedTechReport /> },  


          ],
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <NotFound /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const PageOne = Loadable(lazy(() => import('../pages/AllUsersAndRoles/AllUsersAndRoles')));
const PageFour = Loadable(lazy(() => import('../pages/CompletedMeterbyOffice/CompletedMeterbyOffice')));
const PageFive = Loadable(lazy(() => import('../pages/InspectionDetailsbyTeam/InspectionDetailsbyTeam')));
const PageSix = Loadable(lazy(() => import('../pages/UserManagement/CreateNewUser')));
const PageSeven = Loadable(lazy(() => import('../pages/PageSeven')));
const NotFound = Loadable(lazy(() => import('../pages/ErrorHandlers/Page404')));
const EditUserInfo = Loadable(lazy(() => import('../pages/UserManagement/EditUserInfo')));
