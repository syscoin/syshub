/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, withStyles } from 'material-ui';

// import styles
import { proposalStyle } from './styles';

// import component
import { DashBoardHeader, ProposalCard } from '../functionals/';

export class ProposalList extends Component {


  render() {
    const { selectProposal, deviceType } = this.props;

    return (
      <Grid item md={12} xs={12} style={proposalStyle.root}>
        <DashBoardHeader
          deviceType={deviceType}
          data={{ showHeader: 'proposalList' }}
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
    logged: state.app.currentUser ? true : false,
  };
};
const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(proposalStyle)(ProposalList)
);
