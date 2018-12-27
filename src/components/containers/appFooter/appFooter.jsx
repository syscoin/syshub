/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { withRoot } from '../../HOC';
import { Layout } from 'antd';
import appFooterStyle from './appFooter.style';

const { Footer } = Layout;

class AppFooter extends Component {
  render() {
    return (
      <div style={appFooterStyle.footer}>
        <Footer style={appFooterStyle.wraper}>{`© 2018 Syscoin Foundation with contributions from Blockchain Foundry Inc.`}</Footer>
      </div>
    );
  }
}

export default withRoot(AppFooter);
