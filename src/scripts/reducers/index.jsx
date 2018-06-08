// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tabReducer from './TabReducer';
import FetchAddendums from './FetchAddendums';
import SearchReducer from './SearchReducer';
import AddendumReducer from './AddendumReducer';
import modalReducer from './ModalReducer';


const RootReducer = combineReducers({ tabs: tabReducer,
  cards: FetchAddendums,
  results: SearchReducer,
  modal: modalReducer,
  database: AddendumReducer,
  form: formReducer,
});
export { FetchAddendums } from './FetchAddendums';
export { AddendumReducer } from './AddendumReducer';
export * from './TabSelector';
export * from './SearchSelector';
export * from './AddendumSelector';
export * from './ModalSelector';
export { SearchReducer } from './SearchReducer';
export default RootReducer;
