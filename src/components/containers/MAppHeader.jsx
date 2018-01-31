/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import { Layout, Divider } from 'antd';
import injectSheet from 'react-jss';

//import components
import { HeaderStats, HeaderNav } from '../functionals';

//Import Styles
import { mAppHeaderStyle } from './styles';

const { Header } = Layout;

class AppHeader extends Component {
  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div>
        <Header className={style}>
          <AppBar position="fixed">
            <Toolbar className="header">
              <div className="container">
                <div>
                  <HeaderStats deviceType={deviceType} />
                </div>
                <Divider className="hdivider" />
                <HeaderNav deviceType={deviceType} />
              </div>
            </Toolbar>
          </AppBar>
        </Header>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    deviceType: state.app.platform.deviceType
  };
};

const dispatchToProps = dispatch => {
  return {};
};
export default connect(stateToProps, dispatchToProps)(
  injectSheet(mAppHeaderStyle)(AppHeader)
);
