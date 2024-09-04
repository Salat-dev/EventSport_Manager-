
// project imports
import MinimalLayout from 'layout/MinimalLayout';
import EventPage from 'views/landingpage/create_event/create_event';
import LandingPage from 'views/landingpage/landingpage';


// login option 3 routing

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const LandingRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [

    {
      path: 'landingpage',
      element: <LandingPage />
    },
  {
      path: '/create_event',
      element: <EventPage />
    },
  ]
};

export default LandingRoutes;
