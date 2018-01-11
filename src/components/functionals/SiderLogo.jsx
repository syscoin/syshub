/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Import Styles
import { siderLogoStyle } from './styles';

class SiderLogo extends Component {
  render() {
    return (
      <div style={siderLogoStyle.wraper}>
        <img src={require('../../assets/img/png_logo.png')} width="100%" />
      </div>
    );
  }
}

export default SiderLogo;
