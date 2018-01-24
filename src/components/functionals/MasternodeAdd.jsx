import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Button, Grid, FormGroup, Input, withStyles } from 'material-ui';

// import style
import { masternodeAddStyle } from "./styles";


class MasterNodeAdd extends Component {
  constructor(props) {
    super(props);


    this.addNode = this.addNode.bind(this);

  }

  addNode(event) {
    event.preventDefault();
    const masterNodeName = this.nodeName.value;
    const masterNodeAddress = this.nodeAddress.value;

    if (masterNodeName && masterNodeAddress) {
      console.log("Master Node name " + masterNodeName + "Master Node Address " + masterNodeAddress)
    }
  }


  render() {

    const { classes } = this.props;


    return (
      <div className={classes.root}>
        <div className="heading">
          <h2 className="title">
            Add New Masternode
        </h2>
        </div>
        <Grid item md={12} className="form__container">
          <form
            onSubmit={event => this.addNode(event)}
            ref={form => {
              this.addNodeForm = form;
            }}
            className="wrapper"
          >
            <Grid item lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} justify="center">
              {/* For User Name */}
              <FormGroup className="form-group">
                <span htmlFor="user-name" className="label">
                  {`Masternode Name: `}
                </span>
                <input
                  ref={name => (this.nodeName = name)}
                  id="name"
                  className="input-field"
                  placeholder="e.g Mnode1"
                />
              </FormGroup>

              {/* For Password */}
              <FormGroup className="form-group">
                <span htmlFor="password" className="label">
                  {`Masternode 1000 SYS coin Address: `}
                </span>
                <input
                  ref={address => (this.nodeAddress = address)}
                  id="address"
                  className="input-field"
                  placeholder="123.45.67.891.12345"
                />
              </FormGroup>

              {/* Form Action Button */}
              <FormGroup className="form-group form-button-group">
                <Button type="submit" color="primary">
                  Add Masternode
                </Button>
              </FormGroup>
            </Grid>
          </form>
        </Grid>

      </div>
    )
  }

}



const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(withStyles(masternodeAddStyle)(MasterNodeAdd));
