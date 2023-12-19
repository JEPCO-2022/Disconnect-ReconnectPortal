import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, Drawer } from '@mui/material';
import { useSelector } from 'react-redux';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SvgIconStyle from '../../../components/SvgIconStyle';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Scrollbar from '../../../components/Scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
//
import NavConfig from './NavConfig';
import NavbarDocs from './NavbarDocs';
import NavbarAccount from './NavbarAccount';
import CollapseButton from './CollapseButton';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

NavbarVertical.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const isAdmin = useSelector((state) => state.Login.isAdmin);
  const roleID = useSelector((state) => state.Login.role);
  const theme = useTheme();
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');
  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

  const ICONS = {
    user: getIcon('ic_user'),
    ecommerce: getIcon('ic_ecommerce'),
    analytics: getIcon('ic_analytics'),
    dashboard: getIcon('ic_dashboard'),
  };
  function navconfige() {
    if (roleID === 2) {
      return [
        {
          // subheader: 'management',
          items: [
            {
              title: 'التقارير',
              path: '/dashboard/user',
              icon: <SummarizeIcon />,
              children: [{ title: ' تقرير تجميعي لفنيين غرندل ', path: '/dashboard/user/garandelReport' }],
            },
          ],
        },
      ];
    }
    if (isAdmin) {
      return [
        {
          // subheader: 'management',
          items: [
            {
              title: 'التقارير',
              path: '/dashboard/user',
              icon: <SummarizeIcon />,
              children: [
                // { title: 'لوحة تحكم الوصل', path: '/dashboard/statistics' },
                { title: 'العدادات المنجزه حسب المكتب', path: '/dashboard/user/meterdonebybranche' },
                { title: 'تفاصيل الكشف حسب الفرقة', path: '/dashboard/user/detailsbyteam' },
                // { title: 'الإحصائيات', path: '/dashboard/user/statistics' },
                { title: 'تقرير المهجور ', path: '/dashboard/user/abandoned' },
                { title: 'تقرير عبث او صيانة ', path: '/dashboard/user/maintenanceandtampering' },
                { title: '  تقارير العدادات المفصوله  ', path: '/dashboard/user/countersclips' },
                // { title: 'Six', path: '/dashboard/user/six' },
                // { title: 'Seven', path: '/dashboard/user/seven' },
              ],
            },
          ],
        },
        {
          // subheader: 'management',
          items: [
            {
              title: 'مسؤوليات المشرف',
              path: '/dashboard/user',
              icon: ICONS.user,
              children: [
                // { title: 'إضافة مستخدم جديد', path: '/dashboard/user/CreateNewUser' },
                { title: 'المستخدمون والصلاحيات', path: '/dashboard/AllUsersAndRoles' },
              ],
            },
          ],
        },
      ];
    }
    return [
      {
        // subheader: 'management',
        items: [
          {
            title: 'التقارير',
            path: '/dashboard/user',
            icon: <SummarizeIcon />,
            children: [
              // { title: 'لوحة تحكم الوصل', path: '/dashboard/statistics' },
              { title: 'العدادات المنجزه حسب المكتب', path: '/dashboard/user/meterdonebybranche' },
              // { title: 'الإحصائيات', path: '/dashboard/user/meterdonebybranche' },
              { title: 'تفاصيل الكشف حسب الفرقة', path: '/dashboard/user/detailsbyteam' },
              { title: 'تقرير المهجور ', path: '/dashboard/user/abandoned' },
              { title: 'تقرير عبث او صيانة ', path: '/dashboard/user/maintenanceandtampering' },
              { title: '  تقارير العدادات المفصوله  ', path: '/dashboard/user/countersclips' },

              // { title: 'Six', path: '/dashboard/user/six' },
              // { title: 'Seven', path: '/dashboard/user/seven' },
            ],
          },
        ],
      },
    ];
  }
  const NavConfig = navconfige();
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <Logo /> */}

          {/* {isDesktop && !isCollapse && (
            <CollapseButton onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />
          )} */}
        </Stack>

        <NavbarAccount isCollapse={isCollapse} />
      </Stack>

      <NavSectionVertical navConfig={NavConfig} isCollapse={isCollapse} />

      {/* <Box sx={{ flexGrow: 1 }} /> */}

      {!isCollapse && <NavbarDocs />}
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer open={isOpenSidebar} onClose={onCloseSidebar} PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}>
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: 'dashed',
              bgcolor: 'background.default',
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
