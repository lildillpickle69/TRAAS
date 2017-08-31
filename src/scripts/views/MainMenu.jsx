import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid, Divider, Button, Message } from 'semantic-ui-react';
import { Link, Switch, Route } from 'react-router-dom';
import SearchAddendums from '../containers/SearchAddendums';
import TabBarContainer from '../containers/TabBarContainer';
import Addendums from './Addendums';
import FinalizedAddendums from './FinalizedAddendums';
import { selectTab } from '../actions';
import OOTCNotifications from './OOTCNotifications';

const buttonstyle = { marginLeft: 20 };
const badge = document.getElementById('badge').value;

const tabs = [
  { name: 'inprogress', label: 'My Addendums In Progress', linkname: '/home/inprogress' },
  { name: 'finalized', label: 'My Finalized Addendums', linkname: '/home/finalized' },
  { name: 'OOTCNotifications', label: 'Out-of-Tolerance Reports', linkname: '/home/OOTCNotifications' },
];

// const style2 = { left: '43%', textAlign: 'center' };
const style = { textAlign: 'center' };
class MainMenu extends PureComponent {
  render() {
    return (
      <div>
        <br />
        <Grid>
          <Grid.Column width={2}>
            <h1><Link to="/home/inprogress" onClick={() => { this.props.dispatch(selectTab('inprogress')); }}>TRAAS</Link></h1>
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
        <br />
        <Divider horizontal>Technical Reports Addendum Asset Summary and Out-Of-Tolerance Condition Database</Divider>
        <Grid centered columns={2}>
          <Grid.Column>
            <Message compact positive style={style} header="Beta" content="Please note that this is a beta version. All addendums created here will not be visible once this goes live." />
          </Grid.Column>
        </Grid>
        <TabBarContainer tabs={tabs} />
        <Switch>
          <Route exact path="/home/inprogress" component={Addendums} />
          <Route exact path="/home/finalized" component={FinalizedAddendums} />
          <Route exact path="/home/OOTCNotifications" component={OOTCNotifications} />
        </Switch>
      </div>
    );
  }
}

export default connect()(MainMenu);
