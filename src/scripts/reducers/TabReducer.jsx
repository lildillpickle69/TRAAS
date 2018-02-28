import { TAB_SELECTED } from '../constants/ActionTypes';
import { createReducer } from '../utils/';

const initialState = {
  currentTab: window.location.href.substr(window.location.href.lastIndexOf('/') + 1),
};

export function selectTab(state, payload) {
  return {
    currentTab: payload.tabName,
  };
}

export default createReducer(initialState, {
  [TAB_SELECTED]: selectTab,
});

