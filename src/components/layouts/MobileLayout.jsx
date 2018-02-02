import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Drawer, List, NavBar, Icon, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import {
  MAppHeader,
  MAppContent,
  MAppLSider,
  MAppRSider,
  MAppFooter,
} from '../containers/';

//Import Styles

import 'antd-mobile/dist/antd-mobile.css';
import { mobileLayoutStyle } from './styles';

const { SubMenu } = Menu;
const { Content, Footer } = Layout;

class MobileLayout extends Component {
  toggleBoolState = d => {
    this.setState({
      [d]: !this.state[d],
    });
  };

  render() {
    const { classes, app } = this.props;
    return (
      <div className={classes.root}>
        <MAppHeader />
        <MAppContent />
        <MAppFooter />
      </div>
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

export default connect(stateToProps, dispatchToProps)(
  injectSheet(mobileLayoutStyle)(MobileLayout)
);
