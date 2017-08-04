import axios from 'axios';
import * as types from '../constants/ActionTypes';

export function addAsset(name) {
  return {
    type: types.ADD_ASSET,
    name,
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

function loadRequest() {
  return {
    type: types.LOAD_REQUEST,
  };
}

function loadReceive(results) {
  return {
    type: types.LOAD_RECEIVE,
    payload: {
      results,
    },
  };
}

function loadFailure(message) {
  return {
    type: types.LOAD_FAILURE,
    payload: {
      message,
    },
  };
}

export function loadData(id) {
  return function (dispatch) {
    dispatch(loadRequest());
    return axios
      .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/data.pl?query=${id}`)
      .then((response) => {
        if (response.status >= 400) {
          dispatch(loadFailure('Bad response from server'));
        }
        return response.data.results[0];
      })
      .then(results =>
        dispatch(loadReceive(results)))
      .catch((err) => { console.log(err); });
  };
}
export function toggleModal(modalvisible) {
  return {
    type: types.TOGGLE_MODAL,
    payload: {
      modalvisible,
    },
  };
}
