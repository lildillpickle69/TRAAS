import { TAB_SELECTED } from '../constants/ActionTypes';
import { createReducer } from '../utils/';

const initialState = {
  currentTab: 'inprogress',
};

export function selectTab(state, payload) {
  return {
    currentTab: payload.tabName,
  };
}

export default createReducer(initialState, {
  [TAB_SELECTED]: selectTab,
});

