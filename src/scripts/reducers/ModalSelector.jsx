import { createSelector } from 'reselect';

export const selectModal = state => state.modal;

export const selectModalState = createSelector(
  selectModal,
  modal => modal.modalvisible,
);
