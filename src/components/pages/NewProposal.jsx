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

function getStepContent(step) {
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
            <Button className='preview-edit-button'>preview</Button>
            <h2 className="editor-title">Write proposal details</h2>
            <Editor
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
            <Button className='confirm-button'>Confirm</Button>
          </Col>
        </Row>
      )
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}


class NewProposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      showEditor:true
    };
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
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                      </Button>
                        <Button
                          raised
                          color="primary"
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
