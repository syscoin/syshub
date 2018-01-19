import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';

// import style
import {newsBodyStyle} from './styles'

// import components
import { Stats, WelcomeBox } from '../functionals';
class NewsBody extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <Grid container className={classes.root}>
        <Grid md={12} className='newBody-grid'>
            <div>
              News Body is coming
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

export default connect(stateToProps, dispatchToProps)(withStyles(newsBodyStyle)(NewsBody));
