/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //to pass functions
import actions from '../../redux/actions';
//import antd components
import { Grid, withStyles } from 'material-ui';

import { headerStatsStyle } from './styles';

class HeaderStats extends Component {
  render() {
    const { classes, deviceType, sysStatsValue } = this.props;
    const { sysPrice, totMn, regMn, users } = sysStatsValue;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const changeRate = sysPrice ? `${(sysPrice.price_btc)} BTC/SYS` : '';
    const masternodes = totMn ? `${regMn} / ${totMn}` : '';
    const totUsers = users ? users : '';
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
    sysStatsValue: {
      sysPrice: state.sysStats.sysPrice,
      totMn: state.sysStats.totMn,
      regMn: state.sysStats.regMn,
      users: state.sysStats.users,
    }
  };
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    setPage: page => dispatch(actions.setPage(page))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(headerStatsStyle)(HeaderStats)
);
