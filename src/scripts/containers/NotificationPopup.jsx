import React from 'react';
import { Popup, Button } from 'semantic-ui-react';

const buttonstyle = { display: 'inline-block', verticalAlign: 'top', marginRight: 20 };

const NotificationPopup = () => (
  <Popup
    trigger={
      <Button
        style={buttonstyle}
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


export default NotificationPopup;
