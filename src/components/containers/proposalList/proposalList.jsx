/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { nextGovernanceRewardDate } from '../../../API/proposals.service';

// import styles
import injectSheet from 'react-jss';
import proposalListStyle from './proposalList.style';

// import component
import { DashBoardHeader, ProposalCard } from '../../functionals';

export class ProposalList extends Component {

  getNextRewardDate() {
    const nextDate = nextGovernanceRewardDate();
    return nextDate;
  }

  render() {
    const { selectProposal, deviceType } = this.props;
    const nextReward = async () => await this.getNextRewardDate();
    return (
      <Grid item md={12} xs={12} style={proposalListStyle.root}>
        <DashBoardHeader
          deviceType={deviceType}
          data={{ showHeader: 'proposalList', nextReward }}
        />
        {this.props.proposalList.map((proposal, index) => {
          return (
            <ProposalCard
              deviceType={deviceType}
              totalNodes={this.props.totalNodes}
              logged={this.props.user ? true : false}
              proposal={proposal}
              selectProposal={selectProposal}
              key={index}
            />
          );
        })}
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.app.currentUser,
    logged: state.app.currentUser ? true : false
  };
};
const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectSheet(proposalListStyle)(ProposalList));
