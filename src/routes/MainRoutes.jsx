import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import CoachPage from 'views/participant-page/coach';
import OfficielPage from 'views/participant-page/officiel';
import ArbitrePage from 'views/participant-page/arbitre';
import StatBoard from 'views/statistiques';
import ListeAthlete from 'views/liste-participant/List-athlete';
import Tirage from 'views/Tirage_au_sort/draws';
import ListeArbitre from 'views/liste-participant/List-arbitre';
import ListeCoach from 'views/liste-participant/List-coach';
import ListeOfficiel from 'views/liste-participant/List-officiel';
import EventPage from 'views/participant-page/evenement';
import EquipePage from 'views/participant-page/equipe';
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
      element: <StatBoard />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <StatBoard />
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
         path: 'equipe',
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
    path: 'List-athlete',
    element: <ListeAthlete />
  },
  ,
  {
    path: 'List-arbitre',
    element: <ListeArbitre />
  },
  ,
  {
    path: 'List-coach',
    element: <ListeCoach />
  },
  ,
  {
    path: 'List-officiel',
    element: <ListeOfficiel />
  },
  {
    path: 'draws',
    element: <Tirage/>
  }
  
    
  ]
};

export default MainRoutes;
