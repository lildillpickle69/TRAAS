import { connect } from 'react-redux';
import { ModalComponent } from '../components';
import { selectModalState } from '../reducers';
import { toggleModal } from '../actions/';

//Container for the Addendum successfully saved/submitted popup. 
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

