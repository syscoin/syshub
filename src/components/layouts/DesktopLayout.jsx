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
  siderStyle,
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
          <Sider width={200} style={siderStyle.siderWraper}>
            <AppLSider />
          </Sider>
          <Content style={contentStyle.contentWraper}>
            <AppContent />
          </Content>
          <Sider width={200} style={siderStyle.siderWraper}>
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
