/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//import Material-UI components
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import injectSheet from 'react-jss';
import dashBoardHeaderStyle from './dashBoardHeader.style';
class DashBoardHeader extends Component {

  render() {
    const { classes, deviceType, proposal, data } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid item container md={12} xs={12} className={style}>
        <Grid item md={12} xs={12} className="no-margin headingView">
          {data.showHeader === 'ProposalDetail'  ? (
            <div className="headingRow">
              <img alt="a" src={require('../../../assets/img/png_icon_proposal.png')} height="30" />
              <div className="headingDiv"> {data.name}</div>
              <div className="ownerDetails"></div>
            </div>
          ) : (
            <div className="headingRow">
              <div className="headingRight">
                <span className="activeText">
                  {proposal.list.length > 0 ? proposal.list.length : 0}
                </span>
                {` Active Proposal`}
              </div>
              <div className="headingLeft">
                <span className="TxtRegular">{deviceType!=='mobile' ? `Next reward estimation:` : `Reward estimation:`}</span>
                { data.nextRewardDate && <span style={{color: 'inherit'}}>{data.nextRewardDate}</span>}
                { !data.nextRewardDate && 
                  <div className="loading">
                    <CircularProgress
                      size={24}
                      thickness={5}
                    />
                  </div>
                }
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}

DashBoardHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

const stateToProps = state => {
  return {
    proposal: state.proposals
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  injectSheet(dashBoardHeaderStyle)(DashBoardHeader)
);
