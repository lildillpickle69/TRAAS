import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

export default class SearchAddendums extends Component {
  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
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

    setTimeout(() => {
      if (this.state.value.length < 1) {
        return this.resetComponent();
      }

      this.setState({
        isLoading: false,
      });
    }, 500);
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        size="huge"
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        fluid
      />
    );
  }
}
