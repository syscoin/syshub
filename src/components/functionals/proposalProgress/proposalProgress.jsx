// Inputs:  User Logged and progress Object
// Outputs: None

import React, { Component } from 'react';

//import material-ui components
import CircularProgress from '@material-ui/core/CircularProgress';


import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import CropSquare from '@material-ui/icons/CropSquare';


// import style
import injectSheet from 'react-jss';
import proposalProgressStyle from './proposalProgress.style';

class ProposalProgress extends Component {
  render() {
    return (
      <CircularProgress
          className=''
          variant="static"
          value='100'
        />
    );
  }
}


export default injectSheet(proposalProgressStyle)(ProposalProgress);