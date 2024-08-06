
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';// ==============================|| SAMPLE PAGE ||============================== //
import Coach from 'ui-component/form2/formulaire-coachs ';

const CoachPage = () => (
  <MainCard title="Enregistrez les Informations du coach" >
    <Button  style={{ position: 'relative', top: '-80px', marginLeft: '700px' }} variant="contained" startIcon={<ListAltRoundedIcon />}>
 Afficher la Liste
</Button>
    <Coach />
  </MainCard>
);

export default CoachPage;
