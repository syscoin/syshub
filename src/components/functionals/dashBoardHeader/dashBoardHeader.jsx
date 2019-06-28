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
    const { classes, deviceType, proposal, data, hiddenCards } = this.props;

    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const proposalsShown =
      (proposal.list.length > 0 ? proposal.list.length : 0) - hiddenCards;

    return (
      <Grid item container md={12} xs={12} className={style}>
        <Grid item md={12} xs={12} className="no-margin headingView">
          {data.showHeader === 'ProposalDetail' && (
            <div className="headingRow">
              <div className="titleWrapper">
                <img
                  alt="a"
                  src={require('../../../assets/img/png_icon_proposal.png')}
                  height="30"
                />
                <div className="headingDiv"> {data.name}</div>
              </div>
              <div className="ownerDetails" />
            </div>
          )}
          {data.showHeader !== 'ProposalDetail' && (
            <div className="headingRow">
              <div className="headingRight">
                <span className="activeText">{proposalsShown}</span>
                {` Active Proposal${proposalsShown > 1 ? 's' : ''}`}
              </div>
              <div className="headingLeft">
                {data.nextGovernanceDate.rewardDate && (
                  <div className="governanceDate">
                    <span className="TxtRegular">
                      {deviceType !== 'mobile'
                        ? `Payout Date:`
                        : `Payout Date:`}
                    </span>
                    {
                      <span style={{ color: 'inherit' }}>
                        {data.nextGovernanceDate.rewardDate}
                      </span>
                    }
                  </div>
                )}

                {data.nextGovernanceDate.votingDeadline && (
                  <div className="governanceDate">
                    <span className="TxtRegular">
                      {deviceType !== 'mobile'
                        ? `Voting Deadline:`
                        : `Voting Deadline:`}
                    </span>
                    <span style={{ color: 'inherit' }}>
                      {data.nextGovernanceDate.votingDeadline}
                    </span>
                  </div>
                )}

                {!data.nextGovernanceDate.rewardDate &&
                  !data.nextGovernanceDate.votingDeadline && (
                    <div className="loading">
                      <CircularProgress size={24} thickness={5} />
                    </div>
                  )}
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

export default connect(
  stateToProps,
  dispatchToProps
)(injectSheet(dashBoardHeaderStyle)(DashBoardHeader));
