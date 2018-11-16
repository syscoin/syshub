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
    const accepts =  1 //votingCount.yesCount;
    const declines = 100 // votingCount.noCount;
    const abstains = 100000 // votingCount.abstainCount;

    return (
      <div className={classes.root}>
        <div className="formLabel">Vote on Proposal</div>
          <Button size="small" className="muiButton accept">
            <div className="btnContent">
              <KeyboardArrowUp className="btnIcon acceptIcon"/>
              <div className="voteLabel">Yes</div>
              <div className="voteNumbers">{`${accepts}`}</div>
            </div>
          </Button>
          <Button size="small" className="muiButton abstain">
            <div className="btnContent">
              <CropSquare className="btnIcon abstainIcon"/>
              <div className="voteLabel">Abstain</div>
              <div className="voteNumbers">{`${abstains}`}</div>
            </div>
          </Button>
          <Button size="small" className="muiButton decline">
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