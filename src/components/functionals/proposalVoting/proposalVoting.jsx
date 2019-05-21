// Inputs:  user logged and proposal voting status
// Outputs: voting result (yes/no/abstain)

import React, { Component } from 'react';

//import material-ui components
import Button from '@material-ui/core/Button';

// improt Material-icons
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import CropSquare from '@material-ui/icons/CropSquare';

// import style
import injectSheet from 'react-jss';
import proposalVotingDesktopStyle from './proposalVoting.style';

const _YES = 1;
const _NO = 2;
const _ABSTAIN = 3;

class ProposalVotingDesktop extends Component {
  render() {
    const { classes, logged, votingCount, deviceType } = this.props;
    const accepts = votingCount.yesCount;
    const declines = votingCount.noCount;
    const abstains = votingCount.abstainCount;

    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div className={style}>
        <div className="formLabel">Vote</div>
        <Button
          size="small"
          className="muiButton accept"
          disabled={!logged}
          onClick={() => this.props.onVote(_YES)}
        >
          <div className="btnContent">
            <KeyboardArrowUp className="btnIcon acceptIcon" />
            <div className="voteLabel">Yes</div>
            <div className="voteNumbers">{`${accepts}`}</div>
          </div>
        </Button>
        <Button
          size="small"
          className="muiButton abstain"
          disabled={!logged}
          onClick={() => this.props.onVote(_ABSTAIN)}
        >
          <div className="btnContent">
            <CropSquare className="btnIcon abstainIcon" />
            <div className="voteLabel">Abstain</div>
            <div className="voteNumbers">{`${abstains}`}</div>
          </div>
        </Button>
        <Button
          size="small"
          className="muiButton decline"
          disabled={!logged}
          onClick={() => this.props.onVote(_NO)}
        >
          <div className="btnContent">
            <KeyboardArrowDown className="btnIcon declineIcon" />
            <div className="voteLabel">No</div>
            <div className="voteNumbers">{`${declines}`}</div>
          </div>
        </Button>
      </div>
    );
  }
}

export default injectSheet(proposalVotingDesktopStyle)(ProposalVotingDesktop);
