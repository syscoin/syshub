/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Divider } from 'antd';
import { Grid, withStyles } from 'material-ui';
import { ProposalCard } from '../functionals/';


import { deshBoardHeaderStyle } from './styles';

class DashBoardHeader extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <Grid container className={classes.root}>
        <Grid item md={11} className="headingView">
          <Grid item md={11} className="headingRow">
            <span className="activeText">! </span> <div className="headingDiv"> Current have <span className="activeText"> 12 </span>  active Proposal</div>
          </Grid>

        </Grid>

        <ProposalCard />

      </Grid>
    );
  }
}

DashBoardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(deshBoardHeaderStyle)(DashBoardHeader);
