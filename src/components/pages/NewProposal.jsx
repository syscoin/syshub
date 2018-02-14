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
import { Form, Input, Button, InputNumber } from 'antd';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import { DatePicker } from 'antd';
import { Hex } from '../../redux/helpers';
import { fire } from '../../API/firebase';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

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
      savedProposal: null
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
                recover: value
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

              const newUserProposal = [
                [
                  'proposal',
                  {
                    name: userProp.name,
                    description: userProp.description,
                    type: 1,
                    start_epoch: userProp.start_epoch,
                    end_epoch: userProp.end_epoch,
                    payment_address: userProp.payment_address,
                    payment_amount: userProp.payment_amount,
                    url: userProp.url
                  }
                ]
              ];

              const hexedUserProposal = Hex.strToHex(newUserProposal);

              if (userProp.submitReceipt) {
                swal({
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                  title: 'Success',
                  text: `"${
                    userProp.submitReceipt
                  }" \n \n Please copy and paste this code into your wallet terminal in order to obtain a proposal hash, once you have done that please paste the proposal hash into the input. This could take a couple of minutes please be patient.`,
                  icon: 'success',
                  buttons: true,
                  dangerMode: false,
                  content: {
                    element: 'input',
                    attributes: {
                      placeholder: 'Input proposal hash here',
                      type: 'text'
                    }
                  }
                })
                  .then(userProposalHash => {
                    if (userProposalHash) {
                      userProposal.hash = userProposalHash;
                      proposalRef.set(userProposal);

                      swal({
                        title: 'Success',
                        text: 'Proposal has been created.',
                        icon: 'success'
                      });
                    }
                  })
                  .catch(err => {
                    alert(err);
                  });

                return;
              }

              if (userProp.txid) {
                const userProposalObj = {
                  parentHash: '0',
                  revision: '1',
                  time: Math.floor(new Date().getTime() / 1000),
                  dataHex: hexedUserProposal,
                  txid: userProp.txid
                };

                userProposal.txid = userProp.txid;
                proposalRef.set(userProposal);
                this.props
                  .submitProposal(userProposalObj)
                  .then(userSubmitResponse2 => {
                    return swal({
                      closeOnClickOutside: false,
                      closeOnEsc: false,
                      title: 'Success',
                      text: `"${userSubmitResponse2}" \n \n Please copy and paste this code into your wallet terminal in order to obtain a proposal hash, once you have done that please paste the proposal hash into the input. This could take a couple of minutes please be patient.`,
                      icon: 'success',
                      buttons: true,
                      dangerMode: false,
                      content: {
                        element: 'input',
                        attributes: {
                          placeholder: 'Input proposal hash here',
                          type: 'text'
                        }
                      }
                    });
                  })
                  .then(userProposalHash2 => {
                    if (userProposalHash2) {
                      userProposal.hash = userProposalHash2;
                      proposalRef.set(userProposal);

                      swal({
                        title: 'Success',
                        text: 'Proposal has been created.',
                        icon: 'success'
                      });
                    } else {
                      throw new Error('No submit receipt');
                    }
                  })
                  .catch(err => {
                    alert(err);
                  });

                return;
              }

              if (userProp.prepareReceipt) {
                swal({
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                  title: 'Success',
                  text: `"${
                    userProp.prepareReceipt
                  }" \n \n Please copy and paste this code into your wallet terminal in order to obtain a payment id, once you have done that please paste the payment id into the input.`,
                  icon: 'success',
                  buttons: true,
                  dangerMode: false,
                  content: {
                    element: 'input',
                    attributes: {
                      placeholder: 'Input payment id here',
                      type: 'text'
                    }
                  }
                })
                  .then(txid => {
                    if (txid) {
                      const userProposalObj2 = {
                        parentHash: '0',
                        revision: '1',
                        time: Math.floor(new Date().getTime() / 1000),
                        dataHex: hexedUserProposal,
                        txid: txid
                      };

                      userProposal.txid = txid;
                      proposalRef.set(userProposal);
                      return this.props.submitProposal(userProposalObj2);
                    } else {
                      throw new Error('No paymentId received');
                    }
                  })
                  .then(userSubmitResponse => {
                    return swal({
                      closeOnClickOutside: false,
                      closeOnEsc: false,
                      title: 'Success',
                      text: `"${userSubmitResponse}" \n \n Please copy and paste this code into your wallet terminal in order to obtain a proposal hash, once you have done that please paste the proposal hash into the input. This could take a couple of minutes please be patient.`,
                      icon: 'success',
                      buttons: true,
                      dangerMode: false,
                      content: {
                        element: 'input',
                        attributes: {
                          placeholder: 'Input proposal hash here',
                          type: 'text'
                        }
                      }
                    });
                  })
                  .then(userProposalHash3 => {
                    if (userProposalHash3) {
                      userProposal.hash = userProposalHash3;
                      proposalRef.set(userProposal);

                      swal({
                        title: 'Success',
                        text: 'Proposal has been created.',
                        icon: 'success'
                      });
                    } else {
                      throw new Error('No submit receipt');
                    }
                  })
                  .catch(err => {
                    alert(err);
                  });
              }
            } else {
              proposalRef.remove();
            }
          })
          .catch(err => {
            alert(err);
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
      proposalDate,
      userProposalSaved
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

          return swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Success',
            text: `"${prepareResponse}" \n \n Please copy and paste this code into your wallet terminal in order to obtain a payment id, once you have done that please paste the payment id into the input.`,
            icon: 'success',
            buttons: true,
            dangerMode: false,
            content: {
              element: 'input',
              attributes: {
                placeholder: 'Input payment id here',
                type: 'text'
              }
            }
          });
        } else {
          throw new Error('No prepare receipt');
        }
      })
      .then(paymentId => {
        let submitObj = { ...prepareObj };
        if (paymentId) {
          userProposal.txid = paymentId;
          proposalRef.set(userProposal);
          submitObj.txid = paymentId;
          return this.props.submitProposal(submitObj);
        } else {
          throw new Error('No paymentId received');
        }
      })
      .then(submitResponse => {
        if (submitResponse) {
          userProposal.submitReceipt = submitResponse;
          proposalRef.set(userProposal);

          return swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Success',
            text: `"${submitResponse}" \n \n Please copy and paste this code into your wallet terminal in order to obtain a proposal hash, once you have done that please paste the proposal hash into the input. This could take a couple of minutes please be patient.`,
            icon: 'success',
            buttons: true,
            dangerMode: false,
            content: {
              element: 'input',
              attributes: {
                placeholder: 'Input proposal hash here',
                type: 'text'
              }
            }
          });
        } else {
          throw new Error('No submit receipt');
        }
      })
      .then(proposalHash => {
        if (proposalHash) {
          userProposal.hash = proposalHash;
          proposalRef.set(userProposal);

          swal({
            title: 'Success',
            text: 'Proposal has been created.',
            icon: 'success'
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
      showEditor: true
    });
    // console.log(this.state.proposalTitle, 'proposalTitle');
    // console.log(this.state.address, 'address');
    // console.log(this.state.amount, 'amount');
    // console.log(this.state.paymentQuantity, 'parment quantity');
  };

  handleBack = () => {
    if (this.state.activeStep === 2) {
      // console.log('active step');
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
    // console.log(date, dateString);
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
        // console.log('----------------------');
      }
    );
  }

  confirmProposalDetail() {
    this.previewHTML();
  }

  // steps name in array in which we map
  getSteps() {
    return [
      'Proposal Title',
      'Proposal Details',
      'Payment Details',
      'Amount',
      'Create Proposal'
    ];
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
                      this.state.editorState &&
                      this.state.editorState.getCurrentContent().hasText()
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
            <Col
              span={deviceType === 'mobile' ? 10 : 7}
              offset={deviceType === 'mobile' ? 4 : 0}
            >
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
        return;
        <Button>Confirm</Button>;
    }
  }
  onEditorStateChange(editorState) {
    console.log('editorState', editorState);
    this.setState({
      editorState
    });
    console.log(
      this.state.editorState.getCurrentContent().hasText(),
      'editor state'
    );
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
          this.state.proposalDate &&
          this.state.paymentQuantity &&
          this.state.address
        ) {
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
    const { classes, deviceType, proposal } = this.props;
    const { checkStatus, prepareReceipt, submitReceipt } = proposal;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const steps = this.getSteps();
    const { activeStep } = this.state;
    // console.log(this.state.proposal__detail, 'detail');
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
                        <h3 className="proposal-title">
                          Proposal Description Url
                        </h3>
                      ) : null}
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
                            activeStep === steps.length - 1
                              ? 'confirm-btn-div'
                              : 'next-btn-div'
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
    submitProposal: params => dispatch(actions.submitProposal(params))
  };
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(newProposalStyle)(NewProposal)
);
