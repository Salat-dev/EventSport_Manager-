
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Tab from 'ui-component/tableau/Tab';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CoachTable from 'ui-component/tableau/coachTab';
import { Link } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //


const ListeCoach = () => (
   { breadcrumbsClasses: true},

  <MainCard title="Liste des coach">
    
    <Link to="/coach">
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
    <CoachTable/>
  </MainCard>
);

export default ListeCoach;
