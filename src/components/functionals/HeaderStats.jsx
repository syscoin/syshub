/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //to pass functions
import actions from '../../redux/actions';
//import antd components
import { Grid } from '@material-ui/core';

import injectSheet from 'react-jss';
import { headerStatsStyle } from './styles';

class HeaderStats extends Component {
  render() {
    const { classes, deviceType, sysInfo } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const changeRate = sysInfo.sysPrice ? `${parseFloat(sysInfo.sysPrice.price_btc).toFixed(5)} BTC/SYS` : 0;
    const masternodes = sysInfo.mnCount ? `${sysInfo.mnRegistered} / ${sysInfo.mnCount.qualify}` : '';
    const totUsers = this.props.sysInfo ? (this.props.sysInfo.users) : 0;
    //console.clear();
    return (
      <Grid container className={style}>
        <Grid item className="common" xs={deviceType === 'mobile' ? 12 : null}>
          <a onClick={() => this.props.setPage('home')}>
            <img alt="a" src={require('../../assets/img/png_stasts_sys.png')} className="icon" />
          </a>
          {deviceType === 'mobile' ? (
            <span className="TxtBold">{`: `}</span>
          ) : (
              <span className="TxtBold">{`SYSCOIN: `}</span>
            )}
          {changeRate}
        </Grid>
        <Grid item className="common" xs={deviceType === 'mobile' ? 12 : null}>
          <img
            alt="a"
            src={require('../../assets/img/png_stats_masternodes.png')}
            className="icon"
          />
          {deviceType === 'mobile' ? (
            <span className="TxtBold">{`: `}</span>
          ) : (
              <span className="TxtBold">{`REGISTERED MASTERNODES: `}</span>
            )}
          {masternodes}
        </Grid>
        <Grid item className="common" xs={deviceType === 'mobile' ? 12 : null}>
          <img alt="a" src={require('../../assets/img/png_stats_users.png')} className="icon" />
          {deviceType === 'mobile' ? (
            <span className="TxtBold">{`: `}</span>
          ) : (
              <span className="TxtBold">{`USERS: `}</span>
            )}
          {totUsers}
        </Grid>
      </Grid>
    );
  }
}

HeaderStats.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {
    sysInfo: {
      mnCount: state.sysStats.mnCount,
      mnRegistered: state.sysStats.mnRegistered,
      sysPrice: state.sysStats.sysPrice,
      users: state.sysStats.users,
    },
  };
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    setPage: page => dispatch(actions.setPage(page))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(headerStatsStyle)(HeaderStats)
);
