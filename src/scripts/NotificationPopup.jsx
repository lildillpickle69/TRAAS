import React, { Component } from 'react';
import { Popup, Button } from 'semantic-ui-react';

class NotificationPopup extends Component {
  constructor(props) {
    super(props);
    this.buttonstyle = { display: 'inline-block', verticalAlign: 'top', marginRight: 20 };
  }
  render() {
    return (
      <Popup
        trigger={
          <Button
            style={this.buttonstyle}
            content="Notifications"
            icon="alarm"
            labelPosition="left"
            floated="right"
          />
        }
        content="No new notifications."
        on="click"
        position="bottom right"
      />
    );
  }
}

export default NotificationPopup;
