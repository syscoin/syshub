/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Divider } from 'antd';
import { Grid, FormGroup, Input, withStyles } from 'material-ui';


import { proposalApprovalStyle } from './styles';

class ProposalApprovalStat extends Component {
  constructor(props) {
    super(props);


  }
  render() {
    const classes = this.props.classes;

    return (
      <Grid md={12} className={classes.proposalPaymentRoot}>


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
            <span className="approvalRedColorFont">UNFUNNDED</span> - Isufficient Votes (<span className="approvalRedColorFont">25</span>/ votes)
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

      </Grid>

    )


  }
}

ProposalApprovalStat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(proposalApprovalStyle)(ProposalApprovalStat);
