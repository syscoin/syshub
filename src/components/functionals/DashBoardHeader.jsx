/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Divider } from 'antd';
import { Grid, withStyles } from 'material-ui';
import { deshBoardHeaderStyle } from './styles';

class DashBoardHeader extends Component {
  constructor(props) {
    super(props);
    // console.clear();
    this.state = {
      data: this.props.data,
    };
  }

  render() {
    const classes = this.props.classes;

    return (
      <Grid container md={12} className={classes.root}>
        {this.state.data.showHeader == 'ProposalDetail' ? (
          <Grid container md={12} className="no-margin">
            <Grid item md={12} className="headingView">
              <Grid item md={12} className="headingRow">
                <img
                  alt="a"
                  src={require('../../assets/img/png_icon_proposal.png')}
                  height="30"
                />
                <div className="headingDiv"> {this.state.data.name}</div>
                <div className="ownerDetails">
                  Owner: <div className="ownerName">User1 </div>{' '}
                </div>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container md={12} className="no-margin">
            <Grid item md={12} className="headingView">
              <Grid item md={12} className="headingRow">
                <span className="activeText">! </span>{' '}
                <div className="headingDiv">
                  {' '}
                  Currently have <span className="activeText"> 12 </span> Active
                  Proposal
                </div>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

DashBoardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(deshBoardHeaderStyle)(DashBoardHeader);
