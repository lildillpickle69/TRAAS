import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';

export default class AuthorsDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      filterOption
    };
  }
  componentDidMount() {
    axios
      .get('https://agoquality-tmpw.aero.org/secure/TRAASweb/authors.pl?=')
      .then(function (response) {
        console.log(response);
        console.log(response.data.results);
        setState({
          options: response.data.results,
          filterOptions: createFilterOptions(this.state.options),
        });
      })
      .catch((err) => { console.log(err); }); 
  }
  render() {
    return (
      <Select
        name="authors"
        options={this.state.options}
        onChange={(selectValue) => this.setState({ selectValue })}
        value={this.state.selectValue}
        filterOptions={this.state.filterOptions}
        multi
      />
    );
  }
}
