/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRoot } from '../HOC';
import { Layout } from 'antd';

import { mAppFooterStyle } from './styles';

const { Footer } = Layout;

class AppFooter extends Component {
  render() {
    return (
      <div style={mAppFooterStyle.footer}>
        <Footer style={mAppFooterStyle.wraper}>{` `} </Footer>
      </div>
    );
  }
}

export default withRoot(AppFooter);
