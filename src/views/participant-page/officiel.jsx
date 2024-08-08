
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';// ==============================|| SAMPLE PAGE ||============================== //
import OfficielForm from 'ui-component/form2/formulaire-officiels';

const OfficielPage = () => (
  <MainCard title="Enregistrez les Informations de l'officiel" >
    <Button  style={{ position: 'relative', top: '-80px', marginLeft: '700px' }} variant="contained" startIcon={<ListAltRoundedIcon />}>
 Afficher la Liste
</Button>
    <OfficielForm />
  </MainCard>
);

export default OfficielPage;
