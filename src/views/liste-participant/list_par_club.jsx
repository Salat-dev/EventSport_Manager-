
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Tab from 'ui-component/tableau/Tab';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArbitreTable from 'ui-component/tableau/arbitreTab';
import { Link } from 'react-router-dom';
import ClubAthleteList from 'ui-component/tableau/AthleteListclub';

// ==============================|| SAMPLE PAGE ||============================== //


const ListeArbitre= () => (
   { breadcrumbsClasses: true},

  <MainCard title="Liste des arbitres">
   
   <Link to="/arbitre">
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
    <ClubAthleteList />
  </MainCard>
);

export default ListeArbitre
