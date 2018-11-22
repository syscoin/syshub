/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

//import antd components
import { Grid} from '@material-ui/core';

import injectSheet from 'react-jss';
import { proposalApprovalStyle } from '../styles';

class ProposalApprovalStat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days_remaining: 0,
      month_remaining: 0,
      endDate: '',
      totalNodes: 0,
      totalVotes: 0,
      YesCount: 0,
      NoCount: 0,
      AbstainCount: 0,
      progress: 0,
      passingPercentage: 0,
      status: ''
    };
  }
  componentWillMount() {
    this.prepareData();
    
    let startDate = new Date();
    let endDate = new Date(
      this.props.proposal.DataString[0][1].end_epoch * 1000
    );
    if (endDate > startDate) {
      const timeDiff = endDate.getTime() - startDate.getTime();
      const days_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24);
      const month_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 30);

      this.setState({
        days_remaining,
        month_remaining,
        endDate:
          endDate.getDate() +
          '/' +
          (parseInt(endDate.getMonth(), 10) + 1) +
          '/' +
          endDate.getFullYear()
      });
    }
  }

  prepareData() {
    const { totalNodes, proposal, passingPercentage } = this.props;
    const { AbsoluteYesCount, YesCount, NoCount, AbstainCount, fCachedFunding } = proposal;
    
    const funded = fCachedFunding;
    const progress = Math.min(Math.floor(AbsoluteYesCount / totalNodes * 100), 100);
    let status = progress >= passingPercentage ? 'passing' : 'unfunded';
    if (funded ) { status = 'funded' } ;
    this.setState({
      totalNodes,
      totalVotes: AbsoluteYesCount,
      YesCount,
      NoCount,
      AbstainCount,
      progress,
      passingPercentage,
      status
    });
  }

  render() {
    const { classes, deviceType } = this.props;
    const { days_remaining, month_remaining, endDate, totalNodes,totalVotes, YesCount, NoCount, AbstainCount, status } = this.state;
    
    //Platform style switcher
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
            <span> 
              <span className={`approvalColorFont ${status}`}>{status.toUpperCase()}</span>
              {status !== 'unfunded' ? ' - Sufficient Votes ': ' - Insufficient Votes '}
              <span className={`approvalColorFont ${status}`}>{totalVotes}</span>/{Math.round(totalNodes)}
            </span>
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
                  <span className="approvalRedColorFont">
                    {days_remaining < 30 ? days_remaining : month_remaining}
                  </span>
                  {days_remaining < 30 ?
                    (<span>{` Day${days_remaining > 1 ? 's' : ''} Remaining `}</span>) :
                    (<span>{` Month${month_remaining > 1 ? 's' : ''} Remaining `}</span>)
                  }
                  <span>({endDate})</span>
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

export default injectSheet(proposalApprovalStyle)(ProposalApprovalStat);
