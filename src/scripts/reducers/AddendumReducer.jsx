import { LOAD_REQUEST, LOAD_RECEIVE, LOAD_FAILURE } from '../constants/ActionTypes';

export default function AddendumReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_RECEIVE:
      return {
        ...state,
        data: action.payload.results,
        loading: false,
      };
    case LOAD_FAILURE:
      console.log('API failed');
      return {
        state,
      };
    default:
      return state;
  }
}