import { SELECT_DATES, SELECT_FOCUS } from '../constants/ActionTypes';

const initialstate = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};
export default function AddendumReducer(state = initialstate, action) {
  switch (action.type) {
    case SELECT_DATES:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    case SELECT_FOCUS:
      return {
        ...state,
        focusedInput: action.payload.focusedInput,
      };
    default:
      return state;
  }
}
