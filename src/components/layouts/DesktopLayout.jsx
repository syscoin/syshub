import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'react-redux';

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
        <AppHeader/>
        <div style={desktopLayoutStyle.wraper}>

          <div  style={desktopLayoutStyle.leftSlider}>
            <AppLSider/>
          </div>
          
          <div style={desktopLayoutStyle.appContent}>
            <AppContent/>
          </div>
          
          <div style={desktopLayoutStyle.rightSlider}>
          <AppRSider/>
          </div>
        
        </div>
        <AppFooter />
      </Layout>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app,
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(DesktopLayout);
