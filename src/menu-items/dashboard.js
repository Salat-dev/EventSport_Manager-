// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Statistiques',
  caption: 'Pages statistiques event',

  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Statistiques',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbsClasses: true
    }
  ]
};

export default dashboard;
