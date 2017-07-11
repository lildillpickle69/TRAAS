import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';


export default class AuthorsDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    let options = {};
    axios.get('https://agoquality-tmpw.aero.org/secure/TRAASweb/authors.pl?=')
      .then((response) => {
        options = response.data.results;
      });
    const filterOptions = createFilterOptions({ options });
    return (
      <Select
        name="authors"
        options={options}
        onChange={(selectValue) => this.setState({ selectValue })}
        value={this.state.selectValue}
        filterOptions={filterOptions}
        multi
      />
    );
  }
}
