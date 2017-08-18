import React, { PureComponent } from 'react';
import axios from 'axios';
import { Form, Message } from 'semantic-ui-react';
import { DropdownComponent } from '../components';

export default class DropdownContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.getOptions = this.getOptions.bind(this);
    this.onChange = this.onChange.bind(this);
    this.query = this.props.query;
  }
  getOptions(input) {
    return axios
      .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/${this.query}.pl?query=${input}`)
      .then((response) => {
        return { options: response.data.results };
      })
      .catch((err) => { console.log(err); });
  }
  onChange(event) {
    // console.log(event)
    if (this.props.input.onChange && event != null) {
      // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
      this.props.input.onChange(event.value);
    } else {
      // Clear the input field
      this.props.input.onChange(null);
    }
  }
  render() {
    return (
      <div>
        <Form.Field error={this.props.meta.error && this.props.meta.touched} loadOptions={this.getOptions} {...this.props} control={DropdownComponent} onChange={this.onChange} />
        <Message error visible={this.props.meta.error && this.props.meta.touched} header="Field Required" content="Please fill out this field." />
      </div>
    );
  }
}

