import { useState, Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import CountersClips from '../pages/CountersClips';
import PageNine from '../pages/PageNine';
import PageEight from '../pages/PageEight';
import LoginPage from '../pages/Login/LoginPage';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import CreateNewUser from '../pages/CreateNewUser';
import AllUsersAndRoles from '../pages/AllUsersAndRoles/AllUsersAndRoles';
import MaintenanceAndTampering from '../pages/MaintenanceAndTampering';
import Statistics from '../pages/Statistics';
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
        { path: 'two', element: <PageTwo /> },
        { path: 'three', element: <PageThree /> },
        { path: 'AllUsersAndRoles', element: <AllUsersAndRoles /> },
        { path: 'EditUserInfo/:id', element: <EditUserInfo /> },
        { path: 'permission/:id', element: <PageEight /> },
        // { path: 'statistics', element: <Statistics /> },
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
const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
const PageSix = Loadable(lazy(() => import('../pages/CreateNewUser')));
const PageSeven = Loadable(lazy(() => import('../pages/PageSeven')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const EditUserInfo = Loadable(lazy(() => import('../pages/EditUserInfo')));
// const MaintenanceAndTampering = Loadable(lazy(() => import('../pages/MaintenanceAndTampering')));
