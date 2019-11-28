/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"; //to pass functions
import actions from "../../../redux/actions";
//import antd components
import { Grid } from "@material-ui/core";

import injectSheet from "react-jss";
import headerStatsStyle from "./headerStats.style";

class HeaderStats extends Component {
  render() {
    const { classes, deviceType, sysInfo } = this.props;
    //Platform style switcher
    const style = deviceType === "mobile" ? classes.mRoot : classes.root;

    const usdChangeRate = sysInfo.sysPrice
      ? `${parseFloat(sysInfo.sysPrice.usd).toFixed(8)} USD`
      : "";
    const btcChangeRate = sysInfo.sysPrice
      ? `${parseFloat(sysInfo.sysPrice.btc).toFixed(8)} BTC`
      : "";
    const satChangeRate = sysInfo.sysPrice
      ? `${Math.floor(
          parseFloat(sysInfo.sysPrice.btc).toFixed(8) * 100000000
        )} SATOSHI`
      : "";
    const masternodes =
      sysInfo.mnRegistered && sysInfo.mnCount
        ? `${sysInfo.mnRegistered} / ${sysInfo.mnCount.enabled}`
        : "";
    const totUsers = sysInfo.users ? sysInfo.users : "";
    const sysCaption = deviceType === "mobile" ? ":" : "SYSCOIN:";
    //console.clear();
    return (
      <Grid container className={style}>
        <Grid item className="common" xs={deviceType === "mobile" ? 12 : null}>
          <div className="changeRate">
            <img
              alt="a"
              src={require("../../../assets/img/png_stasts_sys.png")}
              className="icon"
              onClick={() => this.props.setPage("home")}
            />
            <span className="TxtBold">{sysCaption}</span>
            <div className="changeValue">
              <i>{usdChangeRate}</i>
              <i>{btcChangeRate}</i>
              <i>{satChangeRate}</i>
            </div>
          </div>
        </Grid>
        <Grid item className="common" xs={deviceType === "mobile" ? 12 : null}>
          <img
            alt="a"
            src={require("../../../assets/img/png_stats_masternodes.png")}
            className="icon"
          />
          {deviceType === "mobile" ? (
            <span className="TxtBold">{`: `}</span>
          ) : (
            <span className="TxtBold">{`REGISTERED MASTERNODES: `}</span>
          )}
          {masternodes}
        </Grid>
        <Grid item className="common" xs={deviceType === "mobile" ? 12 : null}>
          <img
            alt="a"
            src={require("../../../assets/img/png_stats_users.png")}
            className="icon"
          />
          {deviceType === "mobile" ? (
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
      users: state.sysStats.users
    }
  };
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    setPage: page => dispatch(actions.setPage(page))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(headerStatsStyle)(HeaderStats));
