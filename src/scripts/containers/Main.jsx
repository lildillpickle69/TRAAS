import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MainMenu, NewAddendum, OOTCReports, SearchResults } from '../views';
// import OOTCReports from './OOTCReports';

const Main = () => (
  <HashRouter basename="/">
    <div>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home/inprogress" />} />
        <Route path="/home" component={MainMenu} />
        <Route exact path="/home" render={() => <Redirect to="/home/inprogress" />} />
        <Route path="/Addendums/:number" component={NewAddendum} />
        <Route path="/OOTC/:number" component={OOTCReports} />
        <Route path="/search/:query" component={SearchResults} />
      </Switch>
    </div>
  </HashRouter>
);

export default Main;
