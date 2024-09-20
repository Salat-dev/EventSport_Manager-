
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Tab from 'ui-component/tableau/Tab';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AthletesTable from 'ui-component/tableau/athleteTab';
import { Link } from 'react-router-dom';
import ListAthlet from 'ui-component/tableau/athleteTab';
import AthleteListTotal from 'ui-component/tableau/AthleteListTotal';
// ==============================|| SAMPLE PAGE ||============================== //


const ListeAthleteTotal = () => (
   { breadcrumbsClasses: true},

  <MainCard title="Liste des athlètes">

     <Link to="/enregistrement">
      <Button 
        type="primary"
        icon={<AddIcon />} 
        variant='outlined'
        style={{ position: 'relative', top: '-80px', marginLeft: '700px' }}
      >
        Ajouter
      </Button>
    </Link>

    <Typography variant="body2">
    </Typography>
    <AthleteListTotal/>
  </MainCard>
);

export default ListeAthleteTotal;
