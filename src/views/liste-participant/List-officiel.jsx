
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Tab from 'ui-component/tableau/Tab';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import OfficielsTable from 'ui-component/tableau/officielTab';
import { Link } from 'react-router-dom';
import OfficialList from 'ui-component/tableau/officielTab';
// ==============================|| SAMPLE PAGE ||============================== //


const ListeOfficiel
 = () => (
   { breadcrumbsClasses: true},

  <MainCard title="Liste des officiels">
      <Link to="/officiel">
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
    <OfficialList />
  </MainCard>
);

export default ListeOfficiel
;
