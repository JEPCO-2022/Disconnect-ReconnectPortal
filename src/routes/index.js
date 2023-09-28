import { useState, Suspense, lazy } from 'react';
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
import MaintenanceAndTampering from '../pages/MaintenanceAndTamperingReport/MaintenanceAndTampering';
import Statistics from '../pages/PowerBIDashboards/Statistics';
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
        { path: 'eight/:id', element: <PageEight /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/four" replace />, index: true },
            { path: 'four', element: <PageFour /> },
            { path: 'five', element: <PageFive /> },
            { path: 'CreateNewUser', element: <CreateNewUser /> },
            { path: 'seven/:id', element: <PageSeven /> },
            { path: 'nine', element: <PageNine /> },
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
        { path: '*', element: <Navigate to="/404" replace /> },
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
// const MaintenanceAndTampering = Loadable(lazy(() => import('../pages/MaintenanceAndTampering')));
