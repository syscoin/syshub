/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//import antd components
import { Grid, withStyles } from 'material-ui';
import { deshBoardHeaderStyle } from './styles';

class DashBoardHeader extends Component {
  constructor(props) {
    super(props);
    // console.clear();
    this.state = {
      data: this.props.data
    };
  }

  render() {
    const { classes, deviceType, proposal } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid container md={12} xs={12} className={style}>
        {this.state.data.showHeader === 'ProposalDetail' ? (
          <Grid container md={12} xs={12} className="no-margin">
            <Grid item md={12} xs={12} className="headingView">
              <Grid item md={12} xs={12} className="headingRow">
                <img alt="a" src={require('../../assets/img/png_icon_proposal.png')} height="30" />
                <div className="headingDiv"> {this.state.data.name}</div>
                <div className="ownerDetails">
                  {/* Owner: <div className="ownerName">User1 </div>{' '} */}
                </div>
              </Grid>
            </Grid>
          </Grid>
        ) : (
            <Grid container md={12} xs={12} className="no-margin">
              <Grid item md={12} xs={12} className="headingView">
                <Grid item md={12} xs={12} className="headingRow">
                  <div className="headingDiv">
                    Currently have {' '}
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
  withStyles(deshBoardHeaderStyle)(DashBoardHeader)
);
