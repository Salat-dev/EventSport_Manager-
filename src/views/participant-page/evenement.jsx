
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import SnackbarCloseReason from 'ui-component/snacbar/Snabar';
import EventFom from 'ui-component/form2/formevent';
import { Link } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const EventPage = () => (
  <MainCard title="Enregistrez un évènement" >
   <Link to="/evenements">
      <Button 
        type="primary"
        startIcon={<ListAltRoundedIcon />}
        variant='contained'
        style={{ position: 'relative', top: '-80px', marginLeft: '700px' }}
      >
        Afficcher la liste
      </Button>
    </Link>
    <EventFom />
  </MainCard>
);

export default EventPage;
