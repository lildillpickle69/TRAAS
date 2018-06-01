import { connect } from 'react-redux';
import { AddendumGroup } from '../components';

//Container to render each addendumm square in the tabs
const mapStateToProps = state => (
  {
    loading: state.cards.loading,
    cards: state.cards.inprogress
  }
);

export default connect(mapStateToProps)(AddendumGroup);

