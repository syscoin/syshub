/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Layout } from 'antd';
import { HeaderStats, HeaderNav } from '../functionals';
import { appHeaderStyle } from './styles';

const { Header } = Layout;

class AppHeader extends Component {
  render() {
    return (
      <div>
        <Header style={appHeaderStyle.wraper}>
          <AppBar position="fixed">
            <Toolbar style={appHeaderStyle.header}>
              <div style={appHeaderStyle.container}>
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

export default AppHeader;
