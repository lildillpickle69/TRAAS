import { createSelector } from 'reselect';

export const selectform = state => state.form.addendum.values;
/* Gets form values from the global Redux Store */
export const selectFormValues = createSelector(
  selectform,
  values => values
);
