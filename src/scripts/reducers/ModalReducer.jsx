import { TOGGLE_MODAL } from '../constants/ActionTypes';
import { createReducer } from '../utils/';

const initialState = {
  modalvisible: false,
};

export function ToggleModal(state, payload) {
  return {
    modalvisible: payload.modalvisible,
  };
}

export default createReducer(initialState, {
  [TOGGLE_MODAL]: ToggleModal,
});

