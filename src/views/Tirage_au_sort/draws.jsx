
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TirageAuSort from 'ui-component/Draws/draws';

// ==============================|| SAMPLE PAGE ||============================== //

const equipes = ['Équipe A', 'Équipe B', 'Équipe C', 'Équipe D'];
const Tirage = () => (
  <MainCard title="Sample Card">
    <Typography variant="body2">
      Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
      minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended
      in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate
      descent molls anim id est labours.
    </Typography>
    <TirageAuSort equipes={equipes} />
  </MainCard>
);

export default Tirage;
