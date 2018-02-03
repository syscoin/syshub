import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';
import { Button, Icon, Avatar } from 'antd';

// import style
import { newsFooterStyle } from './styles';

// import components
import { Stats, WelcomeBox } from '../functionals';
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
  withStyles(newsFooterStyle)(NewsFooter)
);
