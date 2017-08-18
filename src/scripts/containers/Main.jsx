import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MainMenu, NewAddendum, OOTCReports } from '../views';
// import OOTCReports from './OOTCReports';

const Main = () => (
  <HashRouter basename="/">
    <div>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home/inprogress" />} />
        <Route path="/home" component={MainMenu} />
        <Route path="/Addendums/:number" component={NewAddendum} />
        <Route path="/OOTC/:number" component={OOTCReports} />
      </Switch>
    </div>
  </HashRouter>
);

export default Main;
