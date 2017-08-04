import { createSelector } from 'reselect';

export const selectform = state => state.form.addendum.values;

export const selectFormValues = createSelector(
  selectform,
  values => values,
);
