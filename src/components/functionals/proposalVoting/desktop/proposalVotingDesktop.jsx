// Inputs:  proposal voting status
// Outputs: voting result (yes/no/abstain)

import React, { Component } from 'react';

//import antd components
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
              control={
                <Radio classes={{
                  root: classes.root.radioRoot
                }} />
              }
              label="Accept"
            />
            <FormControlLabel
              className="formControlLabel"
              value="no"
              control={<Radio color="primary" />}
              label="Decline"
            />
            <FormControlLabel
              className="formControlLabel"
              value="abstain"
              control={<Radio color="primary" />}
              label="Abstain"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default injectSheet(proposalVotingDesktopStyle)(ProposalVotingDesktop);