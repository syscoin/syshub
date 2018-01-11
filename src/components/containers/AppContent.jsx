/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithRoot from './WithRoot';
//import EmailModal from './the-modal';


// import components
import Home from "./../pages/home";
class AppContent extends Component {
  render() {
    return (
      <div className="main-content-div">
        <Home />
        Content
      </div>
    )
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WithRoot(AppContent);
