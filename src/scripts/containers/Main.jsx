import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MainMenu, NewAddendum, Addendums, FinalizedAddendums } from '../views';
// import OOTCReports from './OOTCReports';

const Main = () => (
  <HashRouter basename="/">
    <div>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home/inprogress" />} />
        <Route path="/home" component={MainMenu} />
        <Route exact path="/home/inprogress" component={Addendums} />
        <Route exact path="/home/finalized" componnent={FinalizedAddendums} />
        <Route path="/Addendums/:number" component={NewAddendum} />
      </Switch>
    </div>
  </HashRouter>
);

export default Main;
