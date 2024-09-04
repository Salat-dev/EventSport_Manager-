

// project imports
import MainCard from 'ui-component/cards/MainCard';
import MenueList from './landing-Compent';
import CarouselComponent from './carousel-component';
import CardComponent from './card-component';
import StepPart from './steps';
import ListItems from './List';
import Features from './features';
import EventList from './List';

const LandingPage = () => (
  <MainCard >
   <MenueList /> 
   <CarouselComponent style={{ padding: '50px' }} />
  <StepPart/>
  <EventList />

  </MainCard>
);

export default LandingPage;
