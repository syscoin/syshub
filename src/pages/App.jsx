import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { DesktopLayout } from '../components/layouts';

import AppStyles from '../styles/appStyle';

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
