

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import SnackbarCloseReason from 'ui-component/snacbar/Snabar';
import AthleteForm from 'ui-component/form2/formulaire';
import InscriptiontFom from 'ui-component/form2/inscriptionForm';
import { Typography } from 'antd';

// ==============================|| SAMPLE PAGE ||============================== //

const EquipePage = () => (
  <MainCard title="Enregistrez les Informations de l'athlète" >
    <Button  style={{ position: 'relative', top: '-80px', marginLeft: '700px' }} variant="contained" startIcon={<ListAltRoundedIcon />}>
 Afficher la Liste
</Button>
    <InscriptiontFom />
    <Typography>
     Règle de Paiement: <br /> <br />

     les athlètes devrons s'acquiter de leurs frais de competition et devrons avoir des Licences sportives a jour 
    </Typography>
  </MainCard>
);

export default EquipePage;
