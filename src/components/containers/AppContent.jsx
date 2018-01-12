/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithRoot from './WithRoot';
//import EmailModal from './the-modal';

// import components
import { Stats, WellcomeBox } from './../functionals';

import { contentStyle } from './styles';

// import components
import { Home } from '../pages';
class AppContent extends Component {
  render() {
    return (
      <div style={contentStyle.wraper}>
        <div className="main-content-div">
          <Home />
        </div>
      </div>
    );
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WithRoot(AppContent);
