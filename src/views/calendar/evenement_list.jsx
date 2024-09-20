
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Tab from 'ui-component/tableau/Tab';
import { Button } from '@mui/material';
import ListAltRounded from '@mui/icons-material/ListAltRounded'; 
import ArbitreTable from 'ui-component/tableau/arbitreTab';
import { Link } from 'react-router-dom';
import CalendarList from 'ui-component/callendar/calendar_event';

// ==============================|| SAMPLE PAGE ||============================== //


const CalendarEventPage= () => (
   { breadcrumbsClasses: true},

  <MainCard title="Liste des arbitres">
   
   <Link to="/arbitre">
      <Button 
        type="primary"
        icon={<ListAltRounded /> } 
        variant='outlined'
        style={{ position: 'relative', top: '-80px', marginLeft: '700px' }}
      >
        Ajouter
      </Button>
    </Link>
    <Typography variant="body2">
    </Typography>
    <CalendarList />
  </MainCard>
);

export default CalendarEventPage
