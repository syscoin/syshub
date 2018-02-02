/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fire } from '../../API/firebase';
import { Grid, withStyles } from 'material-ui';

// import styles
import { proposalStyle } from './styles';

// import component
import { DashBoardHeader, ProposalCard } from '../functionals/';

export class ProposalList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, selectProposal } = this.props;

    return (
      <Grid md={12} style={proposalStyle.root}>
        <DashBoardHeader data={{ showHeader: 'proposalList' }} />

        {this.props.proposalList.map(proposal => {
          return (
            <ProposalCard
              totalNodes={this.props.totalNodes}
              logged={this.props.user ? true : false}
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
    user: state.app.currentUser
  };
};
const dispatchToProps = dispatch => {
  return {};
};

// ProposalList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default connect(stateToProps, dispatchToProps)(withStyles(proposalStyle)(ProposalList));
