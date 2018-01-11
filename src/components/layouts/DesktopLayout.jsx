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
<<<<<<< HEAD
  HeaderStyles,
  SiderStyles,
  ContentStyles,
  FooterStyles,
} from '../../styles';
import ChatBox from '../chatBox'
=======
  headerStyle,
  rSiderStyle,
  lSiderStyle,
  contentStyle,
  footerStyle,
} from '../containers/styles';

>>>>>>> 50f421c86778284579f09e33ee546530ec35e2d4
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
          <Sider width={200} style={rSiderStyle.siderWraper}>
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
