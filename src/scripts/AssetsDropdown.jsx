import React, { PureComponent } from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import axios from 'axios';

export default class AssetsDropdown extends PureComponent {
  constructor(props) { 
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  // componentDidMount() {
  //   axios
  //     .get('https://agoquality-tmpw.aero.org/secure/TRAASweb/assets.pl?query=')
  //     .then((response) => {
  //       this.setState({
  //         options: response.data.results,
  //       });
  //     })
  //     .catch((err) => { console.log(err); });
  // }
  getOptions(input) {
    return axios
      .get('https://agoquality-tmpw.aero.org/secure/TRAASweb/assets.pl?query=' + input)
      .then((response) => {
        return { options: response.data.results };
      })
      .catch((err) => { console.log(err); });
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.selectedAssets !== nextState.selectedAssets) {
  //     return true;
  //   }
  //   return false;
  // }
  handleChange(selectedAssets) {
    this.setState({ selectedAssets }, () => this.props.getassets('assets', selectedAssets));
  }
  render() {
    // const options = this.state.options;
    // const filterOptions = createFilterOptions({ options });        
    return (
      <VirtualizedSelect
        async
        autofocus
        clearable
        labelKey="label"
        loadOptions={this.getOptions}
        multi
        onChange={this.handleChange}
        value={this.state.selectedAssets}
        valueKey="value"
      />
    );
  }
}
