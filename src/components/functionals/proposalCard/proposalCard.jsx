import React, { Component } from 'react';
import actions from '../../../redux/actions';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import swal from 'sweetalert';
import aes from 'aes256';

// Import provider HOC's
import { withFirebase } from '../../../providers/firebase';

//import antd components
import { Modal, Table, Button } from 'antd';
import { Grid } from '@material-ui/core';

// import custom components
import ProposalVoting from '../proposalVoting/proposalVoting';
import ProposalProgress from '../proposalProgress/proposalProgress';
import ProposalInfo from '../proposalInfo/propsalInfo';

// import style
import injectSheet from 'react-jss';
import proposalCardStyle from './proposalCard.style';

import signVote from '../../../Helpers/sign-vote'

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
      showError: false,
      hideME: false
    };

    this.updateError = this.updateError.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.vote = this.vote.bind(this);
  }

  // add Firebase as global var in component
  firebase = this.props.firebase;

  async componentWillMount() {
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
    const hideME = await this.firebase.haveToHideThisProposal(
      this.props.proposal.Hash
    );
    if (hideME) {
      this.props.onHidden();
    }
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
          endDate.getFullYear(),
        hideME
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

  async cantVoteErrorModal(type) {
    const modalType = {
      e2fa: {
        mText: 'Must have 2FA enabled to vote',
        buttons: {
          cancel: true,
          goToPage: {
            text: 'Enable 2FA',
            value: 'userAccount'
          }
        }
      },
      eMn: {
        mText: 'Must have, at least, one Masternode registered',
        buttons: {
          cancel: true,
          goToPage: {
            text: 'Add Masternode',
            value: 'masterNode'
          }
        }
      },
      e2faeMn: {
        mText: 'Must have, at least, one Masternode registered and 2FA Enabled',
        buttons: {
          cancel: true,
          goToPageA: {
            text: 'Enable 2FA',
            value: 'userAccount'
          },
          goToPageB: {
            text: 'Add Masternode',
            value: 'masterNode'
          }
        }
      }
    }[type];

    const modalValue = await swal({
      title: 'Oops...',
      text: modalType.mText,
      icon: 'error',
      buttons: modalType.buttons
    });
    if (modalValue) {
      this.props.setPage(modalValue);
    }
    return;
  }

  async onVote(voteOutcome) {
    const { user } = this.props;
    const masternodes = await this.firebase.getMasternodeListByUser(user.uid);

    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Must be logged in to vote!',
        icon: 'error'
      });
      return;
    }

    const twoFA = await this.firebase.getFire2FAMethod(user.uid, 'twoFA');
    let modalType = !twoFA ? 'e2fa' : '';
    modalType = !masternodes ? `${modalType}eMn` : modalType;

    if (modalType) {
      await this.cantVoteErrorModal(modalType);
      return;
    }

    this.vote(masternodes, voteOutcome);
  }

  async vote(masternodes, voteOutcome) {
    const { proposal, user } = this.props;
    const cipher = await this.firebase.getCipher();

    const MN = masternodes;
    let mnData = [];
    for (let i = 0; i < masternodes.length; i++) {
      const decryptedMn = cipher.decrypt(MN[i].mnPrivateKey)
      const decryptedTxid = cipher.decrypt(MN[i].txid)
      const proposalVoteNo = {
        mnPrivateKey: decryptedMn,
        vinMasternode: decryptedTxid,
        gObjectHash: proposal.Hash,
        voteOutcome
      };
      const checkIcon = 'https://s3.amazonaws.com/masterminer/success.png';
      const xIcon = 'https://s3.amazonaws.com/masterminer/error.png';

      const voteData = signVote(proposalVoteNo);

      this.props
        .voteOnProposal(voteData)
        .then(data => {
          const mnDataInitLength = mnData.length;
          if (RegExp(/\s-32603\s/).test(data)) {
            if (RegExp(/Failure to find masternode in list/).test(data)) {
              mnData.push({
                key: `${i}`,
                name: MN[i].name,
                status: (
                  <div
                    onClick={() =>
                      this.updateError('Failure to find masternode in list')
                    }
                  >
                    <img src={xIcon} height="20px" width="20px" alt="xIcon" />
                  </div>
                )
              });
            }
            if (RegExp(/Error voting/).test(data)) {
              mnData.push({
                key: `${i}`,
                name: MN[i].name,
                status: (
                  <div
                    onClick={() =>
                      this.updateError(
                        `Invalid proposal hash. Please check: ${decryptedMn}`
                      )
                    }
                  >
                    <img src={xIcon} height="20px" width="20px" alt="xIcon" />
                  </div>
                )
              });
            }

            if (mnDataInitLength === mnData.legth) {
              mnData.push({
                key: `${i}`,
                name: MN[i].name,
                status: (
                  <div
                    onClick={() =>
                      this.updateError(
                        `Vote has Failed. Please check: ${decryptedMn}`
                      )
                    }
                  >
                    <img src={xIcon} height="20px" width="20px" alt="xIcon" />
                  </div>
                )
              });
            }
          }
          if (RegExp(/\s-8\s/).test(data)) {
            if (RegExp(/mn tx hash must be hexadecimal string/).test(data)) {
              mnData.push({
                key: `${i}`,
                name: MN[i].name,
                status: (
                  <div
                    onClick={() =>
                      this.updateError(
                        `Invalid txid. Please check: ${decryptedTxid}`
                      )
                    }
                  >
                    <img src={xIcon} height="20px" width="20px" alt="xIcon" />
                  </div>
                )
              });
            }
          }

          mnData.push({
            key: `${i}`,
            name: MN[i].name,
            status: (
              <img src={checkIcon} height="20px" width="20px" alt="checkIcon" />
            )
          });
          this.setState({
            mnData: mnData
          });
          this.props.getProposals();
          if (i + 1 === masternodes.length) {
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
              <div
                onClick={() =>
                  this.updateError(`Invalid masternode key or txid`)
                }
              >
                <img src={xIcon} height="20px" width="20px" alt="xIcon" />
              </div>
            )
          });

          if (i + 1 === masternodes.length) {
            this.setState({
              visible: true
            });
          }
        });
    }
  }

  render() {
    const { classes, selectProposal, user, proposal, deviceType } = this.props;

    if (this.state.hideME) {
      return null;
    }

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

    const yesCount = parseInt(proposal.YesCount, 10);
    const noCount = parseInt(proposal.NoCount, 10);
    const totalNodes = parseInt(this.props.totalNodes, 10);
    const totalVotes = parseInt(proposal.AbsoluteYesCount, 10);

    const logged = user ? true : false;
    const votingCount = {
      yesCount,
      noCount,
      abstainCount: proposal.AbstainCount
    };
    const progressObj = {
      totalNodes,
      totalVotes,
      passingPercentage: 10,
      funded: proposal.fCachedFunding
    };
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
        {deviceType === 'desktop' && (
          <Grid container className="proposalRow" key={proposal.Hash}>
            <Grid item md={2} xs={3} className="proposalProgressView">
              <ProposalProgress progressObj={progressObj} />
            </Grid>
            <Grid
              item
              md={7}
              xs={6}
              className="proposalInfoView"
              onClick={() => selectProposal(proposal)}
            >
              <ProposalInfo
                title={proposalTitle}
                paymentAmount={payment_amount}
                paymentType={payment_type}
                daysRemaining={days_remaining}
                monthRemaining={month_remaining}
              />
            </Grid>
            <Grid item md={3} xs={3} className="proposalVoteView">
              <ProposalVoting
                logged={logged}
                votingCount={votingCount}
                onVote={vote => this.onVote(vote)}
              />
            </Grid>
          </Grid>
        )}
        {deviceType === 'mobile' && (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className="proposalRow"
            key={proposal.Hash}
          >
            <Grid item md={6} xs={6} className="proposalProgressView">
              <ProposalProgress
                deviceType={deviceType}
                progressObj={progressObj}
              />
            </Grid>
            <Grid item md={6} xs={6} className="proposalVoteView">
              <ProposalVoting
                deviceType={deviceType}
                logged={logged}
                votingCount={votingCount}
                onVote={vote => this.onVote(vote)}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              className="proposalInfoView"
              onClick={() => selectProposal(proposal)}
            >
              <ProposalInfo
                deviceType={deviceType}
                title={proposalTitle}
                paymentAmount={payment_amount}
                paymentType={payment_type}
                daysRemaining={days_remaining}
                monthRemaining={month_remaining}
              />
            </Grid>
          </Grid>
        )}
        <Modal
          title="Results"
          visible={this.state.visible}
          onOk={this.handleOk}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Ok
            </Button>
          ]}
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
    getProposals: () => dispatch(actions.getProposals()),
    setPage: page => dispatch(actions.setPage(page))
  };
};

export default compose(
  withFirebase,
  connect(
    stateToProps,
    dispatchToProps
  ),
  injectSheet(proposalCardStyle)
)(ProposalCard);
