import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import LandingRoutes from './LandndingRoutes';
// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes,AuthenticationRoutes, LandingRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
