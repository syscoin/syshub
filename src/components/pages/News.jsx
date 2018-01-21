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
  constructor(props){
    super(props);
  }

  render() {
    const { classes, app } = this.props;
    console.log('News -> Props:', this.props.app.showPage);
    return (
      <div className={classes.root}>
        <h1 className='title'>NEWS AND ANNOUNCEMENTS </h1>
        <Paper className='paper-container' elevation={4}>
          {
            {
              news: <NewsList/>,
              newsDetail: <NewsDetial/>
            }[this.props.app.showPage]
          }
        </Paper>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(withStyles(newsStyle)(News));
