/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { checkVoted, voted } from '../../API/firebase';

//import antd components
import { Button } from 'antd';
import { Grid, withStyles } from 'material-ui';
import { Progress } from 'antd';
import Cryptr from 'cryptr';

// import style
import { proposalCardStyle } from './styles';

const cryptr = new Cryptr('myTotalySecretKey');

class ProposalCard extends Component {
  state = {
    days_remaining: 0,
    endDate: '',
    payment_amount: 0,
    payment_type: ''
  };

  componentWillMount() {
    let startDate = new Date();
    let endDate = new Date(this.props.proposal.DataString[0][1].end_epoch * 1000);
    const payment_amount = this.props.proposal.DataString[0][1].payment_amount;
    if (endDate > startDate) {
      let timeDiff = endDate.getTime() - startDate.getTime();
      let days_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24);
      const month_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 30);
      this.setState({
        days_remaining,
        month_remaining,
        endDate:
          endDate.getDate() +
          '/' +
          (parseInt(endDate.getMonth(), 10) + 1) +
          '/' +
          endDate.getFullYear()
      });
    }
    this.setState({ payment_amount, payment_type: 'one-time payment' });
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

    if (!user.MasterNodes) {
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
          user.MasterNodes.map(mnObj => {
            const proposalVoteYes = {
              mnPrivateKey: cryptr.decrypt(mnObj.key),
              vinMasternode: cryptr.decrypt(mnObj.vin),
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
            return value;
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

    if (!user.MasterNodes) {
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
          user.MasterNodes.map(mnObj => {
            const proposalVoteNo = {
              mnPrivateKey: cryptr.decrypt(mnObj.key),
              vinMasternode: cryptr.decrypt(mnObj.vin),
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
            return value;
          });
        }
      })
      .catch(err => {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      });
  }

  render() {
    const { classes, selectProposal, user, proposal, deviceType } = this.props;
    const proposalTitle = proposal.DataString[0][1].title || proposal.DataString[0][1].name;
    let { days_remaining, month_remaining, payment_amount, payment_type } = this.state;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const docIcon = require('../../assets/img/png_stats_propposal_votes.png');
    const voteUpIcon = require('../../assets/img/png_button_up.png');
    const voteDownIcon = require('../../assets/img/png_button_down.png');

    // Some Maths ;P
    const progress = parseInt(proposal.YesCount, 10) / parseInt(this.props.totalNodes, 10) * 100; //remove added counts later and below

    return (
      <Grid container className={style}>
        <Grid item container md={12} xs={12} className="proposalRow" key={proposal.Hash}>
          <Grid item md={2} xs={3} className="proposalView">
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
                {proposal.YesCount}
              </span>
              {` / `}
              {this.props.totalNodes.toFixed(0)}
            </div>
          </Grid>
          <Grid item md={7} xs={6} className="proposalInfoView">
            <h1 className="proposalHeading" onClick={() => selectProposal(proposal)}>
              {proposalTitle ? (
                // proposal.DataString[0][1].name.split('\n', 1)[0]
                proposalTitle.split('\n', 1)[0]
              ) : (
                  <span style={{ color: 'grey' }}>No title available for this proposal.</span>
                )}
            </h1>
            <div className="proposalDetail">
              <span>{`${payment_amount} SYS ${payment_type} `}</span>

              {days_remaining < 30 ? (
                <span>{`(${days_remaining} Day${days_remaining > 1 ? 's' : ''} Remaining)`}</span>
              ) : (
                  <span>{`(${month_remaining} Month${
                    month_remaining > 1 ? 's' : ''
                    } Remaining)`}</span>
                )}
            </div>
          </Grid>

          {user ? (
            <Grid item md={3} xs={3} className="top-vote__wrapper">
              {user ? <div className="vote-text">Vote on Proposal</div> : null}
              <Button className={deviceType === 'mobile' ? "login-vote-up" : 'vote-up'} onClick={() => this.voteUp(proposal)}>
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
              <Grid item md={3} xs={2} className="vote__wrapper">
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
