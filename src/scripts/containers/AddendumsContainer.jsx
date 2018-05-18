import { connect } from 'react-redux';
import { AddendumGroup } from '../components';

const mapStateToProps = state => (
  {
    loading: state.cards.loading,
    cards: state.cards.inprogress
  }
);

export default connect(mapStateToProps)(AddendumGroup);

