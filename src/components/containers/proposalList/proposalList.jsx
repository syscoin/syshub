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
      nextGovernanceDate: {},
      hiddenCards: 0
    };
  }

  async componentWillMount() {
    const nextGovernanceDate = await nextGovernanceRewardDate();
    this.setState({ nextGovernanceDate });
  }

  componentDidMount() {
    const nCards = this;
  }

  addOneHiddenCard() {
    this.setState({
      hiddenCards: this.state.hiddenCards + 1
    });
  }

  render() {
    const { selectProposal, deviceType, proposalList } = this.props;
    const nextGovernanceDate = this.state.nextGovernanceDate;
    return (
      <Grid item md={12} xs={12} style={proposalListStyle.root}>
        <DashBoardHeader
          deviceType={deviceType}
          data={{ showHeader: 'proposalList', nextGovernanceDate }}
          hiddenCards={this.state.hiddenCards}
        />
        {proposalList.map((proposal, index) => {
          return (
            <ProposalCard
              key={index}
              deviceType={deviceType}
              totalNodes={this.props.totalNodes}
              logged={this.props.user ? true : false}
              proposal={proposal}
              selectProposal={selectProposal}
              onHidden={() => this.addOneHiddenCard()}
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
