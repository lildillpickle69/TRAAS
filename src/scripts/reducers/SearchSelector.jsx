import { createSelector } from 'reselect';

/* Gets necessary states from the Redux store for the search component */

export const selectResults = state => state.results;

/* Array of search results */
export const selectResultsArray = createSelector(
  selectResults,
  results => results.results
);
/* Value in the search bar */
export const selectValue = createSelector(
  selectResults,
  results => results.value
);
/* Whether or not the search is done loading */
export const getLoading = createSelector(
  selectResults,
  results => results.searchloading
);
