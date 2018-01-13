import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import {
  AppHeader,
  AppContent,
  AppLSider,
  AppRSider,
  AppFooter,
} from '../containers/';

//Import Styles
import { desktopLayoutStyle } from './styles';

const { SubMenu } = Menu;
const { Content, Footer } = Layout;

class DesktopLayout extends Component {
  render() {
    return (
      <Layout>
        <AppHeader />
        <div style={desktopLayoutStyle.wraper}>
          <AppLSider />
          <AppContent />
          <AppRSider />
        </div>
        <AppFooter />
      </Layout>
    );
  }
}

export default DesktopLayout;
