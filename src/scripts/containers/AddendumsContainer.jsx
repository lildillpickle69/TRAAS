import { connect } from 'react-redux';
import { AddendumGroup } from '../components';
import { fetchAddendums } from '../actions/';

const badge = document.getElementById('badge').value;
const inprogress = 0;
const mapStateToProps = (state) => {
  return {
    loading: state.cards.loading,
    cards: state.cards };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInprogress: (
      dispatch(fetchAddendums(badge, inprogress))
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddendumGroup);

