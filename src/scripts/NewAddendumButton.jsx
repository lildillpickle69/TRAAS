import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class NewAddendumButton extends Component {
  constructor(props) {
    super(props);
    this.buttonstyle = { display: 'inline-block', verticalAlign: 'top', marginLeft: 20 };
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick() {
    this.window.location('www.google.com');
  }
  render() {
    return (
      <a href="CreateAddendum.html" target="_blank">
        <Button
          primary
          style={this.buttonstyle}
          content="New Addendum"
          onClick={this.handleItemClick}
        />
      </a>
    );
  }
}

NewAddendumButton.propTypes = {

};
NewAddendumButton.defaultprops = {
};

export default NewAddendumButton;
