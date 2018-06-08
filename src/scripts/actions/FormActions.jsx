import axios from 'axios';
import * as types from '../constants/ActionTypes';

/* The following four functions just modify the state of the array containing the corresponding form data. */
export function addAsset(name) {
  return {
    type: types.ADD_ASSET,
    payload: { name },
  };
}

export function addAuthor(name) {
  return {
    type: types.ADD_AUTHOR,
    name,
  };
}

export function addPI(name) {
  return {
    type: types.ADD_PI,
    payload: { name },
  };
}

export function addKeyword(name) {
  return {
    type: types.ADD_KEYWORD,
    name,
  };
}
/* Called to fire an ajax request to the server to load the addendum data. Calls the LOAD_Request event on AddendumReducer
to set the loading state to be true. */
function loadRequest() {
  return {
    type: types.LOAD_REQUEST,
  };
}

/* Called when payload is successfuly received. Then fires the LOAD_RECEIVE event on AddendumReducer, and sets the "data" state in the
Redux state to that of the payload. */
function loadReceive(results) {
  return {
    type: types.LOAD_RECEIVE,
    payload: {
      results,
    },
  };
}
/* Called when ajax request fails. */
function loadFailure(message) {
  return {
    type: types.LOAD_FAILURE,
    payload: {
      message,
    },
  };
}
export function loadData(id) { // Function called to load addendum data from database
  return function (dispatch) {
    dispatch(loadRequest()); // Call the loadRequest function to fetch the data.
    return axios
      .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/data.pl?query=${id}`) // Ajax request
      .then((response) => {
        if (response.status >= 400) {
          dispatch(loadFailure('Bad response from server')); // If ajax request fails
        }
        let data = response.data.results[0];
        data.interval_start = !('interval_start' in data) ? null : new Date(data.interval_start); // some Date formatting
        data.interval_end = !('interval_end' in data) ? null : new Date(data.interval_end);
        return data; 
      })
      .then(results =>
        dispatch(loadReceive(results))) // Once data is sucessfully received, call loadReceive function.
      .catch((err) => { console.log(err); });
  };
}
// Function to set modal visibility state.
export function toggleModal(modalvisible) {
  return {
    type: types.TOGGLE_MODAL,
    payload: {
      modalvisible,
    },
  };
}
