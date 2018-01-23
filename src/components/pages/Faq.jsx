import React, { Component } from 'react';
import { Input, Icon, Collapse } from 'antd';


import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { withStyles } from 'material-ui';


// import components
import { Stats, WelcomeBox } from '../functionals';
import { faqStyle } from "./styles";


const Panel = Collapse.Panel;

class Faq extends Component {

  constructor(props) {
    super(props);
    this.renderFaqDetails = this.renderFaqDetails.bind(this);
  }



  renderFaqDetails() {
    return (
      <Collapse bordered={false}>
        <div className="list-dot"></div>
        <Panel header="HOW DO I CONVERT MT SYSCOIN 1.0 SYSCOIN 2.0?" showArrow={false}>
          <div style={{ padding: '15px', border: '1px solid #a4b0be', marginLeft: 35 }}>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
          </div>
        </Panel>
        <div className="list-dot"></div>
        <Panel header="WHERE IS THE WALLET DATA DIRECTORY LOCATED ON WINDOWS?" showArrow={false}>
          <div style={{ padding: '15px', border: '1px solid #a4b0be', marginLeft: 35 }}>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
          </div>
        </Panel>
        <div className="list-dot"></div>
        <Panel header="WHERE IS THE WALLET DATA DIRECTORY LOCATED ON MAC?" showArrow={false}>
          <div style={{ padding: '15px', border: '1px solid #a4b0be', marginLeft: 35 }}>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
          </div>
        </Panel>
        <div className="list-dot"></div>
        <Panel header="HOW DO I SEND SYSCOIN TO SOMEONE?" showArrow={false}>
          <div style={{ padding: '15px', border: '1px solid #a4b0be', marginLeft: 35 }}>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be', paddingBottom: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
            <div style={{ color: '#a4b0be' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
          </div>
        </Panel>
      </Collapse>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1 className="title">SysHub FAQ</h1>

        <div className="faqs-div">
          <div className="search-question">
            <Input addonBefore={<Icon type="search" />} placeholder="Enter your Question" />
          </div>

          <Collapse bordered={false}>
            <Panel header="General" key="1" className="general">
              {this.renderFaqDetails()}
            </Panel>
            <Panel header="Tutorials" key="2" className="tutorials">
              {this.renderFaqDetails()}
            </Panel>
            <Panel header="Getting Started" key="3" className="getting-started">
              {this.renderFaqDetails()}
            </Panel>
            <Panel header="Alises" key="4" className="alises">
              {this.renderFaqDetails()}
            </Panel>
            <Panel header="Market Place" key="5" className="market-place">
              {this.renderFaqDetails()}
            </Panel>
            <Panel header="Digital Certificates" key="6" className="digital-certificates">
              {this.renderFaqDetails()}
            </Panel>
            <Panel header="Encrypted Messaging" key="7" className="encrypted-messaging">
              {this.renderFaqDetails()}
            </Panel>
          </Collapse>
        </div>
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

export default connect(stateToProps, dispatchToProps)(withStyles(faqStyle)(Faq));
