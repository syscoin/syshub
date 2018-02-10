/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { fire } from '../../API/firebase';
import { checkVoted, voted } from '../../API/firebase';

//import antd components
import { Divider, Button } from 'antd';
import { Grid, withStyles } from 'material-ui';
import { Progress } from 'antd';

// import style
import { proposalCardStyle } from './styles';

class ProposalCard extends Component {
  state = {
    days_remaining: 0,
    endDate: ''
  };

  componentWillMount() {
    let startDate = new Date();
    let endDate = new Date(this.props.proposal.DataString[0][1].end_epoch);
    if (endDate > startDate) {
      let timeDiff = Math.abs(startDate.getTime() - endDate.getTime());
      let days_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24);
      this.setState({
        days_remaining,
        endDate:
          endDate.getDate() +
          '/' +
          endDate.getMonth() +
          1 +
          '/' +
          endDate.getFullYear()
      });
    }
  }

  voteUp(vote) {
    const { proposal, user } = this.props;

    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Must be logged in to vote!',
        icon: 'error'
      });
    }

    if (!user.mnPrivateKey) {
      swal({
        title: 'Oops...',
        text: 'Must own a MasterNode in order to vote',
        icon: 'error'
      });
      return;
    }

    checkVoted(user, proposal)
      .then(value => {
        if (value) {
          swal({
            title: 'Oops...',
            text: 'You already voted.',
            icon: 'error'
          });

          return;
        } else if (!value) {
          user.mnPrivateKey.map(mnObj => {
            const proposalVoteYes = {
              mnPrivateKey: mnObj.mnPrivateKey,
              vinMasternode: mnObj.vinMasternode,
              gObjectHash: proposal.Hash,
              voteOutcome: 1
            };

            this.props
              .voteOnProposal(proposalVoteYes)
              .then(data => {
                swal({ title: 'Success', text: `${data}`, icon: 'success' });

                voted(user, proposal, 'Yes', 1);
                this.props.getProposals();
              })
              .catch(err => {
                swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
              });
          });
        }
      })
      .catch(err => {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      });
  }

  voteDown(vote) {
    const { proposal, user } = this.props;

    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Must be logged in to vote!',
        icon: 'error'
      });
    }

    if (!user.mnPrivateKey) {
      swal({
        title: 'Oops...',
        text: 'Must own a MasterNode in order to vote',
        icon: 'error'
      });
      return;
    }

    checkVoted(user, proposal)
      .then(value => {
        if (value) {
          swal({
            title: 'Oops...',
            text: 'You already voted.',
            icon: 'error'
          });

          return;
        } else if (!value) {
          user.mnPrivateKey.map(mnObj => {
            const proposalVoteNo = {
              mnPrivateKey: mnObj.mnPrivateKey,
              vinMasternode: mnObj.vinMasternode,
              gObjectHash: proposal.Hash,
              voteOutcome: 2
            };

            this.props
              .voteOnProposal(proposalVoteNo)
              .then(data => {
                swal({ title: 'Success', text: `${data}`, icon: 'success' });

                voted(user, proposal, 'No', 2);
                this.props.getProposals();
              })
              .catch(err => {
                swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
              });
          });
        }
      })
      .catch(err => {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      });
  }

  render() {
    const { classes, selectProposal, user, proposal, deviceType } = this.props;
<<<<<<< HEAD
    const proposalTitle = proposal.DataString[0][1].name.split('_').join(' ');
=======
    let { days_remaining, endDate } = this.state;
>>>>>>> bf40f66590bbca5665294964884f6e5cfad46387
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const docIcon = require('../../assets/img/png_stats_propposal_votes.png');
    const voteUpIcon = require('../../assets/img/png_button_up.png');
    const voteDownIcon = require('../../assets/img/png_button_down.png');

    // Some Maths ;P
    const progress = parseInt(proposal.YesCount + 30) / parseInt(this.props.totalNodes) * 100; //remove added counts later and below

    return (
      <Grid container className={style}>
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
              <span
                className={
                  progress < 35
                    ? 'proposalStatusExecptionNo'
                    : progress < 100 ? 'proposalStatusActiveNo' : 'proposalStatusSuccessNo'
                }
              >
                {proposal.YesCount + 30}
              </span>
              {` / `}
              {this.props.totalNodes.toFixed(0)}
            </div>
          </Grid>
          <Grid item md={7} className="proposalInfoView">
<<<<<<< HEAD
            <h1 className="proposalHeading" onClick={() => selectProposal(proposal.Hash)}>
=======
            <h1
              className="proposalHeading"
              onClick={() => selectProposal(proposal)}
            >
>>>>>>> bf40f66590bbca5665294964884f6e5cfad46387
              {proposal.DataString[0][1].name ? (
                // proposal.DataString[0][1].name.split('\n', 1)[0]
                proposalTitle.split('\n', 1)[0]
              ) : (
                <span style={{ color: 'grey' }}>No name available for this proposal.</span>
              )}
            </h1>
            <div className="proposalDetail">
              {/*proposal.DataString[0][1].description
                ? `${proposal.DataString[0][1].description.substr(0, 120)}...`
              : 'No description available for this proposal.'*/}
              {days_remaining != 0 ? (
                <span>{`${days_remaining} Day${
                  days_remaining > 1 ? 's' : ''
                } Remaining (${endDate})`}</span>
              ) : (
                <span>---</span>
              )}
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
  return {
    voteOnProposal: params => dispatch(actions.voteOnProposal(params)),
    getProposals: () => dispatch(actions.getProposals())
  };
};

export default connect(stateToProps, dispatchToProps)(withStyles(proposalCardStyle)(ProposalCard));
