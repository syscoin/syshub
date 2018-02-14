/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { withRoot } from '../HOC';
import { Layout } from 'antd';
import { appFooterStyle } from './styles';

const { Footer } = Layout;

class AppFooter extends Component {
  render() {
    return (
      <div style={appFooterStyle.footer}>
        <Footer style={appFooterStyle.wraper}>{`SysHub @ 2018`}</Footer>
      </div>
    );
  }
}

export default withRoot(AppFooter);
