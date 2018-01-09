import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { AppHeader, AppContent, AppSlider, AppFooter } from '../containers/';
// Styles
import { HeaderStyles, SiderStyles, ContentStyles, FooterStyles } from '../../styles';

const { SubMenu } = Menu;
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
            <AppSlider />
          </Sider>
          <Layout>
            <Content style={ContentStyles.contentWraper}>
              <AppContent />
            </Content>
          </Layout>
        </Layout>
        <Footer style={FooterStyles.footerWraper}>
          <AppFooter />
        </Footer>
      </Layout>
    );
  }
}

export default DesktopLayout;
