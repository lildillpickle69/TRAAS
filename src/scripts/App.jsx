import React, { Component } from 'react';
import { Label, Menu, Divider, Button} from 'semantic-ui-react';
import AddendumSearch from './Search';
import NotificationButton from './NotificationButton';
 
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
    const { activeItem } = this.state;
    const buttonstyle = {marginLeft: 20};
    // const dividerstyle = {fontFamily: Quicksand, fontSize: 10 };
    return (
      <div>
        <br></br>
        <h1>TRAAS</h1>
        <div>
        <Button style={buttonstyle} primary>New Addendum</Button>
        <NotificationButton content="Notifications" icon = "alarm" onClick={this.handleItemClick} floated='right' rightmargin={20}/>
        </div>
        <Divider horizontal>Technical Reports Addendum Asset Summary</Divider>
        <Menu vertical>
          <Menu.Item name="All Addendums" active={activeItem === 'All Addendums'} onClick={this.handleItemClick}>
            All Addendums
          </Menu.Item>

          <Menu.Item name="Out-of-Tolerance Reports" active={activeItem === 'Out-of-Tolerance Reports'} onClick={this.handleItemClick}>
            Out-of-Tolerance Reports
          </Menu.Item>

          <Menu.Item name="User Guide" active={activeItem === 'User Guide'} onClick={this.handleItemClick}>
            User Guide
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
