
// project imports
import MinimalLayout from 'layout/MinimalLayout';
import AuthenticationForm from 'ui-component/form2/Authentification';
import RegistrationForm from 'ui-component/form2/Registration';
//import TicketManager from 'ui-component/form2/ticket';
import AthletesGrid from 'views/landingpage/athlete-grid';
import EventPage from 'views/landingpage/create_event/create_event';
import LandingPage from 'views/landingpage/landingpage';
import EventInfo from 'views/landingpage/sport-news';
import KarateScorePanel from 'views/panel/panel';


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
      path: 'athlete-grid',
      element: <AthletesGrid />
    },
    
    {
      path: '/',
      element: <KarateScorePanel />
    },
    {
      path: 'sport-news',
      element: <EventInfo/>
    },
  ]
};

export default LandingRoutes;
