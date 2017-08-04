import React, { Component } from 'react';
import { Grid, Divider, Button } from 'semantic-ui-react';
import { Link, Switch, Route } from 'react-router-dom';
import SearchAddendums from '../containers/SearchAddendums';
import TabBarContainer from '../containers/TabBarContainer';
import NotificationPopup from '../containers/NotificationPopup';
import Addendums from './Addendums';
import FinalizedAddendums from './FinalizedAddendums';

const buttonstyle = { marginLeft: 20 };
const badge = document.getElementById('badge').value;

const tabs = [
  { name: 'inprogress', label: 'My Addendums In Progress', linkname: '/home/inprogress' },
  { name: 'finalized', label: 'My Finalized Addendums', linkname: '/home/finalized' },
  { name: 'OOTC', label: 'Out-of-Tolerance Reports', linkname: '/home/OOTCReports' },
];


export default class MainMenu extends Component {
  render() {
    return (
      <div>
        <br />
        <Grid>
          <Grid.Column width={2}>
            <h1><Link to="/home/inprogress">TRAAS</Link></h1>
          </Grid.Column>
          <Grid.Column width={12}>
            <SearchAddendums />
          </Grid.Column>
          <Grid.Column width={2}>
            <h3>{badge}</h3>
          </Grid.Column>
        </Grid>
        <br />
        <Button
          onClick={() => {
            const date = new Date();
            const datestring = date.getFullYear() + (`0${date.getMonth() + 1}`).slice(-2) + (`0${date.getDate()}`).slice(-2) + (`0${date.getHours()}`).slice(-2) + (`0${date.getMinutes()}`).slice(-2) + (`0${date.getSeconds()}`).slice(-2) + badge;
            const newaddendumlink = `#/Addendums/${datestring}`;  
            window.open(newaddendumlink);
          }}
          style={buttonstyle}
          primary
          content="New Addendum"
        />
        <NotificationPopup />
        <br />
        <Divider horizontal>Technical Reports Addendum Asset Summary</Divider>
        <TabBarContainer tabs={tabs} />
        <Switch>
          <Route exact path="/home/inprogress" component={Addendums} />
          <Route exact path="/home/finalized" component={FinalizedAddendums} />
        </Switch>
      </div>
    );
  }
}

