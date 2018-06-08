import { REQUEST, INPROGRESS_RECEIVE, FINALIZED_RECEIVE, FAILURE } from '../constants/ActionTypes';

// Sets redux state of the inprogress/finalized addendums
const initialstate = {
  inprogress: [],
  finalized: [],
};
export default function FetchAddendums(state = initialstate, action) {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INPROGRESS_RECEIVE:
      return {
        ...state,
        inprogress: action.payload.results,
        loading: false,
      };
    case FINALIZED_RECEIVE:
      return {
        ...state,
        finalized: action.payload.results,
        loading: false,
      };
    case FAILURE:
      console.log('API failed');
      return {
        state,
      };
    default:
      return state;
  }
}
