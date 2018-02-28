import React, { PureComponent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ResultsTable from '../components/ResultsTable';

class SearchResults extends PureComponent {
  constructor(props) {
    super(props);
    this.query = this.props.match.params.query;
    this.state = {
      Addendums: [],
      OOTCS: [],
    };
  }
  componentDidMount() {
    axios
      .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/search.pl?search=${this.query}`)
      .then((response) => {
        const Addendums = response.data.results.Addendums.results;
        const OOTCS = response.data.results['OOTC Reports'].results;
        this.setState({
          Addendums,
          OOTCS,
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <ResultsTable results={this.state.Addendums} />
      </div>
    );
  }
}
export default connect()(SearchResults);

