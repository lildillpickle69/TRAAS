import { createSelector } from 'reselect';

export const selectdates = state => state.form.addendum.values;

export const selectFormValues = createSelector(
  selectdates,
  values => values,
);
