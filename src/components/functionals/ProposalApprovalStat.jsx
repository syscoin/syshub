/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

//import antd components
import { Grid, withStyles } from 'material-ui';

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
    let endDate = new Date(
      this.props.proposal.DataString[0][1].end_epoch * 1000
    );
    if (endDate > startDate) {
      let timeDiff = endDate.getTime() - startDate.getTime();
      let days_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24);
      this.setState({
        days_remaining,
        endDate:
          endDate.getDate() +
          '/' +
          (parseInt(endDate.getMonth(), 10) + 1) +
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
      <Grid item md={12} className={style}>
        <Grid item className="approvalStatus">
          <div className="heading">
            <Typography variant="headline" gutterBottom>
              APPROVAL STATUS
      </Typography>
          </div>
        </Grid>
        <Grid item md={11} className="no-margin">
          <hr />
        </Grid>
        <Grid item container md={12} className="topApprovalView">
          <Grid item md={3} className="approvalKey">
            <Typography variant="subheading" gutterBottom color='inherit'>
              Status:
            </Typography>
          </Grid>
          <Grid item md={6} className="approvalValue">
            {YesCount / totalNodes * 100 >= 50 ? (
              <span>
                <span className="approvalGreenColorFont">FUNDED</span> -
                Sufficient Votes (<span className="approvalGreenColorFont">
                  {YesCount}
                </span>/{Math.round(totalNodes)})
              </span>
            ) : (
                <span>
                  <Typography gutterBottom >
                    <span className="approvalRedColorFont">UNFUNDED</span> -
                Insufficient Votes  (<span className="approvalRedColorFont">
                      {YesCount}
                    </span>/{Math.round(totalNodes)}) </Typography>
                </span>
              )}
          </Grid>
        </Grid>

        <Grid item container md={12} className="approvalView">
          <Grid item md={3} className="approvalKey">
            <Typography variant="subheading" gutterBottom color='inherit'> Voting Deadline:</Typography>
          </Grid>
          <Grid item md={6} className="approvalValue">
            <Typography gutterBottom>
              {days_remaining !== 0 ? (
                <span>
                  <span className="approvalRedColorFont">{days_remaining}</span>{' '}
                  Days Remaining ({endDate})
              </span>
              ) : (
                  <span>---</span>
                )}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container md={12} className="approvalView">
          <Grid item md={3} className="approvalKey">
            <Typography variant="subheading" gutterBottom color='inherit'>
              Vote Breakdown:
            </Typography>
          </Grid>

          <Grid item md={6} className="approvalValue">
            <div className="voteGreenColorFont"><Typography color='inherit'> {YesCount} Yes </Typography></div>{'  '}
            <div className="voteRedColorFont"> <Typography color='inherit'> {NoCount} No </Typography></div>{'  '}
            <Typography color='inherit'> {AbstainCount} Abstain </Typography>
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
