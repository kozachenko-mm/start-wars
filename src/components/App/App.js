import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Home from '../../pages/Home/Home';
import Films from '../../pages/Films/Films';
import FilmsDetails from '../../pages/FilmsDetails/FilmsDetails';
import People from '../../pages/People/People';
import PeopleDetails from '../../pages/PeopleDetails/PeopleDetails';
import Planets from '../../pages/Planets/Planets';
import PlanetsDetails from '../../pages/PlanetsDetails/PlanetsDetails';
import Species from '../../pages/Species/Species';
import SpeciesDetails from '../../pages/SpeciesDetails/SpeciesDetails';
import Starships from '../../pages/Starships/Starships';
import StarshipsDetails from '../../pages/StarshipsDetails/StarshipsDetails';
import Vehicles from '../../pages/Vehicles/Vehicles';
import VehiclesDetails from '../../pages/VehiclesDetails/VehiclesDetails';
import style from './App.module.css';

const App = () => {
  return (
    <div className={style.wrapper}>
      <Nav />
      <main className={style.main}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/films/:id" component={FilmsDetails} />
          <Route path="/films" component={Films} />
          <Route path="/people/:id" component={PeopleDetails} />
          <Route path="/people" component={People} />
          <Route path="/planets/:id" component={PlanetsDetails} />
          <Route path="/planets" component={Planets} />
          <Route path="/species/:id" component={SpeciesDetails} />
          <Route path="/species" component={Species} />
          <Route path="/starships/:id" component={StarshipsDetails} />
          <Route path="/starships" component={Starships} />
          <Route path="/vehicles/:id" component={VehiclesDetails} />
          <Route path="/vehicles" component={Vehicles} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
};

export default App;
