import React, { Component } from 'react';
import { Layout } from 'antd';

import {
  AppHeader,
  AppContent,
  AppLSider,
  AppRSider,
  AppFooter,
} from '../containers/';
// Styles
import {
  appHeaderStyle,
  rSiderStyle,
  lSiderStyle,
  contentStyle,
  footerStyle,
} from '../containers/styles';

const { Header, Content, Sider, Footer } = Layout;

class DesktopLayout extends Component {
  render() {
    return (
      <Layout>
        <Header style={appHeaderStyle.headerWraper}>
          <AppHeader />
        </Header>
        <Layout>
          <Sider width={250} style={lSiderStyle.wraper}>
            <AppLSider />
          </Sider>
          <Content style={contentStyle.contentWraper}>
            <AppContent />
          </Content>
          <Sider width={250} style={rSiderStyle.wraper}>
            <AppRSider />
          </Sider>
        </Layout>
        <Footer style={footerStyle.footerWraper}>
          <AppFooter />
        </Footer>
      </Layout>
    );
  }
}

export default DesktopLayout;
