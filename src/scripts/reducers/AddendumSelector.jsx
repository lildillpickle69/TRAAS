import { createSelector } from 'reselect';

export const selectForm = state => state.form;

export const selectStartDate = createSelector(
  selectForm,
  form => form.startDate,
);

export const selectEndDate = createSelector(
  selectForm,
  form => form.endDate,
);

export const selectFocusedInput = createSelector(
  selectForm,
  form => form.focusedInput,
);
