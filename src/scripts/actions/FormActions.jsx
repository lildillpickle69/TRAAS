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

export function addKeyword(name) {
  return {
    type: types.ADD_KEYWORD,
    name,
  };
}

export function selectDates({ startDate, endDate }) {
  return {
    type: types.SELECT_DATES,
    payload: { startDate, endDate },
  };
}
export function selectFocus(focusedInput) {
  return {
    type: types.SELECT_FOCUS,
    payload: { focusedInput },
  };
}

