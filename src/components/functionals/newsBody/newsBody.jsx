import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

// import style
import injectSheet from 'react-jss';
import { newsBodyStyle } from '../styles';

class NewsBody extends Component {
  render() {
    const { classes, body, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div>
        <Grid container className={style}>
          <Grid  className="new-body__wrapper">
            <div dangerouslySetInnerHTML={{ __html: body }} />
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

export default connect(stateToProps, dispatchToProps)(
  injectSheet(newsBodyStyle)(NewsBody)
);
