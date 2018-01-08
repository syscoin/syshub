import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import App from './pages/app';

// Redux Imports
import reducers from './redux/reducers';
import middlewares from './redux/middleware';

// ant Styles
import 'antd/dist/antd.css';

//Redux Entry Point
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(middlewares));

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<App />, rootElement);
}
