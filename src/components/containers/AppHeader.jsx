/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import { Layout } from 'antd';

//import components
import { HeaderNav, HeaderStats } from '../functionals/';

import { AppHeaderStyle } from './styles';

const { Header } = Layout;

class AppHeader extends Component {
  render() {
    return (
      <div>
        <Header style={AppHeaderStyle.headerWraper}>
          <AppBar position="fixed">
            <Toolbar style={AppHeaderStyle.header}>
              <div style={AppHeaderStyle.container}>
                <HeaderStats />
                <HeaderNav />
              </div>
            </Toolbar>
          </AppBar>
        </Header>
      </div>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default AppHeader;
