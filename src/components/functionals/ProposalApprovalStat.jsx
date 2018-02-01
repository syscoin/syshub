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
    this.state = {
      yesCount: this.props.yesCount,
      noCount: this.props.noCount,
      abstrainCount: this.props.abstrainCount
    }
  }
  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid md={12} className={style}>
        <Grid item className="approvalStatus">
          <div className="heading">APPROVAL STATUS </div>
        </Grid>
        <Grid item md={11} className="no-margin">
          <hr />
        </Grid>
        <Grid container md={12} className="topApprovalView">
          <Grid item md={3} className="approvalKey">
            Stauts:
          </Grid>
          <Grid item md={6} className="approvalValue">
            <span className="approvalRedColorFont">UNFUNNDED</span> -
            Isufficient Votes (<span className="approvalRedColorFont">25</span>/
            votes)
          </Grid>
        </Grid>

        <Grid container md={12} className="approvalView">
          <Grid item md={3} className="approvalKey">
            Voting Deadline:
          </Grid>
          <Grid item md={6} className="approvalValue">
            <span className="approvalRedColorFont">12</span> Days Remaining
            (01/18/2018)
          </Grid>
        </Grid>

        <Grid container md={12} className="approvalView">
          <Grid item md={3} className="approvalKey">
            Vote Breakdown:
          </Grid>
          <Grid item md={6} className="approvalValue">
            <div className="voteGreenColorFont">{ this.state.yesCount } Yes </div>{' '}
            <div className="voteRedColorFont"> {this.state.noCount} No </div> {this.state.abstrainCount} Abstain
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProposalApprovalStat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(proposalApprovalStyle)(ProposalApprovalStat);
