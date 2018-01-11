/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Divider } from 'antd';

import { headerStatsStyle } from './styles';

class HeaderStats extends Component {
  state = {
    syscoinStat: `0.000023 BTC / 1000 USD`,
    regMasterNods: `0415 / 0430`,
    sysUsers: `2000`,
  };

  render() {
    return (
      <div style={headerStatsStyle.wraper}>
        <div style={headerStatsStyle.common}>
          <img
            src={require('../../assets/img/png_stasts_sys.png')}
            height="30"
          />
          <span style={headerStatsStyle.spanTxt}>{`SYSCOIN: `}</span>
          {this.state.syscoinStat}
        </div>
        <Divider style={headerStatsStyle.divider} type="vertical" />
        <div style={headerStatsStyle.common}>
          <img
            src={require('../../assets/img/png_stats_masternodes.png')}
            height="30"
          />
          <span
            style={headerStatsStyle.spanTxt}
          >{`REGISTERED MASTERNODES: `}</span>
          {this.state.regMasterNods}
        </div>
        <Divider style={headerStatsStyle.divider} type="vertical" />
        <div style={headerStatsStyle.common}>
          <img
            src={require('../../assets/img/png_stats_users.png')}
            height="30"
          />
          <span style={headerStatsStyle.spanTxt}>{`USERS: `}</span>
          {this.state.sysUsers}
        </div>
      </div>
    );
  }
}

export default HeaderStats;
