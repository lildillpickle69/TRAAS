import axios from 'axios';
import { TAB_SELECTED, REQUEST, RECEIVE, FAILURE, SEARCH, RETURN, ERROR } from '../constants/ActionTypes';


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

function receive(results) {
  return {
    type: RECEIVE,
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

export function fetchAddendums(badge, inprogress) {
  return function (dispatch) {
    dispatch(request());
    return axios
      .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/fetchaddendums.pl?badge=${badge}&inprogress=${inprogress}`)
      .then((response) => {
        if (response.status >= 400) {
          dispatch(failure('Bad response from server'));
        }
        return response.data.results;
      })
      .then(results =>
        dispatch(receive(results)))
      .catch((err) => { console.log(err); });
  };
}

export function searchAddendums(query) {
  // console.log(query);
  return function (dispatch) {
    dispatch(search());
    return axios
      .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/search.pl?search=${query}`)
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
