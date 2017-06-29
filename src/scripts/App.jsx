import React, { Component } from 'react';
import { Label, Menu, Button } from 'semantic-ui-react';
import AddendumSearch from './Search';

 
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


    return (
      <div>
        <h1>TRAAS</h1>
        <Button primary>New Addendum</Button>
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
