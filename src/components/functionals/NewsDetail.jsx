import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';

// import style
import { newsDetailStyle } from './styles'


// import components
import { Stats, WelcomeBox } from '../functionals';
import NewsHeader from './NewsHeader'
import NewsBody from './NewsBody'
import NewsAbout from './NewsAbout'
import NewsFooter from './NewsFooter'






class NewsDetail extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <NewsHeader />
        <NewsBody />
        <NewsAbout />
        <NewsFooter />
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

export default connect(stateToProps, dispatchToProps)(withStyles(newsDetailStyle)(NewsDetail));
