
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';// ==============================|| SAMPLE PAGE ||============================== //
import ClubAthleteList from 'ui-component/tableau/AthleteListclub';
import TournamentDraw from 'ui-component/tirage/tirage';

const Tirage = () => (
  <MainCard title="Tirage au sort" >
    <Button  style={{ position: 'relative', top: '-80px', marginLeft: '700px' }} variant="contained" startIcon={<ListAltRoundedIcon />}>
 Afficher les resultats
</Button>
    <TournamentDraw/>

  </MainCard>
);

export default Tirage;
