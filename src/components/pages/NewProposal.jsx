import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { withStyles } from 'material-ui';
import newProposalStyle from './styles/newProposalStyle';
//import for text editor
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import components
import { Editor } from 'react-draft-wysiwyg';
import swal from 'sweetalert';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Row, Col } from 'antd';
import { Form, Input, Button, InputNumber, Modal } from 'antd';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import { DatePicker } from 'antd';
import { Hex } from '../../redux/helpers';
import { fire } from '../../API/firebase';
import { CopyToClipboard } from 'react-copy-to-clipboard';

//import style

const FormItem = Form.Item;

class NewProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      showEditor: true,
      proposalTitle: '',
      proposalName: '',
      paymentQuantity: 1,
      proposalDate: '',
      address: '',
      amount: '',
      recover: false,
      stepperSubHeading: '',
      proposallink: 'http://syshub.com/p/',
      editorState: EditorState.createEmpty(),
      proposal__detail: '',
      savedProposal: null,
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
      userProposal: {}
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

  submitPaymentId() {
    const { currentUser } = this.props.app;
    if (!currentUser) {
      swal({ title: 'Oops', text: 'Must register/login.', icon: 'error' });
      return;
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
    const proposalRef = fire.database().ref('proposals/' + currentUser.uid);

    if (this.state.hValue) {
      let updatedUserProposal = { ...this.state.userProposal };
      updatedUserProposal.hash = this.state.hValue;
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

  componentDidMount() {
    const currentUser = fire.auth().currentUser;
    if (!currentUser) {
      return;
    }
    const proposalRef = fire.database().ref('proposals/' + currentUser.uid);

    proposalRef.once('value', snapshot => {
      const userProp = snapshot.val();

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
                prepareObj: userProp.prepareObj
              });

              let userProposal = {
                name: userProp.name,
                description: userProp.description,
                username: userProp.username,
                type: 1,
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
            }
          })
          .catch(err => {
            swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
          });
      }
    });
  }

  createPropObj = () => {
    const { app } = this.props;
    const { currentUser } = app;
    const {
      proposalName,
      proposalTitle,
      address,
      amount,
      proposal__detail,
      proposallink,
      proposalDate
    } = this.state;

    if (!currentUser) {
      swal({ title: 'Oops', text: 'Must register/login.', icon: 'error' });
      return;
    }

    this.setState({
      activeStep: this.state.activeStep + 1,
      showEditor: true
    });

    const proposalRef = fire.database().ref('proposals/' + currentUser.uid);

    let userProposal = {
      name: proposalTitle.split(' ').join('_'),
      description: proposal__detail,
      username: currentUser.displayName,
      type: 1,
      start_epoch: Math.floor(new Date().getTime() / 1000),
      end_epoch: Math.floor(new Date(proposalDate).getTime() / 1000),
      payment_address: address,
      payment_amount: Number(amount),
      url: proposallink
    };

    this.setState({
      userProposal: userProposal
    });

    proposalRef.set(userProposal);

    let newProposal = [
      [
        'proposal',
        {
          name: proposalName,
          title: proposalTitle,
          description: proposal__detail,
          type: 1,
          start_epoch: Math.floor(new Date().getTime() / 1000),
          end_epoch: Math.floor(new Date(proposalDate).getTime() / 1000),
          payment_address: address,
          payment_amount: Number(amount),
          url: proposallink
        }
      ]
    ];

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

    userProposal.prepareObj = prepareObj;
    proposalRef.set(userProposal);

    this.props
      .checkProposal(dataHex)
      .then(data => {
        if (data['Object status'] === 'OK') {
          return this.props.prepareProposal(prepareObj);
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
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
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

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  //date change function
  onDateChange(date, dateString) {
    this.setState({
      proposalDate: dateString
    });
  }

  //proposal title function
  proposalTitle(e) {
    const proposalName = e.target.value.trim().replace(/[^A-Za-z0-9]/g, '');
    this.setState({
      proposalName,
      proposalTitle: e.target.value,
      proposallink: `http://syshub.com/p/${proposalName}`
    });
  }

  //payment quantity
  paymentQuantity(value) {
    this.setState({
      paymentQuantity: value
    });
  }

  //get address function
  getAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  //get amount function
  getAmount(e) {
    this.setState({
      amount: e.target.value
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
    return ['Proposal Title', 'Proposal Details', 'Payment Details', 'Amount', 'Create Proposal'];
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
                <FormItem className="form-item">
                  <Input
                    className="proposal-title-input"
                    placeholder="Insert Reference Title"
                    value={this.state.proposalTitle}
                    onChange={this.proposalTitle}
                  />
                </FormItem>
              </Form>
            </Col>
            {/* Proposal Description Url Colomn */}
            <Col span={deviceType === 'mobile' ? 24 : 14}>
              {deviceType === 'mobile' ? (
                <h3 className="proposal-title">Proposal Description Url</h3>
              ) : null}
              <Input
                className="proposal-url-input"
                placeholder="Enter Proposal Description Url"
                value={`${this.state.proposallink}${
                  this.state.proposalTitle ? '' : 'proposal-title'
                }`}
              />
            </Col>
          </Row>
        );
      case 1:
        return (
          // Proposal Detail Row
          <Row className="proposal-details-row">
            {/* Proposal Detail Colomn */}
            <Col span={deviceType === 'mobile' ? 24 : 20}>
              {/* {this.state.showEditor ?

                <Button className='preview-edit-button' onClick={this.previewHTML.bind(this)}>PREVIEW</Button>
                :
                <Button className='preview-edit-button' onClick={() => { this.setState({ showEditor: true }) }}>EDITOR</Button>

              } */}
              {this.state.showEditor ? (
                <div>
                  <h2 className="editor-title">Write proposal details</h2>
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
          <Row className="paymentDetail-row">
            <Col span={deviceType === 'mobile' ? 10 : 9}>
              <label className="label">Date</label>
              <DatePicker onChange={this.onDateChange} />
            </Col>
            <Col span={deviceType === 'mobile' ? 10 : 7} offset={deviceType === 'mobile' ? 4 : 0}>
              <label># of Payments</label>
              <InputNumber
                min={1}
                max={50}
                defaultValue={3}
                className="payment-input"
                value={this.state.paymentQuantity}
                onChange={this.paymentQuantity}
                type="number"
              />
            </Col>
            <Col span={deviceType === 'mobile' ? 24 : 8}>
              <label>Address</label>
              <Input
                type="text"
                placeholder="input addresss"
                value={this.state.address}
                onChange={this.getAddress}
              />
            </Col>
          </Row>
        );
      case 3:
        return (
          <Row className="amount-row">
            <Col span={deviceType === 'mobile' ? 18 : 4}>
              <Input
                type="text"
                placeholder="0"
                value={this.state.amount}
                onChange={this.getAmount}
              />
            </Col>
            <div
              style={{
                display: 'inline-block',
                padding: '5px',
                fontWeight: 'bold'
              }}
            >
              SYS
            </div>
          </Row>
        );
      default:
        return <Button>Confirm</Button>;
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
        if (this.state.proposalDate && this.state.paymentQuantity && this.state.address) {
          return false;
        } else {
          return true;
        }
      case 3:
        if (this.state.amount) {
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

    const steps = this.getSteps();
    const { activeStep } = this.state;
    return (
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
                      {this.state.activeStep === 0 &&
                      label === 'Proposal Title' &&
                      deviceType !== 'mobile' ? (
                        <h3 className="proposal-title">Proposal Description Url</h3>
                      ) : null}
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
                      <div>{this.getStepContent(index)}</div>
                      <div className={classes.actionsContainer}>
                        <div
                          className={
                            activeStep === steps.length - 1 ? 'confirm-btn-div' : 'next-btn-div'
                          }
                        >
                          {activeStep === 0 ? null : (
                            <Button
                              raised={true}
                              type="primary"
                              onClick={this.handleBack}
                              className="button"
                            >
                              Back
                            </Button>
                          )}
                          {activeStep === steps.length - 1 ? (
                            <Button
                              raised={true}
                              type="primary"
                              className={classes.button}
                              onClick={this.createPropObj}
                              disabled={this.disabledNextBtn(index)}
                            >
                              Confirm
                            </Button>
                          ) : (
                            <Button
                              raised={true}
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
        <Modal
          title="Proposal"
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          footer={null}
        >
          <div>
            {this.state.pValue
              ? 'Prepare Receipt ready to be copied. Please copy and paste into wallet terminal for payment id.'
              : 'No Prepare Receipt has been received.'}
          </div>
          <CopyToClipboard text={this.state.pValue} onCopy={() => this.setState({ pCopied: true })}>
            <button>Copy</button>
          </CopyToClipboard>
          {this.state.pCopied ? <span style={{ color: 'red' }}>Copied.</span> : null}
          <br />
          <br />
          {this.state.savedPayValue ? (
            <div>
              Looks like you already have a payment id, go ahead and copy it and paste it below.
              <CopyToClipboard
                text={this.state.savedPayValue}
                onCopy={() => this.setState({ payCopied: true })}
              >
                <button>Copy</button>
              </CopyToClipboard>
              {this.state.payCopied ? <span style={{ color: 'red' }}>Copied.</span> : null}
            </div>
          ) : null}
          Input Payment Id Here:
          <input value={this.state.payValue} onChange={this.onChange} name="payValue" />
          <br />
          <br />
          <Button type="primary" onClick={this.submitPaymentId}>
            Submit Payment Id
          </Button>
          <br />
          <hr />
          <br />
          <div>
            {this.state.sValue
              ? 'Submit Receipt ready to be copied. Please copy and paste into wallet terminal for hash. This could take a couple minutes, please be patient.'
              : 'No Prepare Receipt has been received.'}
          </div>
          <CopyToClipboard text={this.state.sValue} onCopy={() => this.setState({ sCopied: true })}>
            <button>Copy</button>
          </CopyToClipboard>
          {this.state.sCopied ? <span style={{ color: 'red' }}>Copied.</span> : null}
          <br />
          <br />
          Input Hash here:
          <input value={this.state.hValue} onChange={this.onChange} name="hValue" />
          <br />
          <br />
          <Button type="primary" onClick={this.submitHash}>
            Submit Hash
          </Button>
        </Modal>
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
