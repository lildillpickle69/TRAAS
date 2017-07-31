import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tabReducer from './TabReducer';
import FetchAddendums from './FetchAddendums';
import SearchReducer from './SearchReducer';
import AddendumReducer from './AddendumReducer';
import { reduceReducers } from '../utils';

const reducedform = reduceReducers(formReducer, AddendumReducer);
const RootReducer = combineReducers({ tabs: tabReducer,
  cards: FetchAddendums,
  results: SearchReducer,
  form: reducedform });
export { FetchAddendums } from './FetchAddendums';
export * from './TabSelector';
export * from './SearchSelector';
export * from './AddendumSelector';
export { SearchReducer } from './SearchReducer';
export { AddendumReducer } from './AddendumReducer';
export default RootReducer;
