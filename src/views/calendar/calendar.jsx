
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';// ==============================|| SAMPLE PAGE ||============================== //
import ArbitreForm from 'ui-component/form2/formulaire-arbitre';
import KarateCalendar from 'ui-component/callendar/calendarComponent';
import { Link } from 'react-router-dom';
import ListAltRounded from '@mui/icons-material/ListAltRounded'; 


const CalendarPage = () => (
  <MainCard title="Créez vos prochains évènements" >
   
   <Link to="/evenement_list">
      <Button 
        type="primary"
        icon={<ListAltRounded /> } 
        variant='outlined'
        style={{ position: 'relative', top: '-80px', marginLeft: '700px' }}
      >
        Liste évènements
      </Button>
    </Link>
   <KarateCalendar/>
  </MainCard>
);

export default CalendarPage;
