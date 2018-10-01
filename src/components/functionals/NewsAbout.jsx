import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Grid } from 'material-ui';
import { Avatar } from 'antd';

// import style
import { injectSheet } from 'jss';
import { newsAboutStyle } from './styles';

class NewsAbout extends Component {
  render() {
    const { classes, about, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div>
        <Grid container className={style}>
          <Grid>
            <Avatar
              shape="square"
              size="large"
              src={about.avatar}
              className="avatar"
            />
            <p className="about">{about.text}</p>
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
  injectSheet(newsAboutStyle)(NewsAbout)
);
