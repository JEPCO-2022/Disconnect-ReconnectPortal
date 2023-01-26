// components
import SummarizeIcon from '@mui/icons-material/Summarize';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general v3.4.0',
  //   items: [
  //     { title: 'One', path: '/dashboard/one', icon: ICONS.dashboard },
  //     { title: 'Two', path: '/dashboard/two', icon: ICONS.ecommerce },
  //     { title: 'Three', path: '/dashboard/three', icon: ICONS.analytics },
  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    // subheader: 'management',
    items: [
      {
        title: 'التقارير',
        path: '/dashboard/user',
        icon: <SummarizeIcon />,
        children: [
          { title: 'تقرير الوصل', path: '/dashboard/user/four' },
          { title: 'تقرير القطع ', path: '/dashboard/user/five' },
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
          { title: 'إضافة مستخدم جديد', path: '/dashboard/user/CreateNewUser' },
      { title: 'المستخدمون والصلاحيات', path: '/dashboard/AllUsersAndRoles'},
],
      },
    ],
  },
];

export default navConfig;
