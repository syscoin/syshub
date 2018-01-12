/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithRoot from './WithRoot';

import { footerStyle } from './styles';

class AppFooter extends Component {
  render() {
    return <div style={footerStyle.footer}>Footer</div>;
  }
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WithRoot(AppFooter);
