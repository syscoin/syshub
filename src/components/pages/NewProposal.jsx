import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui';
import { Row, Col, Card } from 'antd';
import { Form, Icon, Input, Button } from 'antd';
//import style
import NewProposalStyle from './styles/newProposalStyle'
// import components
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



const FormItem = Form.Item;
class NewProposal extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1 className='title'>Proposal Configuration</h1>
        <Paper className='paper-container' elevation={4}>
          {/* Proposal Title Row */}
          <Row className="proposal-title-row">
            {/* Proposal Title Colomn */}
            <Col span={10}>
              {/* Proposal heading */}
              <h1 className="proposal-title"> <span className="proposalHeading-dot"></span> Proposal Title</h1>
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
              <div className="nextStep-button-div">
                <Button type="primary">Next Step</Button>
              </div>
            </Col>

          </Row>

          {/* Proposal Detail Row */}
          <Row className="proposal-details-row">
            {/* Proposal Detail Colomn */}
            <Col span={20}>
              {/* Proposal heading */}
              <h1 className="proposal-title"> <span className="proposalHeading-dot"></span> Proposal Detials</h1>
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
