import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { DesktopLayout } from './components/layouts';

import AppStyles from './styles/AppStyle';

class App extends Component {
  render() {
    return (
      <div style={AppStyles.wraper}>
        <DesktopLayout />
      </div>
    );
  }
}

export default App;
