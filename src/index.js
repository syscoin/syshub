/* eslint-disable */
import React from 'react';
import { render } from 'react-dom';

import { createStore, compose } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';

//Providers Imports
import Firebase, { FirebaseContext } from './providers/firebase';

// Redux Imports
import reducers from './redux/reducers';
import middlewares from './redux/middleware';

//Redux Entry Point
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers(middlewares));

const app = (
  <ReduxProvider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </ReduxProvider>
);

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(app, rootElement);
}
