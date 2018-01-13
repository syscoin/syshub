/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRoot } from '../HOC';
import { Layout } from 'antd';

import { footerStyle } from './styles';

const { Footer } = Layout;

class AppFooter extends Component {
  render() {
    return (
      <div style={footerStyle.footer}>
        <Footer style={footerStyle.footerWraper}>{` `} </Footer>
      </div>
    );
  }
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(AppFooter);
