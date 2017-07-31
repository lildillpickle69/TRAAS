import { REQUEST, RECEIVE, FAILURE } from '../constants/ActionTypes';

const initialstate = {
  cards: [],
};
export default function FetchAddendums(state = initialstate, action) {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE:
      return {
        ...state,
        cards: action.payload.results,
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
