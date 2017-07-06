import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'My Addendums In Progress' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu vertical>
        <Menu.Item name="My Addendums In Progress" active={activeItem === 'My Addendums In Progress'} onClick={this.handleItemClick}>
          My Addendums In Progress
        </Menu.Item>

        <Menu.Item name="My Finalized Addendums" active={activeItem === 'My Finalized Addendums'} onClick={this.handleItemClick}>
          My Finalized Addendums
        </Menu.Item>

        <Menu.Item name="Out-of-Tolerance Reports" active={activeItem === 'Out-of-Tolerance Reports'} onClick={this.handleItemClick}>
          Out-of-Tolerance Reports
        </Menu.Item>

        <Menu.Item name="User Guide" active={activeItem === 'User Guide'} onClick={this.handleItemClick}>
          User Guide
        </Menu.Item>
      </Menu>
    );
  }
}
