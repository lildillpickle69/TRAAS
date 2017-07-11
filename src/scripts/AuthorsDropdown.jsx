import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-virtualized-select';
// import createFilterOptions from 'react-select-fast-filter-options';

export default class AuthorsDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAuthor: null,
      options: null,
    };
  }
  componentDidMount() {
    axios
      .get('https://agoquality-tmpw.aero.org/secure/TRAASweb/authors.pl?=')
      .then((response) => {
        this.setState({
          options: response.data.results,
        });
      })
      .catch((err) => { console.log(err); });
  }
  render() {
    return (
      <Select
        autofocus
        clearable
        labelKey="label"
        multi
        onChange={(selectedAuthor) => this.setState({ selectedAuthor })}
        options={this.state.options}
        searchable
        simpleValue
        value={this.state.selectedAuthor}
        valueKey="value"
      />
    );
  }
}

