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
  HeaderStyles,
  SiderStyles,
  ContentStyles,
  FooterStyles,
} from '../../styles';

const { Header, Content, Sider, Footer } = Layout;

class DesktopLayout extends Component {
  render() {
    return (
      <Layout>
        <Header style={HeaderStyles.headerWraper}>
          <AppHeader />
        </Header>
        <Layout>
          <Sider width={200} style={SiderStyles.siderWraper}>
            <AppLSider />
          </Sider>
          <Content style={ContentStyles.contentWraper}>
            <AppContent />
          </Content>
          <Sider width={200} style={SiderStyles.siderWraper}>
            <AppRSider />
          </Sider>
        </Layout>
        <Footer style={FooterStyles.footerWraper}>
          <AppFooter />
        </Footer>
      </Layout>
    );
  }
}

export default DesktopLayout;
