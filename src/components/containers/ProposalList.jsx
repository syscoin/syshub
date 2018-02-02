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

    this.selectMNKey = this.selectMNKey.bind(this);

    this.state = {
      selectedMNKey: null
    };
  }

  selectMNKey(mnObj) {
    this.setState({
      selectedMNKey: mnObj.mnPrivateKey,
      selectedVin: mnObj.vinMasternode
    });
  }

  componentDidMount() {
    if (this.props.currentUser) {
      if (this.props.currentUser.mnPrivateKey) {
        this.setState({
          selectedMNKey: this.props.currentUser.mnPrivateKey[0].mnPrivateKey,
          selectedVin: this.props.currentUser.mnPrivateKey[0].vinMasternode
        });
      }
    }
  }

  render() {
    const { classes, selectProposal } = this.props;
    const user = this.props.currentUser;

    return (
      <Grid md={12} style={proposalStyle.root}>
        <DashBoardHeader data={{ showHeader: 'proposalList' }} />
        {user
          ? user.mnPrivateKey
            ? user.mnPrivateKey.map((mnObj, i) => {
                return (
                  <div>
                    <button
                      onClick={() => this.selectMNKey(mnObj)}
                      style={
                        mnObj.mnPrivateKey === this.state.selectedMNKey
                          ? { backgroundColor: 'green' }
                          : null
                      }
                    >{`MasterNode ${i + 1}`}</button>
                  </div>
                );
              })
            : null
          : null}

        {this.props.proposalList.map(proposal => {
          return (
            <ProposalCard
              totalNodes={this.props.totalNodes}
              logged={this.props.user ? true : false}
              proposal={proposal}
              selectProposal={selectProposal}
              selectedMNKey={this.state.selectedMNKey}
              selectedVin={this.state.selectedVin}
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
