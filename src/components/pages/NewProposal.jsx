import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { withStyles } from 'material-ui';
//import for text editor
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import components
import { Editor } from 'react-draft-wysiwyg';
import swal from 'sweetalert';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Row, Col, Icon } from 'antd';
import { Form, Input, Button, InputNumber, Select, Modal } from 'antd';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import { Hex } from '../../redux/helpers';
import { fire } from '../../API/firebase';
import { CopyToClipboard } from 'react-copy-to-clipboard';

//import style
import newProposalStyle from './styles/newProposalStyle';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class NewProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      showEditor: true,
      proposalTitle: '',
      proposalName: '',
      paymentQuantity: 1,
      paymentDateOptions: [],
      proposalDetail: '',
      proposalStartEpoch: 0,
      proposalEndEpoch: 0,
      address: '',
      amount: 0,
      totalAmount: 0,
      recover: false,
      stepperSubHeading: '',
      proposallink: 'http://syshub.com/p/',
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
    };

    this.getStepContent = this.getStepContent.bind(this);
    this.getSteps = this.getSteps.bind(this);
    this.proposalTitle = this.proposalTitle.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.paymentQuantity = this.paymentQuantity.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getAmount = this.getAmount.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.disabledNextBtn = this.disabledNextBtn.bind(this);
    this.createPropObj = this.createPropObj.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitPaymentId = this.submitPaymentId.bind(this);
    this.submitHash = this.submitHash.bind(this);
  }

  componentWillMount() {
    const maxDateOptions = 26;
    const { firstPaymentDate, millsMonth } = this.props.proposal;
    const today = new Date().getTime();
    const monthGap = Math.ceil((today - firstPaymentDate) / millsMonth);
    const firstOption = firstPaymentDate + monthGap * millsMonth;
    let paymentDateOptions = [];
    for (let i = 0; i < maxDateOptions; i++) {
      let mills = firstOption + i * millsMonth;
      paymentDateOptions.push({ mills, ymd: this.yearDayMonth(mills, 'usa') });
    }
    this.setState({ paymentDateOptions });
  }

  componentDidMount() {
    const currentUser = fire.auth().currentUser;
    if (!currentUser) {
      return;
    }
    const proposalRef = fire.database().ref('proposals/' + currentUser.uid);

    proposalRef.once('value').then(snapshot => {
      const userProp = snapshot.val();
      if (!userProp) {
        return;
      }
      const descriptionID = userProp.descriptionID;
      const descriptionRef = fire.database().ref('ProposalsDescriptions/' + descriptionID);

      descriptionRef.once('value').then(detailObj => {
        const proposalDetail = detailObj.val();

        if (userProp) {
          if (userProp.hash) {
            proposalRef.remove();
            return;
          }

          this.setState({
            savedProposal: userProp
          });

          swal({
            title: 'Recovery',
            text:
              'It seems you have some information saved in our db, would you like to recover the data?',
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
                this.setState({ savedProposal: {} });
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
      });
    });
  }

  yearDayMonth(dateInMills, format) {
    const firstDay = `0${new Date(dateInMills).getDate()}`.slice(-2);
    const firstMonth = `0${parseInt(new Date(dateInMills).getMonth(), 10) + 1}`.slice(-2);
    const firstYear = new Date(dateInMills).getFullYear();

    switch (format) {
      case 'usa':
        return `${firstMonth}/${firstDay}/${firstYear}`;
      case 'eu':
        return `${firstDay}/${firstMonth}/${firstYear}`;
      default:
        return `${firstYear}-${firstMonth}-${firstDay}`;
    }
  }

  //payment quantity
  paymentQuantity(value) {
    const millsMonth = this.props.proposal.millsMonth;
    const proposalEndEpoch = this.state.proposalStartEpoch + millsMonth / 1000 * (value - 1);
    this.setState({
      proposalEndEpoch,
      totalAmount: this.state.amount * value,
      paymentQuantity: value
    });
  }

  submitPaymentId() {
    const { currentUser } = this.props.app;
    if (!currentUser) {
      swal({ title: 'Oops', text: 'Must register/login.', icon: 'error' });
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

    const proposalRef = fire.database().ref('proposals/' + currentUser.uid);

    if (this.state.payValue) {
      let submitObj = { ...this.state.prepareObj };
      let updatedUserProposal = { ...this.state.userProposal };
      if (this.state.payValue) {
        updatedUserProposal.txid = this.state.payValue;
        proposalRef.set(updatedUserProposal);
        submitObj.txid = this.state.payValue;

        this.props
          .submitProposal(submitObj)
          .then(submitResponse => {
            if (submitResponse) {
              updatedUserProposal.submitReceipt = submitResponse;
              proposalRef.set(updatedUserProposal);

              this.setState({
                sValue: submitResponse,
                userProposal: updatedUserProposal
              });
            }
          })
          .catch(err => {
            swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
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

  submitHash() {
    const { currentUser } = this.props.app;
    if (!currentUser) {
      swal({ title: 'Oops', text: 'Must register/login.', icon: 'error' });
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

    const proposalRef = fire.database().ref('proposals/' + currentUser.uid);

    proposalRef.once('value').then(snapshot => {
      const descriptionID = snapshot.val().descriptionID;
      const descriptionRef = fire.database().ref('ProposalsDescriptions/' + descriptionID);

      if (this.state.hValue) {
        let updateProposalDetail = { ...this.state.proposalDetail };
        let updatedUserProposal = { ...this.state.userProposal };

        updateProposalDetail.hash = this.state.hValue;
        updatedUserProposal.hash = this.state.hValue;

        descriptionRef.set(updateProposalDetail);
        proposalRef.set(updatedUserProposal);

        this.setState({
          visible: false
        });
        swal({
          title: 'Success',
          text: 'Proposal has been created.',
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

  onChange(e) {
    const currentUser = fire.auth().currentUser;
    if (!currentUser) {
      return;
    }
    const proposalRef = fire.database().ref('proposals/' + currentUser.uid);
    let updated = { ...this.state.userProposal };

    if (e.target.name === 'payValue') {
      updated.txid = e.target.value;
      proposalRef.set(updated);
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
        return { message: errorMessage, step: 0 };
      default:
        return { message: errorMessage, step: 2 };
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
    const editorContentState = ContentState.createFromBlockArray(editorContentBlock.contentBlocks);
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
      totalAmount: totalAmount || savedProposal.payment_amount * savedProposal.nPayment
    });
  };

  createPropObj = () => {
    const { app } = this.props;
    const { currentUser } = app;
    const {
      //paymentQuantity,
      proposalName,
      proposalTitle,
      address,
      paymentQuantity,
      amount,
      proposal__detail,
      proposallink,
      savedProposal
    } = this.state;

    const descriptionID =
      savedProposal.descriptionID || `${currentUser.displayName}${Date.now().toString(36)}`;

    if (!currentUser) {
      swal({ title: 'Oops', text: 'Must register/login.', icon: 'error' });
      return;
    }

    /* this.setState({
      activeStep: this.state.activeStep + 1,
      showEditor: true
    }); */

    const proposalRef = fire.database().ref('proposals/' + currentUser.uid);
    const descriptionRef = fire.database().ref('ProposalsDescriptions/' + descriptionID);

    descriptionRef.set({ detail: proposal__detail, hash: '' });

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
      url: proposallink
    };

    this.setState({
      userProposal: userProposal,
      proposalDetail: {
        detail: proposal__detail,
        hash: ''
      }
    });

    proposalRef.set(userProposal);

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
    proposalRef.set(userProposal);

    this.props
      .checkProposal(dataHex)
      .then(data => {
        if (data['Object status'] === 'OK') {
          return this.props.prepareProposal(prepareObj);
        } else {
          throw this.checkErrorManager(data);
        }
      })
      .then(prepareResponse => {
        if (prepareResponse) {
          userProposal.prepareReceipt = prepareResponse;
          proposalRef.set(userProposal);

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
      this.setState({ showEditor: true });
    }
    this.setState(
      {
        activeStep: this.state.activeStep - 1,
        proposal__detail: this.state.proposal__detail
      },
      () => {
        if (this.state.activeStep === 1 || this.state.activeStep === 0) {
          this.setState({ showEditor: true });
        }
      }
    );
  };

  //date change function
  onDateChange(value) {
    this.setState({
      proposalStartEpoch: value,
      proposalEndEpoch: value,
      paymentQuantity: 1,
      totalAmount: this.state.amount
    });
  }

  //proposal title function
  proposalTitle(e) {
    const proposalName = e.target.value
      .trim()
      .toLowerCase()
      .replace(/[^A-Za-z0-9]/g, '');
    this.setState({
      proposalName,
      proposalTitle: e.target.value,
      proposallink: `http://syshub.com/p/${proposalName}`
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
        proposal__detail: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
      },
      () => {
        let previewContainer = document.getElementById('preview-html-container');
        previewContainer.innerHTML = draftToHtml(
          convertToRaw(this.state.editorState.getCurrentContent())
        );
      }
    );
  }

  confirmProposalDetail() {
    this.previewHTML();
  }

  // steps name in array in which we map
  getSteps() {
    return ['Proposal Title', 'Proposal Details', 'Payment Details', 'Create Proposal'];
  }
  //all the step contents are coming from return of switch case
  getStepContent(step) {
    const { deviceType } = this.props;

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
                  validateStatus={this.state.proposalTitle.length <= 40 ? '' : 'error'}
                >
                  <Input
                    className="proposal-title-input"
                    placeholder="proposal-name (40 characters max.)"
                    addonBefore={`${40 - this.state.proposalTitle.length}`}
                    value={this.state.proposalTitle}
                    onChange={this.proposalTitle}
                    maxLength={`${40}`}
                  />
                </FormItem>
              </Form>
            </Col>

            {/*************************************************/}
            {/* Commented intentionally don't remove this part*/}
            {/*************************************************/}

            {/* Proposal Description Url Colomn */}
            {/* <Col span={deviceType === 'mobile' ? 24 : 14}>
              {deviceType === 'mobile' ? (
                <h3 className="proposal-title">Proposal Description Url</h3>
              ) : null}
              <Input
                className="proposal-url-input"
                placeholder="Enter Proposal Description Url"
                value={`${this.state.proposallink}${
                  this.state.proposalTitle ? '' : 'proposal-title'
                  }`}
                onChange={() => { }}
              />
            </Col> */}

            {/*************************************************/}
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
                  <Button
                    className="confirm-button"
                    onClick={this.confirmProposalDetail.bind(this)}
                    style={
                      this.state.editorState && this.state.editorState.getCurrentContent().hasText()
                        ? { backgroundColor: '#1991CC' }
                        : { backgroundColor: '#BDC3C7' }
                    }
                  >
                    Confirm
                  </Button>
                </div>
              ) : (
                  // proposal detail preview
                  <Row>
                    <Col
                      span={deviceType === 'mobile' ? 24 : 22}
                      offset={deviceType === 'mobile' ? 0 : 1}
                    >
                      <h1 className="proposalDetail-title">{this.state.proposalTitle}</h1>
                    </Col>
                    <Col span={deviceType === 'mobile' ? 24 : 22}>
                      <div className="proposalContent-div" id="preview-html-container" />
                    </Col>
                  </Row>
                )}
            </Col>
          </Row>
        );
      case 2:
        return (
          <Row>
            <Row className="paymentDetail-row">
              <Col span={deviceType === 'mobile' ? 10 : 9}>
                <label className="label">Payment Date</label>
                <Select
                  placeholder="Select a Date"
                  style={{ width: 120 }}
                  onChange={value => this.onDateChange(value)}
                  defaultValue={this.state.proposalStartEpoch}
                >
                  {this.state.paymentDateOptions.map((item, i) => (
                    <Option key={`ACZ_${i}`} value={item.mills / 1000}>{item.ymd}</Option>
                  ))}
                </Select>
              </Col>
              <Col span={deviceType === 'mobile' ? 10 : 7} offset={deviceType === 'mobile' ? 4 : 0}>
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
              <Col span={deviceType === 'mobile' ? 24 : 8}>
                <label>Payment Address</label>
                <Input
                  type="text"
                  placeholder="TAhk13PnY9f6Kw3K8f797G8rD4QBtb5f1B"
                  value={this.state.address}
                  onChange={this.getAddress}
                />
              </Col>
            </Row>
            <Row className="amount-row">
              <Col span={deviceType === 'mobile' ? 24 : 24}>
                <label>Amount</label>
                <Row>
                  <InputNumber
                    min={0}
                    className="amount-input"
                    value={this.state.amount}
                    onChange={this.getAmount}
                  />
                  {` SYS`}
                </Row>
                <Row>
                  <p />
                  <p>
                    <strong>Total amount:&nbsp;</strong>
                    {`${this.state.totalAmount || this.state.amount} SYS ${
                      this.state.proposalStartEpoch
                        ? `with a final payment on ${this.yearDayMonth(
                          this.state.proposalEndEpoch * 1000,
                          'usa'
                        )}`
                        : ''
                      }`}
                  </p>
                </Row>
              </Col>
            </Row>
          </Row>
        );
      default:
        return null;
    }
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState
    });
  }

  disabledNextBtn(step) {
    switch (step) {
      case 0:
        if (this.state.proposalTitle && this.state.proposallink) {
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
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const modalStyle = deviceType === 'mobile' ? classes.mobileModal : classes.modal;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    return (
      <div>
        {/* Receipt Modal */}
        <Modal
          title="Proposal"
          style={{ top: 20 }}
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          footer={null}
          className={modalStyle}
          zIndex={99999}
        >
          <div>
            <TextArea rows={this.state.pCopied ? 4 : 5} readOnly value={this.state.pValue} />
            {this.state.pCopied ? (
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: 'red', padding: '0px 8px' }}>Copied.</span>
              </div>
            ) : null}
            <div className="receipt-text">
              {this.state.pValue
                ? 'Prepare command is ready to be copied. Please copy and paste it into Syscoin Q.T console for payment txid.'
                : 'No Prepare command has been generated.'}
              <CopyToClipboard
                text={this.state.pValue}
                onCopy={() => this.setState({ pCopied: true })}
              >
                <Button type="primary" disabled={this.state.sValue}>
                  Copy
                </Button>
              </CopyToClipboard>
            </div>
            <div className="id-input">
              <span> Enter Prepare TXID Here: </span>
              <Input
                value={this.state.payValue}
                disabled={this.state.sValue ? true : false}
                onChange={this.onChange}
                name="payValue"
              />
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: 'red', padding: '0px 8px' }}>{this.state.txIdError}</span>
              </div>
              <br />
            </div>
            <div className="submit-btn">
              <Button
                type="primary"
                disabled={this.state.sValue}
                onClick={() => this.handleReset()}
              >
                <Icon type="left" />
                {`Back & Edit`}
              </Button>
              <Button type="primary" disabled={this.state.sValue} onClick={this.submitPaymentId}>
                Submit TXID
              </Button>
            </div>
            {/* {this.state.sValue ? (
            <div className="id-copied">
              Looks like you already have a payment id, go ahead and copy it and paste it below.
              <CopyToClipboard
                text={this.state.sValue}
                onCopy={() => this.setState({ payCopied: true })}
              >
                <Button type="primary" disabled={this.state.sValue} >Copy</Button>
              </CopyToClipboard>
              {this.state.payCopied ? <span style={{ color: 'red', padding: '0px 8px' }}>Copied.</span> : null}
            </div>
          ) : null}*/}
          </div>
          <br />
          <hr />
          <br />
          <TextArea rows={this.state.sCopied ? 4 : 5} readOnly value={this.state.sValue} />
          {this.state.sCopied ? (
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: 'red', padding: '0px 8px' }}>Copied.</span>
            </div>
          ) : null}
          <div className="receipt-text">
            {this.state.sValue
              ? 'Submit command is ready to be copied. Please copy and paste it into Syscoin Q.T console to submit your proposal. This could take a couple minutes, please be patient.'
              : 'No Submit command has been generated.'}
            <CopyToClipboard
              text={this.state.sValue}
              onCopy={() => this.setState({ sCopied: true })}
            >
              <Button type="primary" disabled={!this.state.sValue}>
                Copy
              </Button>
            </CopyToClipboard>
          </div>
          <br />
          <div className="id-input">
            <span>Enter Proposal Hash Here: </span>
            <Input
              value={this.state.hValue}
              disabled={!this.state.sValue}
              onChange={this.onChange}
              name="hValue"
            />
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: 'red', padding: '0px 8px' }}>{this.state.hashError}</span>
            </div>
            <br />
          </div>
          <div className="submit-btn">
            <Button type="primary" disabled={!this.state.sValue} onClick={this.submitHash}>
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
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((label, index) => {
                    return (
                      <Step className="steper__container" key={label}>
                        <StepLabel className="steper__label">
                          <h2 className="step-label"> {label} </h2>

                          {/*************************************************/}
                          {/* Commented intentionally don't remove this part*/}
                          {/*************************************************/}

                          {/*this.state.activeStep === 0 &&
                            label === 'Proposal Title' &&
                            deviceType !== 'mobile' ? (
                              <h3 className="proposal-title">Proposal Description Url</h3>
                            ) : null*/}

                          {/*************************************************/}

                          {this.state.activeStep === 1 && label === 'Proposal Details' ? (
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
                                    this.setState({ showEditor: true });
                                  }}
                                >
                                  EDITOR
                            </Button>
                              )
                          ) : null}
                        </StepLabel>
                        <StepContent>
                          <div style={{ width: '100%' }}>{this.getStepContent(activeStep)}</div>
                          <div className={classes.actionsContainer}>
                            <div
                              className={
                                activeStep === steps.length - 1 ? 'confirm-btn-div' : 'next-btn-div'
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
    app: state.app
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

export default connect(stateToProps, dispatchToProps)(withStyles(newProposalStyle)(NewProposal));
