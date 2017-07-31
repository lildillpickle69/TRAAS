import { connect } from 'react-redux';
import { SearchBar } from '../components';
import { searchAddendums } from '../actions/';
import { selectResultsArray, getLoading } from '../reducers';

const mapStateToProps = (state) => {
  const results = selectResultsArray(state);
  const searchloading = getLoading(state);
  // console.log(results);
  return { results, searchloading };
};

const mapDispatchToProps = (dispatch) => { 
  return {
    onSearchChange: (query) => {
      dispatch(searchAddendums(query));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

