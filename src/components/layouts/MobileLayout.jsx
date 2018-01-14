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
import { mobileLayoutStyle } from './styles';

const { SubMenu } = Menu;
const { Content, Footer } = Layout;

class DesktopLayout extends Component {
  render() {
    return <div>This is our MOBILE layout</div>;
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
