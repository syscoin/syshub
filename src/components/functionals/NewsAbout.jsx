import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';

// import style
import { newsAboutStyle } from './styles'

// import components
import { Stats, WelcomeBox } from '../functionals';
class NewsAbout extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container className={classes.root}>
          <Grid md={12} className='newAbout-grid'>
            <div>
              News About is coming
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

export default connect(stateToProps, dispatchToProps)(withStyles(newsAboutStyle)(NewsAbout));
