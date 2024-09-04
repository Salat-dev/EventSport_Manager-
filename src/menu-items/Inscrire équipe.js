// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const inscription = {
  id: 'inscription',
  title: 'Évènement options',
  caption: 'Pages inscription',

  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Inscrire une équipe',
      type: 'item',
      url: '/equipe',
      breadcrumbsClasses: true
    }
  ]
};

export default inscription;
