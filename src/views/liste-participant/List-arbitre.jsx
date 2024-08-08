
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Tab from 'ui-component/tableau/Tab';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// ==============================|| SAMPLE PAGE ||============================== //


const ListeArbitre= () => (
   { breadcrumbsClasses: true},

  <MainCard title="Liste des arbitres">
     <Button  style={{ position: 'relative', top: '-80px', marginLeft: '700px' }} variant="outlined" startIcon={<AddIcon/>}>
Ajouter
</Button>
    <Typography variant="body2">
    </Typography>
    <Tab />
  </MainCard>
);

export default ListeArbitre
