import { connect } from 'react-redux';
import { SearchBar } from '../components';
import { searchAddendums, handleSubmit } from '../actions/';
import { selectResultsArray, getLoading, selectValue } from '../reducers';

//Container for the main search bar.
const mapStateToProps = (state) => {
  const results = selectResultsArray(state);
  const searchloading = getLoading(state);
  const value = selectValue(state);
  return { results, searchloading, value };
};

const mapDispatchToProps = dispatch => (
  {
    onSearchChange: (query) => {
      dispatch(searchAddendums(query));
    },
    onSearchQuery: (query) => {
      dispatch(handleSubmit(query));
    },
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

