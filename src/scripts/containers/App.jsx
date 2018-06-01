import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import Main from './Main';
import RootReducer from '../reducers';


// Main file for TRAAS, DO NOT MODIFY!!
require('es6-promise').polyfill();

const store = createStore(
  RootReducer,
  compose(
    applyMiddleware(apiMiddleware, thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const App = () => (
  <div>
    <Provider store={store} >
      <Main />
    </Provider>
  </div>
);

export default App;
