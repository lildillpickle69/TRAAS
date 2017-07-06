import React, { Component } from 'react';
import { Divider, Grid } from 'semantic-ui-react';
import NotificationPopup from './NotificationPopup';
import NewAddendumButton from './NewAddendumButton';
import SearchAddendums from './SearchAddendums';
import MainMenu from './MainMenu';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    return (
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
        <div>
          <NewAddendumButton />
          <NotificationPopup />
        </div>
        <Divider horizontal>Technical Reports Addendum Asset Summary</Divider>
        <MainMenu />
      </div>
    );
  }
}
