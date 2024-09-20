
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Tab from 'ui-component/tableau/Tab';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AthletesTable from 'ui-component/tableau/athleteTab';
import { Link } from 'react-router-dom';
import ListAthlet from 'ui-component/tableau/athleteTab';
// ==============================|| SAMPLE PAGE ||============================== //


const ListeAthlete = () => (
   { breadcrumbsClasses: true},

  <MainCard title="Liste des athlètes">

     <Link to="/athletes">
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
    <ListAthlet/>
  </MainCard>
);

export default ListeAthlete;
