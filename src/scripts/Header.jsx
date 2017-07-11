import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import Addendums from './Addendums';
import NotificationPopup from './NotificationPopup';
import SearchAddendums from './SearchAddendums';
import MainMenu from './MainMenu';

const Main = () => (
  <div>
    <br />
    <Grid>
      <Grid.Column width={2}>
        <h1>TRAAS</h1>
      </Grid.Column>
      <Grid.Column width={12}>
        <SearchAddendums />
      </Grid.Column>
      <Grid.Column width={2}>
        <h3>Badge Number</h3>
      </Grid.Column>
    </Grid>
    <br />
    <br />
    <div>
      <Route path="/Addendums"component={Addendums} />
      <NotificationPopup />
    </div>
    <Divider horizontal>Technical Reports Addendum Asset Summary</Divider>
    <Route exact path="/" component={MainMenu} />
  </div>
);

export default Main;

