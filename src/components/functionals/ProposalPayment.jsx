/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Divider } from 'antd';
import { Grid, FormGroup, Input, withStyles } from 'material-ui';


import { proposalPaymentStyle } from './styles';

class ProposalPayment extends Component {
  constructor(props) {
    super(props);


  }
  render() {
    const classes = this.props.classes;

    return (
      <Grid md={12} className={classes.proposalPaymentRoot}>

        <Grid item className="no-margin">
          <div className="heading">PAYMENTS</div>
        </Grid>
        <Grid item md={11} className="no-margin">
          <hr />
        </Grid>
        <Grid container md={12} className="paymentsView" >
          <Grid item md={3} className="OnTimePaymentView">

            <div className="heading"> On Time Payment </div>
            <form className="form">
              <FormGroup className="FormGroup">
                <input
                  ref={(ref) => { }}
                  name="onTimePayment"
                  id="onTimePayment"
                  className="input-field"
                  placeholder="21 SYS (29209 USD)"
                  onChange={e => { }}
                />
              </FormGroup>
            </form>

          </Grid>
          <Grid item md={3} className="OnTimePaymentView" >

            <div className="heading"> Complete Payment </div>

            <form className="form">
              <FormGroup className="FormGroup">
                <input
                  ref={(ref) => { }}
                  name="onTimePayment"
                  id="onTimePayment"
                  className="input-field"
                  placeholder="no payments occurred yet"
                  onChange={e => { }}
                />
              </FormGroup>
            </form>
          </Grid>

          <Grid item md={3} className="OnTimePaymentView" >

            <div className="heading"> Start & End Date </div>
            <form className="form">
              <FormGroup className="FormGroup">
                <input
                  ref={(ref) => { }}
                  name="onTimePayment"
                  id="onTimePayment"
                  className="input-field"
                  placeholder="18-01-17 / 2018-02-16"
                  onChange={e => { }}
                />
              </FormGroup>
            </form>
          </Grid>



        </Grid>


{/*
        <Grid item className="approvalStatus">
          <div className="heading">APPROVAL STATUS </div>
        </Grid>
        <Grid item md={11} className="no-margin">
          <hr />
        </Grid>
        <Grid container md={12} className="topApprovalView" >
          <Grid item md={3} className="approvalKey" >
            Stauts:
          </Grid>
          <Grid item md={6} className="approvalValue" >
            <span className="approvalRedColorFont">UNFUNNDED</span> - Isufficient Votes (<span className="approvalRedColorFont">2</span>5/ votes)
          </Grid>
        </Grid>

        <Grid container md={12} className="approvalView" >
          <Grid item md={3} className="approvalKey" >
            Voting Deadline:
          </Grid>
          <Grid item md={6} className="approvalValue" >
            <span className="approvalRedColorFont">12</span> Days Remaining (01/18/2018)
          </Grid>
        </Grid>

        <Grid container md={12} className="approvalView" >
          <Grid item md={3} className="approvalKey" >
            Vote Breakdown:
          </Grid>
          <Grid item md={6} className="approvalValue" >
            <div className="voteGreenColorFont">30 Yes </div> <div className="voteRedColorFont"> 5 No </div> 0 Abstain
          </Grid>
        </Grid>




        <Grid item className="approvalStatus">
          <div className="heading">PROPOSAL DESCRIPTIONS </div>
        </Grid>
        <Grid item md={11} className="no-margin">
          <hr />
        </Grid>
        <Grid container md={12} className="proposalView" >
          <Grid item md={11} className="proposalDetails" >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus eleifend velit, et dapibus nulla interdum tempor. Fusce condimentum leo eget ultricies lacinia. Nullam rutrum mattis iaculis. Ut nec felis lacinia, dignissim enim vel, feugiat quam. Curabitur ac aliquet nisi, suscipit rutrum enim.
          </Grid>
        </Grid>


        <Grid item className="approvalStatus">
          <div className="heading">COMMENTS SECTIONS </div>
        </Grid>
        <Grid item md={11} className="no-margin">
          <hr />
        </Grid>
        <Grid container md={8} className="commentSectionslView" >
          <Grid item md={12} className="commentHeading" >
            Add Comment
          </Grid>
          <Grid item md={12} className="proposalDetails" >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus eleifend velit, et dapibus nulla interdum tempor.
          </Grid>
        </Grid> */}





















      </Grid>

    )


  }
}

ProposalPayment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(proposalPaymentStyle)(ProposalPayment);
