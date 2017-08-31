import { ADD_ASSET } from '../constants/ActionTypes';

export default function AssetReducer(state = {}, action) {
  switch (action.type) {
    case ADD_ASSET:
      return {
        state: action.payload.results,
      };
    default:
      return state;
  }
}
