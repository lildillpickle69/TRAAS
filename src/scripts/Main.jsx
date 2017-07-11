import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Addendums from './Addendums';
import MainMenu from './MainMenu';
// import FinalizedAddendums from './FinalizedAddendums';
// import OOTCReports from './OOTCReports';

const Main = () => (
  <HashRouter basename="/">
    <div>
      <Route path="/" component={MainMenu} />
      {/*<Route exact path ="/" component={}*/}
      <Route path="/Addendums" component={Addendums} />
    </div>
  </HashRouter>
);

export default Main;
