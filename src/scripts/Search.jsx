import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

export default class AddendumSearch extends Component {
  componentWillMount() {
    this.resetComponent();
  }
  resetComponent() {
    this.setState({ isLoading: false, results: [], value: '' });
  }
  handleResultSelect(e, result) {
    this.setState({ value: result.title });
  }
  handleSearchChange(e, value) {
    this.setState({ isLoading: true, value });
  }
}
