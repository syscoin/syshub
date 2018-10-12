/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Layout, Row, Col } from 'antd';
import { HeaderStats, HeaderNav } from '../functionals';
import { appHeaderStyle } from './styles';

const { Header } = Layout;

class AppHeader extends Component {
  render() {
    return (
      <Header style={appHeaderStyle.container}>
        <AppBar position="fixed">
          <Row type="flex" justify="space-around" align="middle" style={appHeaderStyle.appbar}>
            <Col xl={24} xxl={20}>
              <Toolbar style={appHeaderStyle.header}>
                <div style={appHeaderStyle.wrapper}>
                  <HeaderStats />
                  <HeaderNav />
                </div>
              </Toolbar>
            </Col>
          </Row>
        </AppBar>
      </Header>

    );
  }
}

export default AppHeader;
