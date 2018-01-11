import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import App from './App';

// Redux Imports
import reducers from './redux/reducers';
import middlewares from './redux/middleware';

// ant Styles
import 'antd/dist/antd.css';

import initialState from './redux/reducers/appReducer'

//Redux Entry Point
import { Provider } from 'react-redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {},composeEnhancers(middlewares));

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), rootElement);
}
