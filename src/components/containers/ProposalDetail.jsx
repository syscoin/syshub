/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { Grid , withStyles } from 'material-ui';
import { DashBoardHeader  } from '../functionals/';
import { ProposalPayment  } from '../functionals/';

// import components
import { proposalDetailsStyle  } from './styles';


export class ProposalDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data
    }
  }
  render() {

   const  classes  = this.props.classes;
   console.clear();
   console.log("-- ProposalDetail this.props "  ,this.props);

    return (
      <Grid container lg={11} style={proposalDetailsStyle.proposalDetailRoot} >
            <DashBoardHeader data={{showHeader:"ProposalDetail",name:"proposal 1"}} />

            <ProposalPayment />

      </Grid>
    );
  }
}
const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

ProposalDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(stateToProps, dispatchToProps)(withStyles(proposalDetailsStyle)(ProposalDetail));

