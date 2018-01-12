import React, { Component } from 'react';

import { DesktopLayout } from './components/layouts';

import AppStyles from './styles/AppStyle';

class App extends Component {
  render() {
    return (
      <div style={AppStyles.appWraper}>
        <DesktopLayout />
      </div>
    );
  }
}

export default App;
