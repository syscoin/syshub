import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import actions from '../../../redux/actions';
import injectSheet from 'react-jss';

// Imports provider HOC's & services
import {withFirebase} from '../../../providers/firebase';
import {nextGovernanceRewardInfo} from '../../../API/syscoin/proposals.service';

//import for text editor
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import components
import {Editor} from 'react-draft-wysiwyg';
import swal from 'sweetalert';
import {Row, Col, Icon} from 'antd';
import {Form, Input, Button, InputNumber, Modal} from 'antd';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import {Hex} from '../../../redux/helpers';
import {CopyToClipboard} from 'react-copy-to-clipboard';

// import custom components
// Todo - Split this component in more simple one

//import style
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import newProposalStyle from './newProposal.style';

const FormItem = Form.Item;
const {TextArea} = Input;

const yearDayMonth = (dateInMills, format) => {
  const firstDay = `0${new Date(dateInMills).getDate()}`.slice(-2);
  const firstMonth = `0${parseInt(new Date(dateInMills).getMonth(), 10) +
  1}`.slice(-2);
  const firstYear = new Date(dateInMills).getFullYear();

  switch (format) {
    case 'usa':
      return `${firstMonth}/${firstDay}/${firstYear}`;
    case 'eu':
      return `${firstDay}/${firstMonth}/${firstYear}`;
    default:
      return `${firstYear}-${firstMonth}-${firstDay}`;
  }
};

const lastPaymentCalculator = (nPayments, nextGovernanceDate) => {
  console.log('nPayments -->',nPayments)
  console.log('ACZ nextGovernanceDate -->', nextGovernanceDate);
  const {
    rewardDateEpoch,
    superblockCycleEpoch,
    votingDeadLineEpoch
  } = nextGovernanceDate;

  const todayEpoch = Math.round(new Date().getTime() / 1000);
  const afterVotingDeadLine = todayEpoch >= votingDeadLineEpoch ? true : false;

  const firstRewardDateEpoch =
    rewardDateEpoch + (afterVotingDeadLine ? superblockCycleEpoch : 0);
  const proposalPayoutDates = [];
  for (let i = 0; i < nPayments; i++) {
    proposalPayoutDates.push(firstRewardDateEpoch + superblockCycleEpoch * i);
  }
  const gapEnsurePayment = superblockCycleEpoch / 2;
  const paymentInfo = {
    proposalPayoutDates,
    endEpoch: proposalPayoutDates[nPayments - 1] + gapEnsurePayment
  };
  return paymentInfo;
};

class NewProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      showEditor: true,
      proposalTitle: '',
      proposalName: '',
      paymentQuantity: 1,
      proposalDetail: '',
      proposalStartEpoch: 0,
      proposalEndEpoch: 0,
      proposalPayoutDates: [],
      address: '',
      amount: 1,
      totalAmount: 0,
      recover: false,
      stepperSubHeading: '',
      proposallink: '',
      editorState: EditorState.createEmpty(),
      proposal__detail: '',
      savedProposal: {},
      visible: false,
      pValue: '',
      payValue: '',
      savedPayValue: '',
      sValue: '',
      hValue: '',
      pCopied: false,
      sCopied: false,
      hCopied: false,
      payCopied: false,
      prepareObj: {},
      userProposal: {},
      hashError: '',
      txIdError: '',
      nextGovernanceDate: {}
    };

    this.getStepContent = this.getStepContent.bind(this);
    this.getSteps = this.getSteps.bind(this);
    this.proposalTitle = this.proposalTitle.bind(this);
    //this.onDateChange = this.onDateChange.bind(this);
    this.paymentQuantity = this.paymentQuantity.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getAmount = this.getAmount.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.disabledNextBtn = this.disabledNextBtn.bind(this);
    this.createPropObj = this.createPropObj.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.submitPaymentId = this.submitPaymentId.bind(this);
    this.submitHash = this.submitHash.bind(this);
    this.urlInputChange = this.urlInputChange.bind(this);
  }

  // add Firebase as global var in component
  firebase = this.props.firebase;

  async componentWillMount() {
    const {paymentQuantity} = this.state;
    const nextGovernanceDate = await this.getGovernanceDate();
    const {endEpoch, proposalPayoutDates} = lastPaymentCalculator(
      paymentQuantity,
      nextGovernanceDate
    );
    const proposalStartEpoch = proposalPayoutDates[0];
    this.setState({
      nextGovernanceDate,
      proposalStartEpoch,
      proposalEndEpoch: endEpoch,
      proposalPayoutDates
    });
    console.log(this.state.proposalStartEpoch);
  }

  async componentDidMount() {
    const currentUser = await this.firebase.getCurrentUser();
    if (!currentUser) {
      return;
    }
    const userProp = await this.firebase.recoverPendingProposal(
      currentUser.uid
    );
    if (!userProp) {
      return;
    }
    const proposalDetail = userProp.descriptionRef;
    if (userProp.hash) {
      this.firebase.deletePendingProposal(currentUser.uid);
      return;
    }

    this.setState({
      savedProposal: userProp
    });

    swal({
      title: 'Recovery',
      text: `It seems you have some information saved in our db, would you like to recover the data?

        If you CANCEL all data will be permanently deleted and the funds will be lost if you have paid any`,
      buttons: true,
      icon: 'info'
    })
      .then(value => {
        if (value) {
          this.setState({
            recover: value,
            prepareObj: userProp.prepareObj,
            proposalDetail
          });

          let userProposal = {
            //there are another def in line 339 both have to be in sync
            type: 1,
            name: userProp.name,
            title: userProp.title,
            descriptionID: userProp.descriptionID || '',
            description: userProp.description || '',
            username: userProp.username,
            nPayment: userProp.nPayment,
            first_epoch: userProp.first_epoch,
            start_epoch: userProp.start_epoch,
            end_epoch: userProp.end_epoch,
            payment_address: userProp.payment_address,
            payment_amount: userProp.payment_amount,
            url: userProp.url
          };

          if (userProp.prepareReceipt) {
            userProposal.prepareReceipt = userProp.prepareReceipt;
            this.setState({
              pValue: userProp.prepareReceipt
            });
          }

          if (userProp.txid) {
            userProposal.txid = userProp.txid;

            this.setState({
              savedPayValue: userProp.txid
            });
          }

          if (userProp.submitReceipt) {
            userProposal.submitReceipt = userProp.submitReceipt;

            this.setState({
              sValue: userProp.submitReceipt
            });
          }

          this.setState({
            visible: true,
            userProposal
          });
        } else {
          this.firebase.deletePendingProposal(currentUser.uid);
          this.setState({savedProposal: {}});
        }
      })
      .catch(err => {
        swal({
          title: 'Oops...',
          text: `${err}`,
          icon: 'error'
        });
      });
  }

  async getGovernanceDate() {
    const nextGovernanceDate = await nextGovernanceRewardInfo();
    Object.assign(nextGovernanceDate);
    console.log('nextGovernanceDate --->', nextGovernanceDate);
    return nextGovernanceDate;
  }

  //payment quantity

  paymentQuantity(value) {
    const {nextGovernanceDate} = this.state;
    const {endEpoch, proposalPayoutDates} = lastPaymentCalculator(
      value,
      nextGovernanceDate
    );

    this.setState({
      proposalEndEpoch: endEpoch,
      proposalPayoutDates,
      totalAmount: this.state.amount * value,
      paymentQuantity: value
    });
  }

  async submitPaymentId() {
    const {currentUser} = this.props.app;
    if (!currentUser) {
      swal({title: 'Oops', text: 'Must register/login.', icon: 'error'});
      return;
    }

    if (this.state.payValue.length !== 64) {
      this.setState({
        txIdError: 'Invalid proposal TXID'
      });
      return;
    } else {
      this.setState({
        txIdError: ''
      });
    }

    if (this.state.payValue) {
      let submitObj = {...this.state.prepareObj};
      let updatedUserProposal = {...this.state.userProposal};
      if (this.state.payValue) {
        updatedUserProposal.txid = this.state.payValue;
        await this.firebase.setProposal(currentUser.uid, updatedUserProposal);
        submitObj.txid = this.state.payValue;

        this.props
          .submitProposal(submitObj)
          .then(async submitResponse => {
            if (submitResponse) {
              updatedUserProposal.submitReceipt = submitResponse;
              await this.firebase.setProposal(
                currentUser.uid,
                updatedUserProposal
              );

              this.setState({
                sValue: submitResponse,
                userProposal: updatedUserProposal
              });
            }
          })
          .catch(err => {
            swal({title: 'Oops...', text: `${err}`, icon: 'error'});
          });
      }
    } else {
      swal({
        title: 'Oops',
        text: 'No payment id submited',
        icon: 'error'
      });
    }
  }

  async submitHash() {
    const {currentUser} = this.props.app;
    if (!currentUser) {
      swal({title: 'Oops', text: 'Must register/login.', icon: 'error'});
      return;
    }

    if (this.state.hValue.length !== 64) {
      this.setState({
        hashError: 'Invalid proposal hash-object'
      });

      return;
    } else {
      this.setState({
        hashError: ''
      });
    }

    const proposal = await this.firebase.getProposal(currentUser.uid);
    if (proposal) {
      const descriptionID = proposal.descriptionID;

      if (this.state.hValue) {
        let updateProposalDetail = {...this.state.proposalDetail};
        let updatedUserProposal = {...this.state.userProposal};

        updateProposalDetail.hash = this.state.hValue;
        updatedUserProposal.hash = this.state.hValue;

        await this.firebase.setProposalDescription(
          descriptionID,
          updateProposalDetail
        );
        await this.firebase.setProposal(currentUser.uid, updatedUserProposal);

        this.setState({
          visible: false
        });
        swal({
          title: 'Success',
          text: 'Proposal has been created.\n\nPLEASE WAIT FOR 6 BLOCKS',
          icon: 'success'
        });
        this.props.setPage('home');
      } else {
        swal({
          title: 'Oops',
          text: 'No hash submited',
          icon: 'error'
        });
      }
    }
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

  onChange(e) {
    const {currentUser} = this.props.app;
    if (!currentUser) {
      return;
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkErrorManager(dataErr) {
    const dataErrArray = dataErr.replace(/\n/g, '').split(';');
    const errorMessage = dataErrArray[dataErrArray.length - 2];
    switch (errorMessage) {
      case 'Invalid name':
        return {message: errorMessage, step: 0};
      default:
        return {message: errorMessage, step: 2};
    }
  }

  handleReset = step => {
    const {
      savedProposal,
      proposalName,
      proposalTitle,
      proposallink,
      proposalStartEpoch,
      paymentQuantity,
      address,
      amount,
      proposalEndEpoch,
      totalAmount
    } = this.state;

    this.setState({
      visible: false,
      activeStep: step || 0,
      recover: false,
      pCopied: false,
      sCopied: false
    });
    const editorContentBlock = htmlToDraft(this.state.proposalDetail.detail);
    const editorContentState = ContentState.createFromBlockArray(
      editorContentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(editorContentState);
    this.setState({
      proposalName: proposalName || savedProposal.name,
      proposalTitle: proposalTitle || savedProposal.title,
      proposallink: proposallink || savedProposal.url,
      editorState,
      proposalStartEpoch: proposalStartEpoch || savedProposal.first_epoch,
      paymentQuantity: paymentQuantity || savedProposal.nPayment,
      address: address || savedProposal.payment_address,
      amount: amount || savedProposal.payment_amount,
      proposalEndEpoch: proposalEndEpoch || savedProposal.end_epoch,
      totalAmount:
        totalAmount || savedProposal.payment_amount * savedProposal.nPayment
    });
  };

  createPropObj = async () => {
    const {app} = this.props;
    const {currentUser} = app;
    const {
      proposalName,
      proposalTitle,
      address,
      paymentQuantity,
      amount,
      proposal__detail,
      proposallink,
      savedProposal
    } = this.state;

    if (!currentUser) {
      swal({title: 'Oops', text: 'Must register/login.', icon: 'error'});
      return;
    }

    const descriptionID =
      savedProposal.descriptionID ||
      `${currentUser.displayName}${Date.now().toString(36)}`;

    /* this.setState({
      activeStep: this.state.activeStep + 1,
      showEditor: true
    }); */

    const proposalDescription = {detail: proposal__detail, hash: ''};

    this.firebase.setProposalDescription(descriptionID, proposalDescription);

    let userProposal = {
      type: 1,
      name: proposalName,
      title: proposalTitle,
      descriptionID,
      description: '',
      username: currentUser.displayName,
      nPayment: paymentQuantity,
      first_epoch: this.state.proposalStartEpoch,
      start_epoch: Math.floor(new Date().getTime() / 1000),
      end_epoch: this.state.proposalEndEpoch, //Math.floor(new Date(proposalDate).getTime() / 1000),
      payment_address: address,
      payment_amount: Number(amount),
      url: proposallink || this.props.appConstants.EMPTY_FIELD
    };

    this.setState({
      userProposal: userProposal,
      proposalDetail: {
        detail: proposal__detail,
        hash: ''
      }
    });

    let newProposal = [['proposal', userProposal]];

    const hexedProposal = Hex.strToHex(newProposal);
    const dataHex = {
      dataHex: hexedProposal
    };

    const prepareObj = {
      parentHash: '0',
      revision: '1',
      time: Math.floor(new Date().getTime() / 1000),
      dataHex: hexedProposal
    };
    this.setState({
      prepareObj: prepareObj
    });
    userProposal.prepareObj = prepareObj;
    await this.firebase.setProposal(currentUser.uid, {
      ...userProposal,
      detail: proposal__detail,
      state: 'composed'
    });
    this.props
      .checkProposal(dataHex)
      .then(data => {
        if (data['Object status'] === 'OK') {
          return this.props.prepareProposal(prepareObj);
        } else {
          throw this.checkErrorManager(data);
        }
      })
      .then(async prepareResponse => {
        if (prepareResponse) {
          userProposal.prepareReceipt = prepareResponse;
          await this.firebase.setProposal(currentUser.uid, userProposal);

          this.setState({
            visible: true,
            pValue: prepareResponse
          });
        }
      })
      .catch(err => {
        swal({
          title: 'Oops...',
          text: `${err.message}`,
          icon: 'error'
        }).then(value => this.handleReset(err.step));
      });
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
      showEditor: true
    });
  };

  handleBack = () => {
    if (this.state.activeStep === 2) {
      this.setState({showEditor: true});
    }
    this.setState(
      {
        activeStep: this.state.activeStep - 1,
        proposal__detail: this.state.proposal__detail
      },
      () => {
        if (this.state.activeStep === 1 || this.state.activeStep === 0) {
          this.setState({showEditor: true});
        }
      }
    );
  };

  // //date change function
  // onDateChange(value) {
  //   this.setState({
  //     proposalStartEpoch: value,
  //     proposalEndEpoch: value,
  //     paymentQuantity: 1,
  //     totalAmount: this.state.amount
  //   });
  // }

  //proposal title function
  proposalTitle(e) {
    const proposalName = e.target.value
      .trim()
      .toLowerCase()
      .replace(/[^A-Za-z0-9]/g, '');
    this.setState({
      proposalName,
      proposalTitle: e.target.value,
      proposallink: ''
    });
  }

  //get address function
  getAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  //get amount function
  getAmount(value) {
    this.setState({
      totalAmount: this.state.paymentQuantity * value,
      amount: value
    });
  }

  //
  previewHTML() {
    this.setState(
      {
        showEditor: false,
        proposal__detail: draftToHtml(
          convertToRaw(this.state.editorState.getCurrentContent())
        )
      },
      () => {
        let previewContainer = document.getElementById(
          'preview-html-container'
        );
        previewContainer.innerHTML = draftToHtml(
          convertToRaw(this.state.editorState.getCurrentContent())
        );
      }
    );
  }

  confirmProposalDetail() {
    this.previewHTML();
  }

  async urlInputChange(e) {
    const url = e.target.value;
    await this.setState({
      proposallink: url
    });
  }

  // steps name in array in which we map
  getSteps() {
    return [
      'Proposal Title',
      'Proposal Details',
      'Payment Details',
      'Create Proposal'
    ];
  }

  //all the step contents are coming from return of switch case
  getStepContent(step) {
    const {deviceType} = this.props;

    switch (step) {
      case 0:
        return (
          //Proposal Title Row
          <Row className="proposal-title-row">
            {/* Proposal Title Colomn */}
            <Col span={deviceType === 'mobile' ? 24 : 10}>
              {/* proposal title input field */}
              <Form>
                <FormItem
                  className="form-item"
                  validateStatus={
                    this.state.proposalTitle.length <= 40 ? '' : 'error'
                  }
                >
                  <Input
                    className="proposal-title-input"
                    placeholder="proposal-name (40 characters max.)"
                    addonBefore={`${40 - this.state.proposalTitle.length}`}
                    value={this.state.proposalTitle}
                    onChange={this.proposalTitle}
                    maxLength={40}
                  />
                </FormItem>
              </Form>
            </Col>
          </Row>
        );
      case 1:
        return (
          // Proposal Detail Row
          <Row className="proposal-details-row">
            {/* Proposal Detail Colomn */}
            <Col span={deviceType === 'mobile' ? 24 : 20}>
              {this.state.showEditor ? (
                <div>
                  <h2 className="editor-title">Proposal Details</h2>
                  {/* proposal detail editor */}
                  <Editor
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="proposalEditor-wrapper"
                    editorClassName="proposal-editor"
                    toolbar={{
                      options: ['inline', 'list'],
                      inline: {
                        options: ['bold', 'italic', 'underline', 'monospace'],
                        list: {
                          options: ['unordered', 'ordered']
                        }
                      }
                    }}
                  />
                </div>
              ) : (
                // proposal detail preview
                <Row>
                  <Col
                    span={deviceType === 'mobile' ? 24 : 22}
                    offset={deviceType === 'mobile' ? 0 : 1}
                  >
                    <h1 className="proposalDetail-title">
                      {this.state.proposalTitle}
                    </h1>
                  </Col>
                  <Col span={deviceType === 'mobile' ? 24 : 22}>
                    <div
                      className="proposalContent-div"
                      id="preview-html-container"
                    />
                  </Col>
                </Row>
              )}
              <div className="urlInput">
                <Input
                  className="proposal-url-input"
                  placeholder="More Info URL (keep it blank to proposal refers itself)"
                  value={
                    this.state.proposallink !==
                    this.props.appConstants.EMPTY_FIELD
                      ? this.state.proposallink
                      : ''
                  }
                  onChange={this.urlInputChange}
                />
              </div>
            </Col>
          </Row>
        );
      case 2:
        return (
          <Row>
            <Row className="paymentDetail-row">
              <Col span={deviceType === 'mobile' ? 10 : 6}>
                <label># of Payments</label>
                <InputNumber
                  min={1}
                  max={13}
                  defaultValue={3}
                  className="payment-input"
                  value={this.state.paymentQuantity}
                  onChange={this.paymentQuantity}
                  type="number"
                />
              </Col>
              <Col
                span={deviceType === 'mobile' ? 10 : 6}
                offset={deviceType === 'mobile' ? 4 : 0}
              >
                <label>Amount</label>
                <InputNumber
                  min={0}
                  className="amount-input"
                  value={this.state.amount}
                  onChange={this.getAmount}
                />
                {` SYS`}
              </Col>
              <Col span={deviceType === 'mobile' ? 24 : 8}>
                <label>Payment Address</label>
                <Input
                  type="text"
                  placeholder="sys1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={this.state.address}
                  onChange={this.getAddress}
                />
              </Col>
            </Row>
            <Row className="amount-row">
              <Row>
                <Col span={deviceType === 'mobile' ? 24 : 24}>
                  <p/>
                  <h3>Payment Info:</h3>
                  <div className="paymentInfo_Wrapper">
                    <p className="">
                      {`This proposal will result in ${
                        this.state.paymentQuantity
                      } payments of ${this.state.amount} sys`}
                    </p>
                    <div className="">
                      <div className="">{`  Payout dates approximately:`}</div>
                      <div className="paymentInfo_payoutDates">
                        {this.state.proposalPayoutDates.map((epoch, index) => {
                          return (
                            <div key={index}>
                              {yearDayMonth(epoch * 1000, 'usa')}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <p/>
                    <p className="">
                      {`Total amount: ${this.state.totalAmount ||
                      this.state.amount} SYS`}
                    </p>
                  </div>
                </Col>
              </Row>
            </Row>
          </Row>
        );
      default:
        return null;
    }
  }

  onEditorStateChange(editorState) {
    this.setState({
      showEditor: true
    });
    this.setState({
      proposal__detail: draftToHtml(
        convertToRaw(this.state.editorState.getCurrentContent())
      ),
      editorState
    });
  }

  disabledNextBtn(step) {
    switch (step) {
      case 0:
        if (this.state.proposalTitle) {
          return false;
        } else {
          return true;
        }
      case 1:
        if (this.state.proposal__detail) {
          return false;
        } else {
          return true;
        }
      case 2:
        if (
          this.state.proposalStartEpoch &&
          this.state.paymentQuantity &&
          this.state.address &&
          this.state.amount
        ) {
          return false;
        } else {
          return true;
        }
      default:
        return false;
    }
  }

  render() {
    const {classes, deviceType} = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const modalStyle =
      deviceType === 'mobile' ? classes.mobileModal : classes.modal;

    const steps = this.getSteps();
    const {activeStep} = this.state;

    return (
      <div>
        {/* Receipt Modal */}
        <Modal
          title="Proposal"
          style={{top: 20}}
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          footer={null}
          className={modalStyle}
          zIndex={99999}
        >
          <div>
            <TextArea
              rows={this.state.pCopied ? 4 : 5}
              readOnly
              value={this.state.pValue}
            />
            {this.state.pCopied ? (
              <div style={{textAlign: 'right'}}>
                <span style={{color: 'red', padding: '0px 8px'}}>
                  Copied.
                </span>
              </div>
            ) : null}
            <div className="receipt-text">
              {this.state.pValue
                ? 'Prepare command is ready to be copied. Please copy and paste it into Syscoin Q.T console for payment txid.'
                : 'No Prepare command has been generated.'}
              <CopyToClipboard
                text={this.state.pValue}
                onCopy={() => this.setState({pCopied: true})}
              >
                <Button
                  type="primary"
                  disabled={this.state.sValue || !this.state.pValue}
                >
                  Copy
                </Button>
              </CopyToClipboard>
            </div>
            <div className="id-input">
              <span> Enter Prepare TXID Here: </span>
              <Input
                value={this.state.payValue}
                disabled={this.state.sValue ? true : false}
                onChange={e => this.onChange(e)}
                name="payValue"
              />
              <div style={{textAlign: 'right'}}>
                <span style={{color: 'red', padding: '0px 8px'}}>
                  {this.state.txIdError}
                </span>
              </div>
              <br/>
            </div>
            <div className="submit-btn">
              <Button
                type="primary"
                disabled={this.state.sValue}
                onClick={() => this.handleReset()}
              >
                <Icon type="left"/>
                {`Back & Edit`}
              </Button>
              <Button
                type="primary"
                disabled={this.state.sValue || !this.state.pValue}
                onClick={this.submitPaymentId}
              >
                Submit TXID
              </Button>
            </div>
          </div>
          <br/>
          <hr/>
          <br/>
          <TextArea
            rows={this.state.sCopied ? 4 : 5}
            readOnly
            value={this.state.sValue}
          />
          {this.state.sCopied ? (
            <div style={{textAlign: 'right'}}>
              <span style={{color: 'red', padding: '0px 8px'}}>Copied.</span>
            </div>
          ) : null}
          <div className="receipt-text">
            {this.state.sValue
              ? 'Submit command is ready to be copied. Please copy and paste it into Syscoin Q.T console to submit your proposal. This could take a couple minutes, please be patient.'
              : 'No Submit command has been generated.'}
            <CopyToClipboard
              text={this.state.sValue}
              onCopy={() => this.setState({sCopied: true})}
            >
              <Button type="primary" disabled={!this.state.sValue}>
                Copy
              </Button>
            </CopyToClipboard>
          </div>
          <br/>
          <div className="id-input">
            <span>Enter Proposal Hash Here: </span>
            <Input
              value={this.state.hValue}
              disabled={!this.state.sValue}
              onChange={e => this.onChange(e)}
              name="hValue"
            />
            <div style={{textAlign: 'right'}}>
              <span style={{color: 'red', padding: '0px 8px'}}>
                {this.state.hashError}
              </span>
            </div>
            <br/>
          </div>
          <div className="submit-btn">
            <Button
              type="primary"
              disabled={!this.state.sValue}
              onClick={this.submitHash}
            >
              Submit
            </Button>
          </div>
        </Modal>
        <div className={style}>
          <h1 className="title">Proposal Configuration</h1>
          <Paper className="paper-container" elevation={4}>
            {this.state.recover === true ? (
              <div>Recovery in process</div>
            ) : (
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                className="steper__container"
              >
                {steps.map((label, index) => {
                  return (
                    <Step className="steper__wrapper" key={label}>
                      <StepLabel className="steper__label">
                        <h2 className="step-label"> {label} </h2>
                        {this.state.activeStep === 1 &&
                        label === 'Proposal Details' ? (
                          this.state.showEditor ? (
                            <Button
                              className="preview-edit-button"
                              onClick={this.previewHTML.bind(this)}
                            >
                              PREVIEW
                            </Button>
                          ) : (
                            <Button
                              className="preview-edit-button"
                              onClick={() => {
                                this.setState({showEditor: true});
                              }}
                            >
                              EDITOR
                            </Button>
                          )
                        ) : null}
                      </StepLabel>
                      <StepContent>
                        {this.getStepContent(activeStep)}
                        <div className={classes.actionsContainer}>
                          <div
                            className={
                              activeStep === steps.length - 1
                                ? 'confirm-btn-div'
                                : 'next-btn-div'
                            }
                          >
                            {activeStep === 0 ? null : (
                              <Button
                                variant="raised"
                                type="primary"
                                onClick={this.handleBack}
                                className="button"
                              >
                                Back
                              </Button>
                            )}
                            {activeStep === steps.length - 1 ? (
                              <Button
                                variant="raised"
                                type="primary"
                                className={classes.button}
                                onClick={this.createPropObj}
                                disabled={this.disabledNextBtn(index)}
                              >
                                Confirm
                              </Button>
                            ) : (
                              <Button
                                variant="raised"
                                type="primary"
                                onClick={this.handleNext}
                                className={classes.button}
                                disabled={this.disabledNextBtn(index)}
                              >
                                Next Step
                              </Button>
                            )}
                          </div>
                        </div>
                      </StepContent>
                    </Step>
                  );
                })}
              </Stepper>
            )}
          </Paper>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    proposal: state.proposals,
    app: state.app,
    appConstants: state.app.globalConst
  };
};

const dispatchToProps = dispatch => {
  return {
    checkProposal: params => dispatch(actions.checkProposal(params)),
    prepareProposal: params => dispatch(actions.prepareProposal(params)),
    submitProposal: params => dispatch(actions.submitProposal(params)),
    setPage: page => dispatch(actions.setPage(page))
  };
};

export default compose(
  withFirebase,
  connect(
    stateToProps,
    dispatchToProps
  ),
  injectSheet(newProposalStyle)
)(NewProposal);
