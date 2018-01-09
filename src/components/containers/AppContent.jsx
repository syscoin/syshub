/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithRoot from './WithRoot';
//import EmailModal from './the-modal';

class AppContent extends Component {
  render() {
    return <div>Content</div>;
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WithRoot(AppContent);
