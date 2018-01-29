/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { fire } from '../../firebase';

//import antd components
import { Divider, Button } from 'antd';
import { Grid, withStyles } from 'material-ui';
import { Progress } from 'antd';

// import style
import { proposalCardStyle } from './styles';

class ProposalCard extends Component {
  constructor(props) {
    super(props);

    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
  }

  voteUp(vote) {
    const { proposal, user } = this.props;
    const proposalVoteYes = {
      mnPrivateKey: '936xFG2uV7UhQEsuK1vvLmJvbn3EaC7sZ4xddfBBCDUymUMBKKg',
      vinMasternode: 'db49df667763cc726c9f0375ada3fd91bb36ac9e0f9ddea7efd8c13f9b634460-0',
      gObjectHash: 'f221880ff80918208d16613b0f7d66f05de3a4f5d0499465f692eee8469c6369',
      voteOutcome: 1
    };

    if (!user) {
      swal({ title: 'Oops...', text: 'Must be logged in to vote!', icon: 'error' });
    }

    if (user) {
      this.props
        .voteOnProposal(proposalVoteYes)
        .then(data => {
          swal({ title: 'Success', text: `${data}`, icon: 'success' });

          fire
            .database()
            .ref('votes/' + user.uid)
            .set({ proposalId: proposal.Hash, vote: 'Yes' });
        })
        .catch(err => {
          swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
        });
    }
  }

  voteDown(vote) {
    const { proposal, user } = this.props;
    const proposalVoteNo = {
      mnPrivateKey: '936xFG2uV7UhQEsuK1vvLmJvbn3EaC7sZ4xddfBBCDUymUMBKKg',
      vinMasternode: 'db49df667763cc726c9f0375ada3fd91bb36ac9e0f9ddea7efd8c13f9b634460-0',
      gObjectHash: 'f221880ff80918208d16613b0f7d66f05de3a4f5d0499465f692eee8469c6369',
      voteOutcome: 2
    };

    if (!user) {
      swal({ title: 'Oops...', text: 'Must be logged in to vote!', icon: 'error' });
    }

    if (user) {
      this.props
        .voteOnProposal(proposalVoteNo)
        .then(data => {
          swal({ title: 'Success', text: `${data}`, icon: 'success' });

          fire
            .database()
            .ref('votes/' + user.uid)
            .set({ proposalId: proposal.Hash, vote: 'No' });
        })
        .catch(err => {
          swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
        });
    }
  }

  render() {
    const { classes, selectProposal, user, proposal } = this.props;

    const docIcon = require('../../assets/img/png_stats_propposal_votes.png');
    const voteUpIcon = require('../../assets/img/png_button_up.png');
    const voteDownIcon = require('../../assets/img/png_button_down.png');

    // Some Maths ;P
    const progress = parseInt(proposal.YesCount + 30) / parseInt(this.props.totalNodes) * 100; //remove added counts later and below

    return (
      <Grid container className={classes.proposalRoot}>
        <Grid container md={12} className="proposalRow" key={proposal.Hash}>
          <Grid item md={2} className="proposalView">
            <Progress
              type="circle"
              percent={progress}
              format={percent => <img alt="a" src={docIcon} className="progressIcon" />}
              className="progress-dial"
              strokeWidth={12}
              status={progress < 35 ? 'exception' : progress < 100 ? 'active' : 'success'}
            />
            <div className="proposalStatusNo">
              <span className="proposalStatusActiveNo">{proposal.YesCount + 30}</span>
              {` / `}
              {this.props.totalNodes.toFixed(0)}
            </div>
          </Grid>
          <Grid item md={7} className="proposalInfoView">
            {/* <button className={proposal.active ? "activeVoteButton" : "voteButton"}> Vote on Proposal </button> */}
            {/* <Button className={ proposal.active ? 'activeVoteButton' : 'voteButton' }>
                  Vote on Proposal
                </Button> */}
            <h1 className="proposalHeading" onClick={() => selectProposal(proposal.Hash)}>
              {proposal.DataString[0][1].name ? (
                proposal.DataString[0][1].name.split('\n', 1)[0]
              ) : (
                <span style={{ color: 'grey' }}>No name available for this proposal.</span>
              )}
            </h1>
            <div className="proposalDetail">
              {proposal.DataString[0][1].description
                ? `${proposal.DataString[0][1].description.substr(0, 120)}...`
                : 'No description available for this proposal.'}
            </div>
          </Grid>

          {user ? (
            <Grid item md={3} className="top-vote__wrapper">
              {user ? <div className="vote-text">Vote on Proposal</div> : null}
              <Button className="vote-up" onClick={() => this.voteUp(proposal)}>
                <img src={voteUpIcon} className="upVoteIcon" alt="" />
              </Button>
              <Button className="vote-down" onClick={() => this.voteDown(proposal)}>
                <img src={voteDownIcon} className="downVoteIcon" alt="" />
              </Button>
              <div className="vote-count">
                <div className="vote-number">{proposal.YesCount}</div>
                <div className="vote-number">{proposal.NoCount}</div>
              </div>
            </Grid>
          ) : (
            <Grid item md={3} className="vote__wrapper">
              <div className="vote-up">
                <img alt="a" src={voteUpIcon} className="smallUpVoteIcon" />
                <span className="voteNumber">{proposal.YesCount}</span>
              </div>
              <div className="vote-down">
                <img alt="a" src={voteDownIcon} className="smallDownVoteIcon" />
                <span className="voteNumber">{proposal.NoCount}</span>
              </div>
            </Grid>
          )}
        </Grid>
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
  return { voteOnProposal: params => dispatch(actions.voteOnProposal(params)) };
};

export default connect(stateToProps, dispatchToProps)(withStyles(proposalCardStyle)(ProposalCard));
