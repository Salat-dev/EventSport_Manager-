
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Tab from 'ui-component/tableau/Tab';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArbitreTable from 'ui-component/tableau/arbitreTab';
import { Link } from 'react-router-dom';
import EventList from 'ui-component/tableau/event_list';
import TicketForm from 'ui-component/billet/Ticket';
import Ticket from 'ui-component/billet/Ticket';
import LandingTicket from 'ui-component/billet/list';
import TicketDesigner from 'ui-component/billet/list';

// ==============================|| SAMPLE PAGE ||============================== //


const TiketPageManagement= () => (
   { breadcrumbsClasses: true},

  <MainCard title="Liste des arbitres">
   
   <Link to="/evenement">
      <Button 
        type="primary"
        icon={<AddIcon />} 
        variant='outlined'
        style={{ position: 'relative', top: '-80px', marginLeft: '700px' }}
      >
        Ajouter
      </Button>
    </Link>
    <Typography variant="body2">
    </Typography>
    <TicketDesignert/>
  </MainCard>
);

export default TiketPageManagement
