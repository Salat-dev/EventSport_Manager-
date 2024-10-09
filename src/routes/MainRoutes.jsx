import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import CoachPage from 'views/participant-page/coach';
import OfficielPage from 'views/participant-page/officiel';
import ArbitrePage from 'views/participant-page/arbitre';
import Dashboard from 'views/statistiques';
import ListeAthlete from 'views/liste-participant/List-athlete';
//import Tirage from 'views/Tirage_au_sort/liste_option';
import ListeArbitre from 'views/liste-participant/list_par_club';
import ListeCoach from 'views/liste-participant/List-coach';
import ListeOfficiel from 'views/liste-participant/List-officiel';
import EventPage from 'views/participant-page/evenement';
import KarateScorePanel from 'views/panel/panel';
import TournamentBracket from 'views/panel/tirage';
import EventPageList from 'views/liste-participant/evenements';
import CalendarPage from 'views/calendar/calendar';
import CalendarEventPage from 'views/calendar/evenement_list';
import EquipePage from 'views/participant-page/enregistrement';
import ClubPage from 'views/participant-page/club_registration';
import ListeAthleteTotal from 'views/liste-participant/list_total_athlete';
import TiketPageCustom from 'views/liste-participant/TicketCustom/TicketPage';
import TiketlandingPage from 'views/liste-participant/TicketCustom/evenement_ticket';
import Tirage from 'views/panel/tirage';
import ListeCategorie from 'views/liste-participant/list_par_categories';
//import AthletePage from 'views/participant/athletes';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const AthletePage = Loadable(lazy(() => import('views/participant-page/athletes')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <Dashboard />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'evenement_list',
          element: <CalendarEventPage />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
     {
      path: '/',
      children: [
        {
          path: 'athletes',
          element: <AthletePage />
        }
      ]
    },
     {
      path: '/',
      children: [
        {
          path: 'coach',
          element: <CoachPage />
        }
      ]
    },
     {
      path: '/',
      children: [
        {
          path: 'evenement',
          element: <EventPage />
        }
      ]
    },
    {
     path: '/',
     children: [
       {
         path: 'officiel',
         element: <OfficielPage />
       }
     ]
   },
   ,
    {
     path: '/',
     children: [
       {
         path: 'enregistrement',
         element: <EquipePage />
       }
     ]
   },
   {
    path: '/',
    children: [
      {
        path: 'arbitre',
        element: <ArbitrePage />
      }
    ]
  },
  {
    path: '/',
    children: [
      {
        path: 'panel',
        element: <KarateScorePanel />
      }
    ]
  },
  {
    path: '/',
    children: [
      {
        path: 'evenements',
        element: <EventPageList />
      }
    ]
  },

  {
    path: '/',
    children: [
      {
        path: 'club_registration',
        element: <ClubPage/>
      }
    ]
  },


  {
    path: '/',
    children: [
      {
        path: 'calendar',
        element: <CalendarPage/>
      }
    ]
  },
  {
    path: 'List-athlete',
    element: <ListeAthlete />
  },
  {
    path: 'list_total_athlete',
    element: <ListeAthleteTotal />
  },
  
  
  {
    path: 'list_par_club',
    element: <ListeArbitre />
  },
  
  {
    path: 'List-coach',
    element: <ListeCoach />
  },
  {
    path: 'List-officiel',
    element: <ListeOfficiel />
  }
  ,
  {
    path: 'TicketPage',
    element: <TiketPageCustom />
  }
  ,
  {
    path: 'evenement_ticket',
    element: <TiketlandingPage />
  },
  {
    path: 'tirage',
    element: <Tirage />
  }
  ,
  {
    path: 'list_par_categories',
    element: <ListeCategorie />
  }
    
  ]
};

export default MainRoutes;
