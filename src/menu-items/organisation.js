// assets
import GroupsIcon from '@mui/icons-material/Groups';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

// constant
const icons = {
  
  GroupsIcon,
  ConfirmationNumberIcon,
  ConnectingAirportsIcon,
  ConfirmationNumberOutlinedIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const organisation= {
  id: 'orga',
  title: 'Complement',
  caption: 'Pages complement event',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Organisateurs',
      type: 'item',
      url: '',
      icon: icons. GroupsIcon,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Billeterie',
      type: 'item',
      url: '',
      icon: icons.ConfirmationNumberOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'authentication',
      title: 'Logistique',
      type: 'collapse',
      icon: icons.ConnectingAirportsIcon,

      children: [
        {
          id: 'login3',
          title: 'Hotel',
          type: 'item',
          url: '',
        breadcrumbsClasses: false ,
              
            },
        {
          id: 'register3',
          title: 'Transport',
          type: 'item',
          url: '',
          breadcrumbsClasses: false ,    
        },
        {
          id: 'register3',
          title: 'Autres',
          type: 'item',
          url: '',
          breadcrumbsClasses: false      

        },
      ]

    }
   
  ]
};

export default organisation;
