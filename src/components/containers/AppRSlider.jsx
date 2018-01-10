/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WithRoot from './WithRoot';

class AppRSider extends Component {
  render() {
    return <div>Here comes ChatBox component</div>;
  }
}

AppRSider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WithRoot(AppRSider);
