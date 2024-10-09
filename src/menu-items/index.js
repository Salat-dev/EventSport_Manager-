
import dashboard from './dashboard';
//import pages from './pages';
//import utilities from './utilities';
import other from './other';
import participant from './participant';
import organisation from './organisation';
import tools from './tools'
import event from './event'
import inscription from './Inscrire équipe';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [ event, inscription, dashboard,participant,organisation, tools , other]
};

export default menuItems;
