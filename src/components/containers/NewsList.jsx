import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { classes, selectNews } = this.props;
    
    return (
      <div className={classes.root}>
        <NewsCard selectNews={selectNews}/>
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

NewsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(stateToProps, dispatchToProps)(withStyles(newsListStyle)(NewsList));
