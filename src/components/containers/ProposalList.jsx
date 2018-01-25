/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, withStyles } from 'material-ui';

// import styles
import { proposalStyle } from './styles';

// import component
import { DashBoardHeader, ProposalCard } from '../functionals/';

export class ProposalList extends Component {
  state = {
    proposalList: [
      {
        name: 'Proposal 1',
        detail:
          'Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.',
        upVote: 100,
        downVote: 200,
        active: true,
        id: 1,
      },
      {
        name: 'Proposal 2',
        detail:
          'Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.',
        upVote: 400,
        downVote: 1,
        active: false,
        id: 2,
      },
      {
        name: 'Proposal 3',
        detail:
          'Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.',
        upVote: 600,
        downVote: 9,
        active: false,
        id: 3,
      },
      {
        name: 'Proposal 4',
        detail:
          'Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.',
        upVote: 2000,
        downVote: 8,
        active: false,
        id: 4,
      },
    ],
  };

  render() {
    const { classes, selectProposal } = this.props;
    return (
      <Grid md={12} style={proposalStyle.root}>
        <DashBoardHeader data={{ showHeader: 'proposalList' }} />

        {this.state.proposalList.map(proposal => {
          return (
            <ProposalCard
              totalNodes={this.props.totalNodes}
              logged={this.props.logged}
              proposal={proposal}
              selectProposal={selectProposal}
            />
          );
        })}
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    logged: state.app.currentUser ? true : false,
  };
};
const dispatchToProps = dispatch => {
  return {};
};

// ProposalList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default connect(stateToProps, dispatchToProps)(
  withStyles(proposalStyle)(ProposalList)
);
