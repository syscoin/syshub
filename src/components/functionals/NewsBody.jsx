import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, withStyles } from 'material-ui';

// import style
import { newsBodyStyle } from './styles';

class NewsBody extends Component {
  render() {
    const { classes, body, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    //console.log('ACZ (post) --> ', post);
    return (
      <div>
        <Grid container className={style}>
          <Grid md={12} xs={12} className="new-body__wrapper">
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
  withStyles(newsBodyStyle)(NewsBody)
);
