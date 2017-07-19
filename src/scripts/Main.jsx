import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Addendums from './Addendums';
import MainMenu from './MainMenu';
import NewAddendum from './NewAddendum';
// import FinalizedAddendums from './FinalizedAddendums';
// import OOTCReports from './OOTCReports';

const Main = () => (
  <HashRouter basename="/">
    <div>
      <Route path="/" component={MainMenu} />
      {/*<Route exact path ="/" component={}*/}
      <Route path="/Addendums" component={Addendums} />
      
      <Route path="/NewAddendum" component={NewAddendum} />
    </div>
  </HashRouter>
);

export default Main;
