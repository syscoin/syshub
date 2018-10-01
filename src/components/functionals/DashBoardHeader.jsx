/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//import antd components
import { Grid } from '@material-ui/core';

import { injectSheet } from 'jss';
import { deshBoardHeaderStyle } from './styles';

class DashBoardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    const { classes, deviceType, proposal } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid item container md={12} xs={12} className={style}>
        {this.state.data.showHeader === 'ProposalDetail' ? (
          <Grid item container md={12} xs={12} className="no-margin">
            <Grid item md={12} xs={12} className="headingView">
              <Grid item md={12} xs={12} className="headingRow">
                <img alt="a" src={require('../../assets/img/png_icon_proposal.png')} height="30" />
                <div className="headingDiv"> {this.state.data.name}</div>
                <div className="ownerDetails">
                </div>
              </Grid>
            </Grid>
          </Grid>
        ) : (
            <Grid item container md={12} xs={12} className="no-margin">
              <Grid item md={12} xs={12} className="headingView">
                <Grid item md={12} xs={12} className="headingRow">
                  <div className="headingDiv">
                    {' '}
                    <span className="activeText">
                      {proposal.list.length > 0 ? proposal.list.length : 0}
                    </span>
                    {'  '}
                    Active Proposals
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
  classes: PropTypes.object.isRequired
};

const stateToProps = state => {
  return {
    proposal: state.proposals
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  injectSheet(deshBoardHeaderStyle)(DashBoardHeader)
);
