// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const event = {
  id: 'event',
  title: 'Évènement options',
  caption: 'Pages event',

  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Créer évènement',
      type: 'item',
      url: '/evenement',
      breadcrumbsClasses: true
    }
  ]
};

export default event;
