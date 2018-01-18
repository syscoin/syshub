import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';

// import style
import {newsListStyle} from './styles'

// import components
import { Stats, WelcomeBox } from '../functionals';
import NewsCard from '../functionals/NewsCard'

class NewsList extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div>
    <NewsCard/>
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

export default connect(stateToProps, dispatchToProps)(withStyles(newsListStyle)(NewsList));
