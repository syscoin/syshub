/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRoot from './WithRoot';
import { Layout } from 'antd';

import { FooterStyle } from './styles';

const { Footer } = Layout;

class AppFooter extends Component {
  render() {
    return (
      <div style={FooterStyle.footer}>
        <Footer style={FooterStyle.footerWraper}>Footer </Footer>
      </div>
    );
  }
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(AppFooter);
