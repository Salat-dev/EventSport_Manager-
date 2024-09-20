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
      title: 'Ajouter',
      type: 'item',
      url: '/enregistrement',
      breadcrumbsClasses: true
    }
  ]
};

export default inscription;
