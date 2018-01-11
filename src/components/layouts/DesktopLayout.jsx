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
import { DesktopLayoutStyle } from './styles';

const { SubMenu } = Menu;
const { Content, Footer } = Layout;

class DesktopLayout extends Component {
  render() {
    return (
      <Layout>
        <AppHeader />
        <Layout style={DesktopLayoutStyle.wraper}>
          <AppLSider />
          <AppContent />
          <AppRSider />
        </Layout>
        <AppFooter />
      </Layout>
    );
  }
}

export default DesktopLayout;
