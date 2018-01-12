/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithRoot from './WithRoot';
//import EmailModal from './the-modal';
// import Login from '../functionals/login'
import Login from '../pages/login'
class AppContent extends Component {
  render() {
    return <div><Login/></div>;
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WithRoot(AppContent);
