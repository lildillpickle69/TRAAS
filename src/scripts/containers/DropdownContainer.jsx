import React, { PureComponent } from 'react';
import axios from 'axios';
import { Form, Message } from 'semantic-ui-react';
import { DropdownComponent, AssetTable } from '../components';

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

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

