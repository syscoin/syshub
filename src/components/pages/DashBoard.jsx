import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import PropTypes from 'prop-types';
import { Grid , withStyles } from 'material-ui';
import { ProposalList  } from '../containers/ProposalList';

// import components
import { dashboardStyle  } from './styles';

class DashBoard extends Component {
  constructor(props){
    super(props)
  }
  render() {
   const { classes } = this.props;

    return (

      <Grid container className={classes.root}>
        {' '}
        {/* You can see the <strong>PROPOSAL DASHBOARD</strong> page{' '} */}
        <h1 className="heading">PROPOSAL DASHBOARD</h1>

          <ProposalList />
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
DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(stateToProps, dispatchToProps)(withStyles(dashboardStyle)(DashBoard));
