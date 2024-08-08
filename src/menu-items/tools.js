// assets
import GroupsIcon from '@mui/icons-material/Groups';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';

// constant
const icons = {
  
  GroupsIcon,
  ConfirmationNumberIcon,
  ConnectingAirportsIcon,
  ConfirmationNumberOutlinedIcon,
  ImportExportOutlinedIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const tools= {
  id: 'tools-u',
  title: 'Outils',
  caption: 'Pages Tools event',
  type: 'group',
  children: [
    {
      id: 'im-ex',
      title: 'Importer/Exporter les données',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons.   ImportExportOutlinedIcon,
      breadcrumbs: false,
            
    }
   
  ]
};

export default tools;
