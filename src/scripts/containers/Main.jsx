import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MainMenu, NewAddendum, OOTCReports, SearchResults } from '../views';


// File to render various routes/suburls of TRAAS. Only modify if you plan on adding more routes, DO NOT MODIFY OTHERWISE!
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
