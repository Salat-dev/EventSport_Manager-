// assets
import { IconKey } from '@tabler/icons-react';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
// constant
const icons = {
  IconKey,
  GroupAddRoundedIcon,
  EmojiEventsOutlinedIcon,
  FolderOpenOutlinedIcon,
  CalendarMonthOutlinedIcon,
  ListOutlinedIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Organisation',
  caption: 'Pages organisation event',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Participants',
      type: 'collapse',
      icon: icons.GroupAddRoundedIcon,

      children: [
        {
          id: 'login3',
          title: 'Athlètes',
          type: 'item',
          url: '/athletes',
        breadcrumbsClasses: false      
            },
        {
          id: 'register3',
          title: 'Coachs',
          type: 'item',
          url: '/coach',
          breadcrumbsClasses: false ,    
        },
        {
          id: 'register3',
          title: 'Officiels',
          type: 'item',
          url: '/officiel',
          breadcrumbsClasses: false      

        },
        {
          id: 'register3',
          title: 'Arbitres',
          type: 'item',
          url: '/arbitre',          
          breadcrumbsClasses: false      

        }
      ]

    },
    {
      id: 'util-color',
      title: 'Fichier',
      type: 'collapse',
      icon: icons.FolderOpenOutlinedIcon,
      breadcrumbs: false,
      children: [
        {
          id: 'login3',
          title: 'Charger',
          type: 'collapse',
          icon: icons.EmojiEventsOutlinedIcon,
        breadcrumbs: false,
        children: [
          {
            id: 'util-typography',
            title: 'Liste ',
            type: 'item',
            url: '/utils/util-typography',
            icon: icons. GroupsIcon,
            breadcrumbs: false
          },
          {
            id: 'util-color',
            title: 'Tirage au sort',
            type: 'item',
            url: '/draws',
            icon: icons.ConfirmationNumberIcon,
            breadcrumbs: false
          },
          {
            id: 'util-shadow',
            title: 'Note tirage au sort ',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.ConnectingAirportsIcon,
            breadcrumbs: false
          },
          {
            id: 'util-shadow',
            title: 'Classement',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.ConnectingAirportsIcon,
            breadcrumbs: false
          },

        ]      
            },
        {
          id: 'register3',
          title: 'Tirage au sort',
          type: 'item',
          url: 'tirage',
          breadcrumbs: false ,    
        }
      ]
    },

    // ============================SHOW LIST PARTICIPANT=================================
    {
      id: 'authentication',
      title: 'Listes',
      type: 'collapse',
      icon: icons.ListOutlinedIcon,

      children: [
        {
          id: 'login3',
          title: 'Liste des athlètes',
          type: 'item',
          url: '/List-athlete',
        breadcrumbsClasses: false ,
               
            },
        {
          id: 'register3',
          title: 'Liste des coachs',
          type: 'item',
          url: '/List-coach',
          breadcrumbsClasses: false ,    
        },
        {
          id: 'register3',
          title: 'Liste des officiels',
          type: 'item',
          url: '/List-officiel',
          breadcrumbsClasses: false      

        },
        {
          id: 'register3',
          title: 'Liste des arbitres',
          type: 'item',
          url: '/List-arbitre',          
          breadcrumbsClasses: false      

        }
      ]

    },
    {
      id: 'cal',
      title: 'Agenda',
      type: 'item',
      url: '/calendar',
      icon: icons.CalendarMonthOutlinedIcon,
    breadcrumbs: false      
        },

  ]
};

export default pages;
