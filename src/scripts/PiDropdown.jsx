import React, { PureComponent } from 'react';
import axios from 'axios';
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';

export default class PiDropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }
  getOptions(input) {
    return axios
      .get('https://agoquality-tmpw.aero.org/secure/TRAASweb/authors.pl?query=' + input)
      .then((response) => {
        return { options: response.data.results };
      })
      .catch((err) => { console.log(err); });
  }
  // componentDidMount() {
  //   axios
  //     .get('https://agoquality-tmpw.aero.org/secure/TRAASweb/authors.pl?query=')
  //     .then((response) => {
  //       this.setState({
  //         options: response.data.results,
  //       });
  //     })
  //     .catch((err) => { console.log(err); });
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.selectedAuthors !== nextState.selectedAuthors) {
  //     return true;
  //   }
  //   return false;
  // }
  handleChange(selectedPi) {
    console.log([selectedPi].value);
    this.setState({ selectedPi }, () => console.log(this.state.selectedPi));
    this.props.getpi('pi', this.state.selectedPi);
  }
  render() {  
    // const options = this.state.options;
    // const filterOptions = createFilterOptions({ options });
    return (
      <VirtualizedSelect
        async
        clearable
        autofocus
        loadOptions={this.getOptions}
        labelKey="label"
        onChange={this.handleChange}
        value={this.state.selectedPi}
        valueKey="value"
      />
    );
  }
}

