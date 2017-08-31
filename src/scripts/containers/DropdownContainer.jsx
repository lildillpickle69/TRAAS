import React, { PureComponent } from 'react';
import axios from 'axios';
import { Form, Message } from 'semantic-ui-react';
import { DropdownComponent, AssetTable } from '../components';

export default class DropdownContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.getOptions = this.getOptions.bind(this);
    this.query = this.props.query;
    this.state = {
      options: [],
    };
    this.assets = [];
  }
  componentDidMount() {
    axios
      .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/${this.query}.pl?limit=0`)
      .then((response) => {
        this.setState({
          options: response.data.results,
        });
      })
      .catch((err) => { console.log(err); });
  }
  getOptions(input) {
    return axios
      .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/${this.query}.pl?limit=1&query=${input}`)
      .then((response) => {
        return { options: response.data.results };
      })
      .catch((err) => { console.log(err); });
  }
  render() {
    if (this.query === 'assets') {
      const val = this.props.input.value;
      if (val !== null && val !== undefined && val instanceof Array) {
        this.assets = val.filter((asset) => {
          const { value } = asset;
          const findAsset = assetname => (assetname.value === value);
          return this.state.options.find(findAsset) !== undefined;
        }).map((asset) => {
          const { value } = asset;
          const findAsset = assetname => (assetname.value === value);
          return (this.state.options.find(findAsset));
        });
      }
    }
    return (
      <div>
          <Form.Field
            error={this.props.meta.error && this.props.meta.touched} 
            loadOptions={this.getOptions}
            {...this.props}
            control={DropdownComponent}
          />
          <Message error visible={this.props.meta.error && this.props.meta.touched} header="Field Required" content="Please fill out this field." />
        {this.query === 'assets' && <AssetTable assets={this.assets} />}
      </div>
    );
  }
}

