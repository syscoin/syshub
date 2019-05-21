/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { nextGovernanceRewardDate } from '../../../API/syscoin/proposals.service';

// import styles
import injectSheet from 'react-jss';
import proposalListStyle from './proposalList.style';

// import component
import { DashBoardHeader, ProposalCard } from '../../functionals';

export class ProposalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextGovernanceDate: {}
    };
  }

  async componentWillMount() {
    const nextGovernanceDate = await nextGovernanceRewardDate();
    this.setState({ nextGovernanceDate });
  }

  render() {
    const { selectProposal, deviceType } = this.props;
    const nextGovernanceDate = this.state.nextGovernanceDate;
    return (
      <Grid item md={12} xs={12} style={proposalListStyle.root}>
        <DashBoardHeader
          deviceType={deviceType}
          data={{ showHeader: 'proposalList', nextGovernanceDate }}
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
