import { connect } from 'react-redux';
import { AddendumGroup } from '../components';
import { fetchAddendums } from '../actions/';

const badge = document.getElementById('badge').value;
// const badge = 28479;

const mapStateToProps = (state) => {
  return {
    loading: state.cards.loading,
    cards: state.cards.inprogress };
};

export default connect(mapStateToProps)(AddendumGroup);

