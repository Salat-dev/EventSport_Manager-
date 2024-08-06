// assets
import GroupsIcon from '@mui/icons-material/Groups';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

// constant
const icons = {
  
  GroupsIcon,
  ConfirmationNumberIcon,
  ConnectingAirportsIcon,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const organisation= {
  id: 'Complement',
  title: 'Complement',
  caption: 'Pages complement event',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Organisateurs',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons. GroupsIcon,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Billeterie',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.ConfirmationNumberIcon,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Logistique',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.ConnectingAirportsIcon,
      breadcrumbs: false
    }
  ]
};

export default organisation;
