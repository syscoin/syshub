/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Layout, Row, Col } from 'antd';
import { HeaderStats, HeaderNav } from '../functionals';
import { appHeaderStyle } from './styles';

const { Header } = Layout;

class AppHeader extends Component {
  render() {
    return (
      <Row>
        <Col>
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
        </Col>
      </Row>
    );
  }
}

export default AppHeader;
