/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { checkVoted, voted } from '../../API/firebase';

//import antd components
import { Button, Modal, Table } from 'antd';
import { Grid } from '@material-ui/core';
import { Progress } from 'antd';
import Cryptr from 'cryptr';

// import style
import injectSheet from 'react-jss';
import { proposalCardStyle } from './styles';

class ProposalCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days_remaining: 0,
      endDate: '',
      payment_amount: 0,
      payment_type: '',
      mnError: '',
      visible: false,
      mnData: [],
      showError: false
    };

    this.updateError = this.updateError.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
  }

  componentWillMount() {
    const {
      nPayment,
      end_epoch,
      payment_amount
    } = this.props.proposal.DataString[0][1];
    //const millsMonth = this.props.millsMonth;
    const today = new Date();
    //alert(nPayment);
    //const startDate = new Date(first_epoch * 1000);
    const endDate = new Date(end_epoch * 1000);
    //const nPayment = Math.round((endDate - startDate) / millsMonth) + 1;
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

  updateError(error) {
    this.setState({
      mnError: error,
      showError: !this.state.showError
    });
  }

  handleOk(e) {
    this.setState({
      visible: false
    });
  }

  handleCancel(e) {
    this.setState({
      visible: false
    });
  }

  voteUp(vote) {
    const { proposal, user } = this.props;
    const cryptr = new Cryptr(user.uid);

    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Must be logged in to vote!',
        icon: 'error'
      });
    }

    if (this.props.app.auth !== true) {
      swal({
        title: 'Oops...',
        text: 'Must have 2FA enabled to vote',
        icon: 'error'
      });

      return;
    }

    if (!user.MasterNodes || user.MasterNodes.length === 0) {
      swal({
        title: 'Oops...',
        text: 'You need to add a MasterNode to your account.',
        icon: 'error'
      });
      return;
    }

    checkVoted(user, proposal, user.MasterNodes)
      .then(value => {
        if (value) {
        }

        const MN = user.MasterNodes;
        let mnData = [];
        for (let i = 0; i < user.MasterNodes.length; i++) {
          const proposalVoteYes = {
            mnPrivateKey: cryptr.decrypt(MN[i].mnPrivateKey),
            vinMasternode: cryptr.decrypt(MN[i].txid),
            gObjectHash: proposal.Hash,
            voteOutcome: 1
          };
          const checkIcon = 'https://s3.amazonaws.com/masterminer/success.png';
          const xIcon = 'https://s3.amazonaws.com/masterminer/error.png';

          this.props
            .voteOnProposal(proposalVoteYes)
            .then(data => {
              if (RegExp(/\s-32603\s/).test(data)) {
                if (RegExp(/Failure to find masternode in list/).test(data)) {
                  mnData.push({
                    key: `${i}`,
                    name: MN[i].name,
                    status: (
                      <a
                        onClick={() =>
                          this.updateError('Failure to find masternode in list')
                        }
                      >
                        <img
                          src={xIcon}
                          height="20px"
                          width="20px"
                          alt="xIcon"
                        />
                      </a>
                    )
                  });
                }
                if (RegExp(/Error voting/).test(data)) {
                  mnData.push({
                    key: `${i}`,
                    name: MN[i].name,
                    status: (
                      <a
                        onClick={() =>
                          this.updateError(
                            `Invalid proposal hash. Please check: ${cryptr.decrypt(
                              MN[i].mnPrivateKey
                            )}`
                          )
                        }
                      >
                        <img
                          src={xIcon}
                          height="20px"
                          width="20px"
                          alt="xIcon"
                        />
                      </a>
                    )
                  });
                }
                if (i + 1 === user.MasterNodes.length) {
                  this.setState({
                    mnData: mnData
                  });

                  this.props.getProposals();
                  let mnKeyIds = [];
                  user.MasterNodes.forEach(mnObj => {
                    mnKeyIds.push(mnObj.keyId);
                    voted(user, proposal, 'Yes', 1, mnKeyIds);
                  });

                  this.setState({
                    visible: true
                  });
                }
                return;
              }

              if (RegExp(/\s-8\s/).test(data)) {
                if (
                  RegExp(/mn tx hash must be hexadecimal string/).test(data)
                ) {
                  mnData.push({
                    key: `${i}`,
                    name: MN[i].name,
                    status: (
                      <a
                        onClick={() =>
                          this.updateError(
                            `Invalid txid. Please check: ${cryptr.decrypt(
                              MN[i].txid
                            )}`
                          )
                        }
                      >
                        <img
                          src={xIcon}
                          height="20px"
                          width="20px"
                          alt="xIcon"
                        />
                      </a>
                    )
                  });
                }

                if (i + 1 === user.MasterNodes.length) {
                  this.setState({
                    mnData: mnData
                  });

                  this.props.getProposals();
                  let mnKeyIds = [];
                  user.MasterNodes.forEach(mnObj => {
                    mnKeyIds.push(mnObj.keyId);
                    voted(user, proposal, 'Yes', 1, mnKeyIds);
                  });

                  this.setState({
                    visible: true
                  });
                }
                return;
              }

              mnData.push({
                key: `${i}`,
                name: MN[i].name,
                status: (
                  <img
                    src={checkIcon}
                    height="20px"
                    width="20px"
                    alt="checkIcon"
                  />
                )
              });
              this.setState({
                mnData: mnData
              });

              this.props.getProposals();
              let mnKeyIds = [];
              user.MasterNodes.forEach(mnObj => {
                mnKeyIds.push(mnObj.keyId);
                voted(user, proposal, 'Yes', 1, mnKeyIds);
              });

              if (i + 1 === user.MasterNodes.length) {
                this.setState({
                  visible: true
                });
              }
            })
            .catch(err => {
              mnData.push({
                key: `${i}`,
                name: MN[i].name,
                status: (
                  <a
                    onClick={() =>
                      this.updateError(`Invalid masternode key or txid`)
                    }
                  >
                    <img src={xIcon} height="20px" width="20px" alt="xIcon" />
                  </a>
                )
              });

              if (i + 1 === user.MasterNodes.length) {
                this.setState({
                  visible: true
                });
              }
            });
        }
      })
      .catch(err => {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      });
  }

  voteDown(vote) {
    const { proposal, user } = this.props;
    const cryptr = new Cryptr(user.uid);

    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Must be logged in to vote!',
        icon: 'error'
      });
    }

    if (this.props.app.auth !== true) {
      swal({
        title: 'Oops...',
        text: 'Must have 2FA enabled to vote',
        icon: 'error'
      });

      return;
    }

    if (!user.MasterNodes) {
      swal({
        title: 'Oops...',
        text:
          'You either need to enable 2FA to use your MasterNodes, or must add a MasterNode to your account.',
        icon: 'error'
      });
      return;
    }

    checkVoted(user, proposal, user.MasterNodes)
      .then(value => {
        if (value) {
        }

        const MN = user.MasterNodes;
        let mnData = [];
        for (let i = 0; i < user.MasterNodes.length; i++) {
          const proposalVoteNo = {
            mnPrivateKey: cryptr.decrypt(MN[i].mnPrivateKey),
            vinMasternode: cryptr.decrypt(MN[i].txid),
            gObjectHash: proposal.Hash,
            voteOutcome: 2
          };
          const checkIcon = 'https://s3.amazonaws.com/masterminer/success.png';
          const xIcon = 'https://s3.amazonaws.com/masterminer/error.png';

          this.props
            .voteOnProposal(proposalVoteNo)
            .then(data => {
              if (RegExp(/\s-32603\s/).test(data)) {
                if (RegExp(/Failure to find masternode in list/).test(data)) {
                  mnData.push({
                    key: `${i}`,
                    name: MN[i].name,
                    status: (
                      <a
                        onClick={() =>
                          this.updateError('Failure to find masternode in list')
                        }
                      >
                        <img
                          src={xIcon}
                          height="20px"
                          width="20px"
                          alt="xIcon"
                        />
                      </a>
                    )
                  });
                }
                if (RegExp(/Error voting/).test(data)) {
                  mnData.push({
                    key: `${i}`,
                    name: MN[i].name,
                    status: (
                      <a
                        onClick={() =>
                          this.updateError(
                            `Invalid proposal hash. Please check: ${cryptr.decrypt(
                              MN[i].mnPrivateKey
                            )}`
                          )
                        }
                      >
                        <img
                          src={xIcon}
                          height="20px"
                          width="20px"
                          alt="xIcon"
                        />
                      </a>
                    )
                  });
                }
                if (i + 1 === user.MasterNodes.length) {
                  this.setState({
                    mnData: mnData
                  });

                  this.props.getProposals();
                  let mnKeyIds = [];
                  user.MasterNodes.forEach(mnObj => {
                    mnKeyIds.push(mnObj.keyId);
                    voted(user, proposal, 'No', 2, mnKeyIds);
                  });

                  this.setState({
                    visible: true
                  });
                }
                return;
              }

              if (RegExp(/\s-8\s/).test(data)) {
                if (
                  RegExp(/mn tx hash must be hexadecimal string/).test(data)
                ) {
                  mnData.push({
                    key: `${i}`,
                    name: MN[i].name,
                    status: (
                      <a
                        onClick={() =>
                          this.updateError(
                            `Invalid txid. Please check: ${cryptr.decrypt(
                              MN[i].txid
                            )}`
                          )
                        }
                      >
                        <img
                          src={xIcon}
                          height="20px"
                          width="20px"
                          alt="xIcon"
                        />
                      </a>
                    )
                  });
                }

                if (i + 1 === user.MasterNodes.length) {
                  this.setState({
                    mnData: mnData
                  });

                  this.props.getProposals();
                  let mnKeyIds = [];
                  user.MasterNodes.forEach(mnObj => {
                    mnKeyIds.push(mnObj.keyId);
                    voted(user, proposal, 'No', 2, mnKeyIds);
                  });

                  this.setState({
                    visible: true
                  });
                }
                return;
              }

              mnData.push({
                key: `${i}`,
                name: MN[i].name,
                status: (
                  <img
                    src={checkIcon}
                    height="20px"
                    width="20px"
                    alt="checkIcon"
                  />
                )
              });
              this.setState({
                mnData: mnData
              });

              this.props.getProposals();
              let mnKeyIds = [];
              user.MasterNodes.forEach(mnObj => {
                mnKeyIds.push(mnObj.keyId);
                voted(user, proposal, 'No', 2, mnKeyIds);
              });

              if (i + 1 === user.MasterNodes.length) {
                this.setState({
                  visible: true
                });
              }
            })
            .catch(err => {
              mnData.push({
                key: `${i}`,
                name: MN[i].name,
                status: (
                  <a
                    onClick={() =>
                      this.updateError(`Invalid masternode key or txid`)
                    }
                  >
                    <img src={xIcon} height="20px" width="20px" alt="xIcon" />
                  </a>
                )
              });

              if (i + 1 === user.MasterNodes.length) {
                this.setState({
                  visible: true
                });
              }
            });
        }
      })
      .catch(err => {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      });
  }

  render() {
    const { classes, selectProposal, user, proposal, deviceType } = this.props;

    const proposalTitle =
      proposal.DataString[0][1].title || proposal.DataString[0][1].name;
    let {
      days_remaining,
      month_remaining,
      payment_amount,
      payment_type
    } = this.state;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const docIcon = require('../../assets/img/png_stats_propposal_votes.png');
    const voteUpIcon = require('../../assets/img/png_button_up.png');
    const voteDownIcon = require('../../assets/img/png_button_down.png');
    const yesCount = parseInt(proposal.YesCount, 10);
    const noCount = parseInt(proposal.NoCount, 10);
    const totalNodes = parseInt(this.props.totalNodes, 10);
    const totalVotes = yesCount - noCount > 0 ? yesCount - noCount : 0;

    // Some Maths ;P
    const progress = (totalVotes / totalNodes) * 100; //remove added counts later and below

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: text => <span>{text}</span>
      }
    ];

    return (
      <Grid container className={style}>
        <Grid
          item
          container
          md={12}
          xs={12}
          className="proposalRow"
          key={proposal.Hash}
        >
          <Grid item md={2} xs={3} className="proposalView">
            <Progress
              type="circle"
              percent={progress}
              format={percent => (
                <img alt="a" src={docIcon} className="progressIcon" />
              )}
              className="progress-dial"
              strokeWidth={12}
              status={
                progress < 35
                  ? 'exception'
                  : progress < 100
                    ? 'active'
                    : 'success'
              }
            />
            <div className="proposalStatusNo">
              <span
                className={
                  progress < 35
                    ? 'proposalStatusExecptionNo'
                    : progress < 100
                      ? 'proposalStatusActiveNo'
                      : 'proposalStatusSuccessNo'
                }
              >
                {totalVotes}
              </span>
              {` / `}
              {totalNodes}
            </div>
          </Grid>
          <Grid item md={7} xs={6} className="proposalInfoView">
            <h1
              className="proposalHeading"
              onClick={() => selectProposal(proposal)}
            >
              {proposalTitle ? (
                proposalTitle.split('\n', 1)[0]
              ) : (
                <span style={{ color: 'grey' }}>
                  No title available for this proposal.
                </span>
              )}
            </h1>
            <div className="proposalDetail">
              <span>{`${payment_amount} SYS ${payment_type} `}</span>

              {days_remaining < 30 ? (
                <span>{`(${days_remaining} Day${
                  days_remaining > 1 ? 's' : ''
                } Remaining)`}</span>
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
                  <Button
                    className="btn-vote-up"
                    onClick={() => this.voteUp(proposal)}
                  >
                    <img src={voteUpIcon} className="upVoteIcon" alt="" />
                  </Button>
                  <span className="voteNumber">{proposal.YesCount}</span>
                </div>
                <div className="vote-item">
                  <Button
                    className="btn-vote-down"
                    onClick={() => this.voteDown(proposal)}
                  >
                    <img src={voteDownIcon} className="downVoteIcon" alt="" />
                  </Button>
                  <span className="voteNumber">{proposal.NoCount}</span>
                </div>
              </Grid>
            ) : (
              <Grid item md={3} xs={3} className="desktop-vote__wrapper">
                <div className="vote-text">Vote on Proposal</div>
                <Button
                  className="vote-up"
                  onClick={() => this.voteUp(proposal)}
                >
                  <img src={voteUpIcon} className="upVoteIcon" alt="" />
                </Button>
                <Button
                  className="vote-down"
                  onClick={() => this.voteDown(proposal)}
                >
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
        <Modal
          title="Results"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          style={{ top: '200px', textAlign: 'center' }}
        >
          <Table
            pagination={{
              pageSize: 5,
              size: 'small'
            }}
            rowKey={record => record.key}
            columns={columns}
            dataSource={this.state.mnData}
          />

          <div style={{ color: 'red' }}>
            {this.state.showError ? this.state.mnError : ''}
          </div>
        </Modal>
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.app.currentUser,
    app: state.app,
    millsMonth: state.proposals.millsMonth
  };
};

const dispatchToProps = dispatch => {
  return {
    voteOnProposal: params => dispatch(actions.voteOnProposal(params)),
    getProposals: () => dispatch(actions.getProposals())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectSheet(proposalCardStyle)(ProposalCard));
