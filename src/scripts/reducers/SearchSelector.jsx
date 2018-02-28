import { createSelector } from 'reselect';

export const selectResults = state => state.results;

export const selectResultsArray = createSelector(
  selectResults,
  results => results.results,
);

export const selectValue = createSelector(
  selectResults,
  results => results.value,
);

export const getLoading = createSelector(
  selectResults,
  results => results.searchloading,
);
