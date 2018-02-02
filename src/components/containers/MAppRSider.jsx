/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import { withRoot } from '../HOC';

import { ChatBox } from '../functionals';

//import Styles
import { mAppRSiderStyle } from './styles';

const { Sider } = Layout;

class AppRSider extends Component {
  render() {
    return (
      <div style={mAppRSiderStyle.wraper}>
        <ChatBox />
      </div>
    );
  }
}

export default withRoot(AppRSider);
