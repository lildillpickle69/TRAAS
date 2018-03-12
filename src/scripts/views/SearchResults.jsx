import React, { PureComponent } from 'react';
import axios from 'axios';
import { Loader, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AddendumPages from '../containers/AddendumPages';

class SearchResults extends PureComponent {
  constructor(props) {
    super(props);
    this.query = this.props.match.params.query;
    this.state = {
      Addendums: [],
      OOTCS: [],
      loaded: false,
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
          loaded: true,
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <Dimmer active={!this.state.loaded} inverted>
          <Loader content="loading" />
        </Dimmer>
        <AddendumPages addendumresults={this.state.Addendums} ootcresults={this.state.OOTCS} />
      </div>
    );
  }
}
export default connect()(SearchResults);

