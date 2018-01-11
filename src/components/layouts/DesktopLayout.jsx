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
  headerStyle,
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
        <Header style={headerStyle.headerWraper}>
          <AppHeader />
        </Header>
        <Layout>
          <Sider width={200} style={lSiderStyle.siderWraper}>
            <AppLSider />
          </Sider>
          <Content style={contentStyle.contentWraper}>
            <AppContent />
          </Content>
          <Sider width={300} style={rSiderStyle.siderWraper}>
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
