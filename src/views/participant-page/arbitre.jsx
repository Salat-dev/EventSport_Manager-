
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';// ==============================|| SAMPLE PAGE ||============================== //
import ClubAthleteList from 'ui-component/tableau/AthleteListclub';

const ArbitrePage = () => (
  <MainCard title="Enregistrez les Informations de l'arbitre" >
    <Button  style={{ position: 'relative', top: '-80px', marginLeft: '700px' }} variant="contained" startIcon={<ListAltRoundedIcon />}>
 Afficher la Liste
</Button>
    <ClubAthleteList/>

  </MainCard>
);

export default ArbitrePage;
