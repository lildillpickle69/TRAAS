import { SEARCH, RETURN, ERROR } from '../constants/ActionTypes';

const initialstate = {
  results: [],
};
export default function SearchAddendums(state = initialstate, action) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        searchloading: true,
      };
    case RETURN:
      // console.log(action.payload.results);
      return {
        ...state,
        value: action.payload.value,
        results: action.payload.results,
        searchloading: false,
      };
    case ERROR:
      console.log('API failed');
      return {
        state,
      };
    default:
      return state;
  }
}
