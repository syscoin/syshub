import React, { Component } from 'react';
import { Button, Grid, FormGroup, Input, withStyles } from 'material-ui';



import { connect } from 'react-redux';
import actions from '../../redux/actions';

// import style
import { masterNodeStyle } from "./styles";


// import components
import { MasternodeList, MasternodeAdd } from '../functionals';
class MasterNode extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;


    return (
      <div className={classes.root}>
        <h1 className="title">
          Masternode Settings
        </h1>
        <div className="masternode-div">
          <MasternodeAdd />
          <MasternodeList />
        </div>
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

export default connect(stateToProps, dispatchToProps)(withStyles(masterNodeStyle)(MasterNode));
