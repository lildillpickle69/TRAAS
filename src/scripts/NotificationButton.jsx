import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';


class NotificationButton extends React.Component {
    constructor(props) {
        super(props);
        this.buttonstyle = {display: 'inline-block', verticalAlign: 'top', marginRight: this.props.rightmargin, marginLeft: this.props.leftmargin};
    }
    
    render() {    
        return(
                <Button style={this.buttonstyle} content={this.props.content} icon={this.props.icon} labelPosition={this.props.labelPosition} floated={this.props.floated}/>
            );
    }
}

NotificationButton.propTypes = {
    content: React.PropTypes.string,
    icon: React.PropTypes.string,
    labelPosition: React.PropTypes.string,
    floated: React.PropTypes.string,
    leftmargin: React.PropTypes.number,
    rightmargin: React.PropTypes.number
};
NotificationButton.defaultprops = {
    content: '',
    icon: '',
    labelPosition: 'left',
    floated: 'left',
    leftmargin: 0,
    rightmargin: 0
};

export default NotificationButton;
