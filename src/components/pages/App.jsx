import React, { Component } from 'react';

import { DesktopLayout } from '../layouts';

import AppStyles from '../../styles/appStyle';

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
