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
import { fire } from '../../API/firebase';
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
    const { start_epoch, end_epoch, payment_amount } = this.props.proposal.DataString[0][1];
    const millsMonth = this.props.millsMonth;
    const today = new Date();

    const startDate = new Date(start_epoch * 1000);
    const endDate = new Date(end_epoch * 1000);
    const nPayment = Math.round((endDate - startDate) / millsMonth) + 1;
    if (endDate > today) {
      const timeDiff = endDate.getTime() - today.getTime();
      const days_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24);
      const month_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 30);
      const payment_type = nPayment > 1 ? 'per month' : 'one-time payment';
      this.setState({
        days_remaining,
        month_remaining,
        payment_amount,
        payment_type,
        endDate:
          endDate.getDate() +
          '/' +
          (parseInt(endDate.getMonth(), 10) + 1) +
          '/' +
          endDate.getFullYear()
      });
    }
    //this.setState({ payment_amount, payment_type: 'one-time payment' });
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

    checkVoted(user, proposal, user.MasterNodes)
      .then(value => {
        if (value) {
          swal({
            title: 'Oops...',
            text: 'You already voted.',
            icon: 'error'
          });

          return;
        } else if (!value) {
          let mnKeyIds = [];
          user.MasterNodes.forEach(mnObj => {
            mnKeyIds.push(mnObj.keyId);
            fire
              .database()
              .ref('votes/' + user.uid)
              .child(proposal.Hash)
              .once('value', snap => {
                if (snap.val() !== null) {
                  if (snap.val().mnKeyIds.includes(mnObj.keyId) === true) {
                    return;
                  }
                }

                const proposalVoteYes = {
                  mnPrivateKey: cryptr.decrypt(mnObj.mnPrivateKey),
                  vinMasternode: cryptr.decrypt(mnObj.vin),
                  gObjectHash: proposal.Hash,
                  voteOutcome: 1
                };

                this.props
                  .voteOnProposal(proposalVoteYes)
                  .then(data => {
                    swal({ title: 'Success', text: `${data}`, icon: 'success' });
                    voted(user, proposal, 'Yes', 1, mnKeyIds);
                    this.props.getProposals();
                  })
                  .catch(err => {
                    const content = document.createElement('div');
                    content.innerHTML = `Unable to cast vote with <strong>${
                      mnObj.name
                    }</strong>.  Please check your key or txid credentials.`;
                    swal({
                      html: true,
                      title: 'Oops...',
                      content: content,
                      icon: 'error'
                    });
                  });
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

    if (!user.MasterNodes) {
      swal({
        title: 'Oops...',
        text: 'Must own a MasterNode in order to vote',
        icon: 'error'
      });
      return;
    }

    checkVoted(user, proposal, user.MasterNodes)
      .then(value => {
        if (value) {
          swal({
            title: 'Oops...',
            text: 'You already voted.',
            icon: 'error'
          });

          return;
        } else if (!value) {
          let mnKeyIds = [];
          user.MasterNodes.forEach(mnObj => {
            mnKeyIds.push(mnObj.keyId);
            fire
              .database()
              .ref('votes/' + user.uid)
              .child(proposal.Hash)
              .once('value', snap => {
                if (snap.val() !== null) {
                  if (snap.val().mnKeyIds.includes(mnObj.keyId) === true) {
                    return;
                  }
                }

                const proposalVoteNo = {
                  mnPrivateKey: cryptr.decrypt(mnObj.mnPrivateKey),
                  vinMasternode: cryptr.decrypt(mnObj.vin),
                  gObjectHash: proposal.Hash,
                  voteOutcome: 2
                };

                this.props
                  .voteOnProposal(proposalVoteNo)
                  .then(data => {
                    swal({ title: 'Success', text: `${data}`, icon: 'success' });
                    voted(user, proposal, 'No', 2, mnKeyIds);
                    this.props.getProposals();
                  })
                  .catch(err => {
                    swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
                  });
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
            deviceType === 'mobile' ? (
              <Grid item md={3} xs={3} className="mobile-vote__wrapper">
                <div className="vote-text">Vote</div>
                <div className="vote-item">
                  <Button className="btn-vote-up" onClick={() => this.voteUp(proposal)}>
                    <img src={voteUpIcon} className="upVoteIcon" alt="" />
                  </Button>
                  <span className="voteNumber">{proposal.YesCount}</span>
                </div>
                <div className="vote-item">
                  <Button className="btn-vote-down" onClick={() => this.voteDown(proposal)}>
                    <img src={voteDownIcon} className="downVoteIcon" alt="" />
                  </Button>
                  <span className="voteNumber">{proposal.NoCount}</span>
                </div>
              </Grid>
            ) : (
              <Grid item md={3} xs={3} className="desktop-vote__wrapper">
                <div className="vote-text">Vote on Proposal</div>
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
            )
          ) : deviceType === 'mobile' ? (
            <Grid item md={3} xs={3} className="logout-vote__wrapper">
              <div className="vote-text">Status</div>
              <div className="vote-up">
                <img alt="a" src={voteUpIcon} className="smallUpVoteIcon" />
                <span className="voteNumber">{proposal.YesCount}</span>
              </div>
              <div className="vote-down">
                <img alt="a" src={voteDownIcon} className="smallDownVoteIcon" />
                <span className="voteNumber">{proposal.NoCount}</span>
              </div>
            </Grid>
          ) : (
            <Grid item md={3} xs={3} className="desktop-vote__wrapper">
              <div className="vote-text">Voting Status</div>
              <div className="vote-item__wrapper">
                <img src={voteUpIcon} className="upVoteIcon" alt="" />
                <br />
                <div className="vote-number">{proposal.YesCount}</div>
              </div>
              <div className="vote-item__wrapper">
                <img src={voteDownIcon} className="downVoteIcon" alt="" />
                <br />
                <div className="vote-number">{proposal.NoCount}</div>
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
    user: state.app.currentUser,
    millsMonth: state.proposals.millsMonth
  };
};

const dispatchToProps = dispatch => {
  return {
    voteOnProposal: params => dispatch(actions.voteOnProposal(params)),
    getProposals: () => dispatch(actions.getProposals())
  };
};

export default connect(stateToProps, dispatchToProps)(withStyles(proposalCardStyle)(ProposalCard));
