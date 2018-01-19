import React from 'react';
import { render } from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

import { fire } from './firebase';
// Redux Imports
import reducers from './redux/reducers';
import middlewares from './redux/middleware';

// ant Styles
import 'antd/dist/antd.css';

//Redux Entry Point
window.recaptchaVerifier = new fire.auth.RecaptchaVerifier('recaptcha-container', {
  size: 'normal',
  callback: function(response) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    // ...
  },
  'expired-callback': function() {
    // Response expired. Ask user to solve reCAPTCHA again.
    // ...
  }
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(middlewares));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(app, rootElement);
}
