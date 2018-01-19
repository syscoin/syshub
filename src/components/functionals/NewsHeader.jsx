import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';

// import style
import { newsHeaderStyle } from './styles'

// import components
import { Stats, WelcomeBox } from '../functionals';
class NewsHeader extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container className={classes.root}>
          <Grid md={12} className='newHeader-grid'>
              <div>
                News Header is coming
              </div>
          </Grid>
        </Grid>
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

export default connect(stateToProps, dispatchToProps)(withStyles(newsHeaderStyle)(NewsHeader));
