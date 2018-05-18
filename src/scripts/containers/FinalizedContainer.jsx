import { connect } from 'react-redux';
import { AddendumGroup } from '../components';

const mapStateToProps = state => ({
  loading: state.cards.loading,
  cards: state.cards.finalized
});

export default connect(mapStateToProps)(AddendumGroup);

