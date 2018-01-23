/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import actions from '../../redux/actions';
import { connect } from 'react-redux';

//import antd components
import { Divider, Button } from 'antd';
import { Grid, withStyles } from 'material-ui';
import { Progress } from 'antd';

// import style
import { proposalCardStyle } from './styles';

class ProposalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposalList: [
        {
          name: 'Proposal 1',
          detail:
            'Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.',
          upVote: 23,
          downVote: 8,
          progress: 10,
          active: true,
          id: 1,
        },
        {
          name: 'Proposal 2',
          detail:
            'Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.',
          upVote: 12,
          downVote: 1,
          progress: 20,
          active: false,
          id: 2,
        },
        {
          name: 'Proposal 3',
          detail:
            'Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.',
          upVote: 36,
          downVote: 9,
          progress: 60,
          active: false,
          id: 3,
        },
        {
          name: 'Proposal 4',
          detail:
            'Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.',
          upVote: 23,
          downVote: 8,
          progress: 90,
          active: false,
          id: 4,
        },
      ],
    };
  }

  voteUp(vote) {
    if (this.props.user) {
      console.log(
        this.props.user.displayName + ' Voted For Up ' + ' for id ' + vote.id
      );
    }
  }

  voteDown(vote) {
    if (this.props.user) {
      console.log(
        this.props.user.displayName + ' Voted For Down ' + ' for id ' + vote.id
      );
    }
  }

  render() {
    const { classes, selectProposal, user } = this.props;


    const docIcon = require('../../assets/img/png_stats_propposal_votes.png'),
      voteUpIcon = require('../../assets/img/png_button_up.png'),
      voteDownIcon = require('../../assets/img/png_button_down.png');
    console.log('Props', this.props);
    return (
      <Grid container className={classes.proposalRoot}>
        {this.state.proposalList.map((proposal) => {
          return (
            <Grid container md={12} className="proposalRow" key={proposal.id}>
              <Grid item md={2} className="proposalView">
                <Progress
                  type="circle"
                  percent={proposal.progress}
                  format={percent => (
                    <img src={docIcon} className="progressIcon" />
                  )}
                  className="progress-dial"
                  strokeWidth={8}
                  status={proposal.progress < 50 ? 'exception' : 'success'}
                />
                <div className="proposalStatusNo">
                  <span className="proposalStatusActiveNo">
                    {proposal.progress}{' '}
                  </span>/100
                </div>
              </Grid>
              <Grid item md={7} className="proposalInfoView">
                {/* <button className={proposal.active ? "activeVoteButton" : "voteButton"}> Vote on Proposal </button> */}
                {/* <Button className={ proposal.active ? 'activeVoteButton' : 'voteButton' }>
                  Vote on Proposal
                </Button> */}
                <h1 className="proposalHeading" onClick={() => selectProposal(proposal.id)}>
                  {' '} {proposal.name}
                </h1>
                <div className="proposalDetail">{proposal.detail}</div>
              </Grid>

              {user ? (
                <Grid item md={3} className="top-vote__wrapper">
                  {user?<div className="vote-text">Vote on Proposal</div>:null}
                  <Button className="vote-up" onClick={() => this.voteUp(proposal)}>
                    <img src={voteUpIcon} className="upVoteIcon" alt="" />
                  </Button>
                  <Button className="vote-down" onClick={() => this.voteDown(proposal)}>
                    <img src={voteDownIcon} className="downVoteIcon" alt="" />
                  </Button>
                  <div className="vote-count">
                    <div className="vote-number">{proposal.upVote}</div>
                    <div className="vote-number">{proposal.downVote}</div>
                  </div>
                </Grid>
              ) : (
                <Grid item md={3} className="vote__wrapper">
                  <div className="vote-up">
                    <img src={voteUpIcon} className="smallUpVoteIcon" />
                    <span className="voteNumber">{proposal.upVote}</span>
                  </div>
                  <div className="vote-down">
                    <img src={voteDownIcon} className="smallDownVoteIcon" />
                    <span className="voteNumber">{proposal.downVote}</span>
                  </div>
                </Grid>
              )}
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.app.currentUser,
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(proposalCardStyle)(ProposalCard)
);
