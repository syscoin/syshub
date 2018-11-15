// Inputs:  proposal voting status
// Outputs: voting result (yes/no/abstain)

import React, { Component } from 'react';

//import material-ui components
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Badge from '@material-ui/core/Badge';

// import style
import injectSheet from 'react-jss';
import proposalVotingDesktopStyle from './proposalVotingDesktop.style';

class ProposalVotingDesktop extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const accepts = 300;
    const declines = 2;
    const abstains = 100000;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className="formControl">
          <FormLabel component="legend" className="formLabel">Vote on Proposal</FormLabel>
          <RadioGroup
            aria-label="proposalVoting"
            name="proposalVoting"
            className="radioGroup"
            value={this.state.value}
            onChange={this.handleChange}
          >
              <FormControlLabel
                className="formControlLabel"
                value="yes"
                control={ <Radio className="acceptRadio"/> }
                label={
                  <div className="labelWrapper">
                    <div className="voteLabel">Accept</div>
                    <div className="voteNumbers">{`${accepts}`}</div>
                  </div>
                }
              />
              <FormControlLabel
                className="formControlLabel"
                value="no"
                control={<Radio className="declineRadio"/>}
                label={
                  <div className="labelWrapper">
                    <div className="voteLabel">Decline</div>
                    <div className="voteNumbers">{`${declines}`}</div>
                  </div>
                }
              /> 
              <FormControlLabel
                className="formControlLabel"
                value="abstain"
                control={<Radio className="abstainRadio"/>}
                label={
                  <div className="labelWrapper">
                    <div className="voteLabel">Abstain</div>
                    <div className="voteNumbers">{`${abstains}`}</div>
                  </div>
                }
              />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default injectSheet(proposalVotingDesktopStyle)(ProposalVotingDesktop);