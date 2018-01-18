/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Divider } from 'antd';
import { Grid, withStyles } from 'material-ui';

import { headerStatsStyle } from './styles';

class HeaderStats extends Component {
  state = {
    syscoinStat: `0.000023 BTC / 1000 USD`,
    regMasterNods: `0415 / 0430`,
    sysUsers: `2000`,
  };

  render() {
    const classes = this.props.classes;
    //console.clear();
    return (
      <Grid container md={8} className={classes.root}>
        <Grid item className="common">
          <img src={require('../../assets/img/png_stasts_sys.png')} className="icon"/>
          <span className="TxtBold">{`SYSCOIN: `}</span>
          {this.state.syscoinStat}
        </Grid>
        <Divider className="divider" type="vertical" />
        <Grid item  className="common">
          <img src={require('../../assets/img/png_stats_masternodes.png')} className="icon"/>
          <span className= "TxtBold">{`REGISTERED MASTERNODES: `}</span>
          {this.state.regMasterNods}
        </Grid>
        <Divider className="divider" type="vertical" />
        <Grid item className="common">
          <img src={require('../../assets/img/png_stats_users.png')} className="icon"/>
          <span className="TxtBold">{`USERS: `}</span>
          {this.state.sysUsers}
        </Grid>
      </Grid>
    );
  }
}

HeaderStats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(headerStatsStyle)(HeaderStats);
