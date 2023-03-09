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
const isAdmin = localStorage.getItem('isAdmin');
console.log(isAdmin);
function navconfige() {
  const boolValue = isAdmin === 'true';
  if (boolValue) {
    return [
      {
        // subheader: 'management',
        items: [
          {
            title: 'التقارير',
            path: '/dashboard/user',
            icon: <SummarizeIcon />,
            children: [
              { title: 'العدادات المنجزه حسب المكتب', path: '/dashboard/user/four' },
              { title: 'تفاصيل الكشف حسب الفرقة', path: '/dashboard/user/five' },
              { title: 'تقرير المهجور ', path: '/dashboard/user/nine' },
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
            { title: 'العدادات المنجزه حسب المكتب', path: '/dashboard/user/four' },
            { title: 'تفاصيل الكشف حسب الفرقة', path: '/dashboard/user/five' },
            { title: 'تقرير المهجور ', path: '/dashboard/user/nine' },
            // { title: 'Six', path: '/dashboard/user/six' },
            // { title: 'Seven', path: '/dashboard/user/seven' },
          ],
        },
      ],
    },
  ];
}

const navConfig = navconfige();
export default navConfig;
