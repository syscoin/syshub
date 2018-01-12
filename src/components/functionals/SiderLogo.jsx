/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Import Styles
import { siderLogoStyle } from './styles';

class SiderLogo extends Component {
  render() {
    return (
      <div style={siderLogoStyle.wraper}>
        <div>
          <img src={require('../../assets/img/png_logo.png')} width="100%" />
        </div>
        <div style={siderLogoStyle.txtArea}>
          <p>brought to you by</p>
          <p style={siderLogoStyle.txtBig}>Blockchain Foundry</p>
        </div>
      </div>
    );
  }
}

export default SiderLogo;
