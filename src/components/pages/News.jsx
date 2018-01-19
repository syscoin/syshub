import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';
import Paper from 'material-ui/Paper';
import NewsList  from '../containers/NewsList'
import NewsDetial from '../functionals/NewsDetail'

// import style
import {newsStyle} from './styles'

// import components
import { Stats, WelcomeBox } from '../functionals';
class News extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <h1 className='title'>NEWS AND ANNOUNCEMENTS</h1>
        <Paper className='paper-container' elevation={4}>
          {/* <NewsList/> */}
          <NewsDetial/>
        </Paper>
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

export default connect(stateToProps, dispatchToProps)(withStyles(newsStyle)(News));
