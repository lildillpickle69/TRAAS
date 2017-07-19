import React, { Component } from 'react';
import { Menu, Grid, Divider, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SearchAddendums from './SearchAddendums';
import NotificationPopup from './NotificationPopup';


export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { badge: document.getElementById('badge').value };
    this.handleItemClick = this.handleItemClick.bind(this);
    
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }
  handleOOTC() {

  }

  render() {
    const { activeItem } = this.state;
    const buttonstyle = { marginLeft: 20 };
    return (
      <div>
        <br />
        <Grid>
          <Grid.Column width={2}>
            <h1><Link to="/">TRAAS</Link></h1>
          </Grid.Column>
          <Grid.Column width={12}>
            <SearchAddendums />
          </Grid.Column>
          <Grid.Column width={2}>
            <h3>{this.state.badge}</h3>
          </Grid.Column>
        </Grid>
        <br />
        <Menu.Item as={Link} to="/NewAddendum" active={activeItem === 'My Addendums In Progress'} onClick={this.handleItemClick}><Button style={buttonstyle} primary>New Addendum</Button>
        </Menu.Item>
        <NotificationPopup />
        <br />
        <Divider horizontal>Technical Reports Addendum Asset Summary</Divider> 
        <Menu fluid tabular>
          <Menu.Item
            as={Link}
            to="/Addendums"
            name="My Addendums In Progress"
            active={activeItem === 'My Addendums In Progress'}
            onClick={this.handleItemClick}
          >
            My Addendums in Progress
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/FinalizedAddendums"
            name="My Finalized Addendums"
            active={activeItem === 'My Finalized Addendums'}
            onClick={this.handleItemClick}
          >
            My Finalized Addendums
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/OOTCReports"
            name="Out-of-Tolerance Reports"
            active={activeItem === 'Out-of-Tolerance Reports'}
            onClick={this.handleItemClick}
          >
          Out-of-Tolerance Reports
          </Menu.Item>
          <Menu.Item href="https://aerolink.aero.org/cs/llisapi.dll?func=ll&objaction=overview&objid=39516303" target="_blank">User Guide</Menu.Item>
        </Menu>
      </div>
    ); 
  }
}
