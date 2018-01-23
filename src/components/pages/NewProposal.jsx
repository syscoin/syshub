import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui';

//import style
import NewProposalStyle from './styles/newProposalStyle'
// import components
import { Stats, WelcomeBox } from '../functionals';
class NewProposal extends Component {



  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1 className='title'>Proposal Configuration</h1>
        <Paper className='paper-container' elevation={4}>

        </Paper>
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(withStyles(NewProposalStyle)(NewProposal))
