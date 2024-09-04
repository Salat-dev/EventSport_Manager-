
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import SnackbarCloseReason from 'ui-component/snacbar/Snabar';
import EventFom from 'ui-component/form2/formevent';

// ==============================|| SAMPLE PAGE ||============================== //

const EventPage = () => (
  <MainCard title="Enregistrez les Informations de l'athlète" >
    <Button  style={{ position: 'relative', top: '-80px', marginLeft: '700px' }} variant="contained" startIcon={<ListAltRoundedIcon />}>
 Afficher la Liste
</Button>
    <EventFom />
  </MainCard>
);

export default EventPage;
