/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithRoot from './WithRoot';
//import EmailModal from './the-modal';

// import components
import WellcomeBox from './../functionals/wellcomeBox';
import Stats from './../functionals/stats';

import { contentStyle } from './styles';

class AppContent extends Component {
  render() {
    return (
      <div style={contentStyle.wraper}>
        <WellcomeBox />
        <Stats />
      </div>
    );
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WithRoot(AppContent);
