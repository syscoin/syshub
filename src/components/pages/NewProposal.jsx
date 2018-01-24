import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { withStyles } from 'material-ui';
import { Row, Col, Card } from 'antd';
import { Form, Icon, Input, Button } from 'antd';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
//import style
import NewProposalStyle from './styles/newProposalStyle'
// import components
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FormItem = Form.Item;

function getSteps() {
  return ['Proposal Title', 'Proposal Details', 'Create an ad'];
}




class NewProposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      showEditor: true
    };


    this.getStepContent = this.getStepContent.bind(this);
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };


  getStepContent(step) {
    switch (step) {
      case 0:
        return ( //Proposal Title Row 
          <Row className="proposal-title-row">
            {/* Proposal Title Colomn */}
            <Col span={10}>
              {/* proposal title input field */}
              <Form>
                <FormItem className='form-item'>
                  <Input placeholder="Insert Reference Title" />
                </FormItem>
              </Form>
            </Col>
            {/* Proposal Description Url Colomn */}
            <Col span={14}>
              {/* Proposal description heading */}
              <h1 className="proposal-title">Proposal Discription Url</h1>
              <span className="proposal-description-url">http://www.syshub.com/p/proposal-title</span>
            </Col>

          </Row>);
      case 1:
        return (
          // Proposal Detail Row 
          <Row className="proposal-details-row">
            {/* Proposal Detail Colomn */}
            <Col span={20}>
              {/* Proposal heading */}
              {/* <h1 className="proposal-title"> <span className="proposalHeading-dot"></span> Proposal Detials</h1> */}
              {this.state.showEditor ?

                <Button className='preview-edit-button' onClick={() => { this.setState({ showEditor: false }) }}>PREVIEW</Button>
                :
                <Button className='preview-edit-button' onClick={() => { this.setState({ showEditor: true }) }}>EDITOR</Button>

              }
              {this.state.showEditor ? <div>
                <h2 className="editor-title">Write proposal details</h2>
                <Editor
                  onChange={(item) => { console.log("item", item) }}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="proposalEditor-wrapper"
                  editorClassName="proposal-editor"
                  toolbar={{
                    options: ['inline', 'list'],
                    inline: {
                      options: ['bold', 'italic', 'underline', 'monospace'],
                      list: {
                        options: ['unordered', 'ordered'],
                      },
                    },
                  }} />
                <Button className='confirm-button' onClick={() => { this.setState({ showEditor: false }) }}>Confirm</Button>

              </div> :
                <Row>
                  <Col span={22} offset={1}>
                    <h1 className='proposalDetail-title'>Proposal Title</h1>
                  </Col>
                  <Col span={22}>
                    <div className="proposalContent-div">
                      Given an HTML fragment, convert it to an object with two keys; one holding the array of ContentBlock objects, and the other holding a reference to the entityMap. Construct content state from the array of block elements and the entityMap, and then update the editor state with it. Full example available here.
                      Given an HTML fragment, convert it to an object with two keys; one holding the array of ContentBlock objects, and the other holding a reference to the entityMap. Construct content state from the array of block elements and the entityMap, and then update the editor state with it. Full example available here. Given an HTML fragment, convert it to an object with two keys; one holding the array of ContentBlock objects, and the other holding a reference to the entityMap. Construct content state from the array of block elements and the entityMap, and then update the editor state with it. Full example available here.
              </div>
                  </Col>
                </Row>

              }
            </Col>
          </Row>
        )
      case 2:
        return "assssssssssssdas sadas asdasd asdas asdasa asd"
      default:
        return 'Unknown step';
    }
  }


  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;


    return (
      <div className={classes.root}>

        <h1 className='title'>Proposal Configuration</h1>
        <Paper className='paper-container' elevation={4}>

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{this.getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div className="next-btn-div">

                        {
                          activeStep === 0 ? 
                        null : <Button
                              raised
                              type='primary'
                              onClick={this.handleBack}
                              className={classes.button}
                            >
                              Back
                      </Button>
                        }
                        <Button
                          raised
                          type='primary'
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>All steps completed - you&quot;re finished</Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
            </Button>
            </Paper>
          )}
        </Paper>
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(withStyles(NewProposalStyle)(NewProposal))
