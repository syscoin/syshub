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
  constructor(props) {
    super(props);
  }
  render() {
    const classes = this.props.classes;
    const selectProposal = this.props.selectProposal;
    return (
      <Grid style={proposalStyle.root}>
        <DashBoardHeader data={{ showHeader: "proposalList" }} />
        <ProposalCard selectProposal={selectProposal} />
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {};
};
const dispatchToProps = dispatch => {
  return {};
};

// ProposalList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default connect(stateToProps, dispatchToProps)(withStyles(proposalStyle)(ProposalList));

