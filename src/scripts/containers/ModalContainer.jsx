import { connect } from 'react-redux';
import { ModalComponent } from '../components';
import { selectModalState } from '../reducers';
import { toggleModal } from '../actions/';

<<<<<<< HEAD
/* Maps the modal visibility state in the redux store to the visibility state of the individual component */
=======
//Container for the Addendum successfully saved/submitted popup. 
>>>>>>> ae258bf581ec4570271430db7480cb0da134de51
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

