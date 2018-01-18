/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //to pass functions

//import antd components
import { Divider } from 'antd';
import { Grid, withStyles } from 'material-ui';

import { headerStatsStyle } from './styles';

class HeaderStats extends Component {
  render() {
    const classes = this.props.classes;
    const changeRate = `${(
      1000 / this.props.value.exchange_rates.btc_usd
    ).toFixed(5)} BTC/1000 USD`;
    const masternodes = `${
      this.props.value.general.registered_masternodes_verified
    } / ${this.props.value.general.registered_masternodes}`;
    const totUsers = this.props.value.general.all_user;
    return (
      <Grid container md={8} className={classes.root}>
        <Grid item className="common">
          <img
            src={require('../../assets/img/png_stasts_sys.png')}
            className="icon"
          />
          <span className="TxtBold">{`SYSCOIN: `}</span>
          {changeRate}
        </Grid>
        <Divider className="divider" type="vertical" />
        <Grid item className="common">
          <img
            src={require('../../assets/img/png_stats_masternodes.png')}
            className="icon"
          />
          <span className="TxtBold">{`REGISTERED MASTERNODES: `}</span>
          {masternodes}
        </Grid>
        <Divider className="divider" type="vertical" />
        <Grid item className="common">
          <img
            src={require('../../assets/img/png_stats_users.png')}
            className="icon"
          />
          <span className="TxtBold">{`USERS: `}</span>
          {totUsers}
        </Grid>
      </Grid>
    );
  }
}

HeaderStats.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  //pass the providers
  return {
    value: state.sysStats.value,
  };
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(headerStatsStyle)(HeaderStats)
);
