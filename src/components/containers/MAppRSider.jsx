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
    const { deviceType } = this.props;
    const style = deviceType === 'mobile' ? mAppRSiderStyle.mWraper : mAppRSiderStyle.wraper;
    return (
      <div style={style}>
        <ChatBox deviceType={deviceType} />
      </div>
    );
  }
}

export default withRoot(AppRSider);
