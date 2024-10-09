

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import SnackbarCloseReason from 'ui-component/snacbar/Snabar';
import AthleteForm from 'ui-component/form2/formulaire';
import InscriptiontFom from 'ui-component/form2/inscriptionForm';
import { Typography } from 'antd';
import ClubRegistrationForm from 'ui-component/form2/inscriptionForm';
import OptionsPage from 'ui-component/form2/inscriptionForm';
import ClubForm from 'ui-component/form2/clubform';

// ==============================|| SAMPLE PAGE ||============================== //

const ClubPage = () => (
  <MainCard title="Enregistrez un Club" >
    <Button  style={{ position: 'relative', top: '-80px', marginLeft: '700px' }} variant="contained" startIcon={<ListAltRoundedIcon />}>
 Afficher la Liste
</Button>
    <ClubForm />
    
  </MainCard>
);

export default ClubPage;
