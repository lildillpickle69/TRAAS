import axios from 'axios';
import { TAB_SELECTED, REQUEST, INPROGRESS_RECEIVE, FINALIZED_RECEIVE, FAILURE, SEARCH, RETURN, ERROR, SUBMIT } from '../constants/ActionTypes';


export function selectTab(tabName) {
  return {
    type: TAB_SELECTED,
    payload: { tabName },
  };
}

function request() {
  return {
    type: REQUEST,
  };
}

function inprogressreceive(results) {
  return {
    type: INPROGRESS_RECEIVE,
    payload: {
      results,
    },
  };
}

function finalizedreceive(results) {
  return {
    type: FINALIZED_RECEIVE,
    payload: {
      results,
    },
  };
}

function failure(message) {
  return {
    type: FAILURE,
    payload: {
      message,
    },
  };
}
function search() {
  return {
    type: SEARCH,
  };
}
function submit() {
  return {
    type: SUBMIT,
  };
}
function returnresults(results, value) {
  return {
    type: RETURN,
    payload: {
      results,
      value,
    },
  };
}
function error(message) {
  return {
    type: ERROR,
    payload: {
      message,
    },
  };
}

export function fetchAddendums(badge, inprogress) { // function called to fetch all addendums related to the user
  return function (dispatch) {
    dispatch(request());
    return axios
      .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/fetchaddendums.pl?badge=${badge}&inprogress=${inprogress}`)
      .then((response) => {
        if (response.status >= 400) {
          dispatch(failure('Bad response from server'));
        }
        if (inprogress === 0) {
          return dispatch(inprogressreceive(response.data.results));
        }

        return dispatch(finalizedreceive(response.data.results));
      })
      .catch((err) => { console.log(err); });
  };
}

export function searchAddendums(query) {
  // console.log(query);
  return function (dispatch) {
    dispatch(search());
    return axios
      .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/search.pl?search=${query}&limit=5`)
      .then((response) => {
        if (response.status >= 400) {
          dispatch(error('Bad response from server'));
        }
        return response.data.results;
      })
      .then(results =>
        dispatch(returnresults(results, query)))
      .catch((err) => { console.log(err); });
  };
}

export function handleSubmit(query) {
  return function (dispatch) {
    dispatch(submit());
    window.open(`https://agoquality-tmpw.aero.org/TRAAS/index.php#/search/${query}`);
  };
}
