/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';

import { withRoot } from '../../HOC';


//import Styles
import appRSiderStyle from './appRSider.style';

class AppRSider extends Component {
  render() {
    const { deviceType } = this.props;
    const style =
      deviceType === 'mobile' ? appRSiderStyle.mWraper : appRSiderStyle.wraper;
    return (
      <div style={style}>
      </div>
    );
  }
}

export default withRoot(AppRSider);
