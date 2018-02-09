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
      days_remaining: 0,
      endDate: ''
    };
  }
  componentWillMount() {
    let startDate = new Date();
    let endDate = new Date(this.props.proposal.DataString[0][1].end_epoch);
    if (endDate > startDate) {
      let timeDiff = Math.abs(startDate.getTime() - endDate.getTime());
      let days_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24);
      this.setState({
        days_remaining,
        endDate:
          endDate.getDate() +
          '/' +
          endDate.getMonth() +
          1 +
          '/' +
          endDate.getFullYear()
      });
    }
  }
  render() {
    const { classes, deviceType, totalNodes } = this.props;
    //Platform style switcher
    let { YesCount, NoCount, AbstainCount } = this.props.proposal;
    let { days_remaining, endDate } = this.state;
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
            {YesCount / totalNodes * 100 >= 50 ? (
              <span>
                <span className="approvalGreenColorFont">FUNNDED</span> -
                Sufficient Votes (<span className="approvalGreenColorFont">
                  {YesCount}
                </span>/{Math.round(totalNodes)})
              </span>
            ) : (
              <span>
                <span className="approvalRedColorFont">UNFUNNDED</span> -
                Isufficient Votes (<span className="approvalRedColorFont">
                  {YesCount}
                </span>/{Math.round(totalNodes)})
              </span>
            )}
          </Grid>
        </Grid>

        <Grid container md={12} className="approvalView">
          <Grid item md={3} className="approvalKey">
            Voting Deadline:
          </Grid>
          <Grid item md={6} className="approvalValue">
            {days_remaining != 0 ? (
              <span>
                <span className="approvalRedColorFont">{days_remaining}</span>{' '}
                Days Remaining ({endDate})
              </span>
            ) : (
              <span>---</span>
            )}
          </Grid>
        </Grid>

        <Grid container md={12} className="approvalView">
          <Grid item md={3} className="approvalKey">
            Vote Breakdown:
          </Grid>
          <Grid item md={6} className="approvalValue">
            <div className="voteGreenColorFont">{YesCount} Yes </div>{' '}
            <div className="voteRedColorFont"> {NoCount} No </div>{' '}
            {AbstainCount} Abstain
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProposalApprovalStat.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(proposalApprovalStyle)(ProposalApprovalStat);
