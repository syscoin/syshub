/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';

import { withRoot } from '../HOC';

import { ChatBox } from '../functionals';

//import Styles
import { appRSiderStyle } from './styles';

class AppRSider extends Component {
  render() {
    const { deviceType } = this.props;
    const style =
      deviceType === 'mobile' ? appRSiderStyle.mWraper : appRSiderStyle.wraper;
    return (
      <div style={style}>
       <ChatBox deviceType={deviceType} />
      </div>
    );
  }
}

export default withRoot(AppRSider);
