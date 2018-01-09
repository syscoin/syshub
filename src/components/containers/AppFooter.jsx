/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithRoot from './WithRoot';
import FooterStyles from '../../styles/footerStyle';

class AppFooter extends Component {
  render() {
    return <div style={FooterStyles.footer}>Footer</div>;
  }
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WithRoot(AppFooter);
