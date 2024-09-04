
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import SnackbarCloseReason from 'ui-component/snacbar/Snabar';
import AthleteForm from 'ui-component/form2/formulaire';

// ==============================|| SAMPLE PAGE ||============================== //

const AthletePage = () => (
  <MainCard title="Enregistrez les Informations de l'athlète" >
    <Button  style={{ position: 'relative', top: '-80px', marginLeft: '700px' }} variant="contained" startIcon={<ListAltRoundedIcon />}>
 Afficher la Liste
</Button>
    <AthleteForm />
  </MainCard>
);

export default AthletePage;
