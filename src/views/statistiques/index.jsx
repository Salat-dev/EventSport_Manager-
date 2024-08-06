import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';

// project imports

import { gridSpacing } from 'store/constant';
import CountCard from './CountCard';
import CountCardCoach from './CountCardCoach';
import CountCardArbitre from './CountCardArbitre';
import CountCardOff from './CountCardOff';



// assets

// ==============================|| DEFAULT SatBoard ||============================== //

const SatBoard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <MainCard title="Sample Card">
   
   
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
          <CountCard isLoading={isLoading}/>
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
          
           <CountCardCoach isLoading={isLoading}/>
          </Grid>
          
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
              <CountCardOff isLoading={isLoading}/>

              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
              <CountCardArbitre isLoading={isLoading}/>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
          
          </Grid>
          <Grid item xs={12} md={4}>
          
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </MainCard>
  );
};

export default SatBoard;
