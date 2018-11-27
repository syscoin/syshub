import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Button, Icon } from 'antd';

// import style
import injectSheet from 'react-jss';
import newsFooterStyle from './newsFooter.style';

class NewsFooter extends Component {
  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div>
        <Grid container className={style}>
          <Grid item md={6}>
            <div className="info">
              <Button
                className="previous"
                size="large"
                onClick={() => this.props.goBack()}
              >
                {` `}
                <Icon type="double-left" />
                {`Go Back to the List `}
              </Button>
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

export default connect(stateToProps, dispatchToProps)(
  injectSheet(newsFooterStyle)(NewsFooter)
);
