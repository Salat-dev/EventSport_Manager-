// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

import LoGo5 from '../ui-component/LoGo5.png';
import LOGO from './LOGO.png'

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    
  //    <img src={LoGo5} alt="Berry" width="70" height="70"/>
<img src={LOGO} alt="Berry" width="30%" />
 
 
   
  );
};

export default Logo;
