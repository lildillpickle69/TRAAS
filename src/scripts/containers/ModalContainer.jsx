import { connect } from 'react-redux';
import { ModalComponent } from '../components';
import { selectModalState } from '../reducers';
import { toggleModal } from '../actions/';

/* Maps the modal visibility state in the redux store to the visibility state of the individual component */
const mapState = (state) => {
  const modalvisible = selectModalState(state);
  return { modalvisible };
};

const mapDispatchToProps = dispatch => (
  {
    onClick: () => {
      dispatch(toggleModal(false));
    },
  }
);

export default connect(mapState, mapDispatchToProps)(ModalComponent);

