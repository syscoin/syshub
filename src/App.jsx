import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { DesktopLayout } from './components/layouts';

import appStyles from './styles/appStyle';

class App extends Component {
  render() {
    return (
      <div style={appStyles.wraper}>
        <DesktopLayout />
      </div>
    );
  }
}

export default App;
