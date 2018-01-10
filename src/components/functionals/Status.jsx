/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { statusStyle } from './styles';

class HeaderStats extends Component {
  render() {
    return <div style={statusStyle.wraper}>Status</div>;
  }
}

export default HeaderStats;
