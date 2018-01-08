import React from 'react';
import { render } from 'react-dom';
import App from './pages/app';

// ant Styles
import 'antd/dist/antd.css';

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<App />, rootElement);
}
