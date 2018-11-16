// Inputs:  proposal voting status
// Outputs: voting result (yes/no/abstain)

import React, { Component } from 'react';

//import material-ui components
import Button from '@material-ui/core/Button';


import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import CropSquare from '@material-ui/icons/CropSquare';


// import style
import injectSheet from 'react-jss';
import proposalVotingDesktopStyle from './proposalVotingDesktop.style';

class ProposalVotingDesktop extends Component {

  render() {
    const { classes, logged, votingCount } = this.props;
    const accepts =  votingCount.yesCount;
    const declines = votingCount.noCount;
    const abstains = votingCount.abstainCount;

    return (
      <div className={classes.root}>
        <div className="formLabel">Vote</div>
          <Button size="small" className="muiButton accept" disabled={!logged} onClick={() => this.props.onVote('yes')}>
            <div className="btnContent">
              <KeyboardArrowUp className="btnIcon acceptIcon"/>
              <div className="voteLabel">Yes</div>
              <div className="voteNumbers">{`${accepts}`}</div>
            </div>
          </Button>
          <Button size="small" className="muiButton abstain" disabled={!logged} onClick={() => this.props.onVote('abstain')}>
            <div className="btnContent">
              <CropSquare className="btnIcon abstainIcon"/>
              <div className="voteLabel">Abstain</div>
              <div className="voteNumbers">{`${abstains}`}</div>
            </div>
          </Button>
          <Button size="small" className="muiButton decline" disabled={!logged} onClick={() => this.props.onVote('no')}>
            <div className="btnContent">
              <KeyboardArrowDown className="btnIcon declineIcon"/>
              <div className="voteLabel">No</div>
              <div className="voteNumbers">{`${declines}`}</div>
            </div>
          </Button>
      </div>
    );
  }
}

export default injectSheet(proposalVotingDesktopStyle)(ProposalVotingDesktop);