import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';
import { Button, Icon, Avatar } from 'antd';

// import style
import {newsFooterStyle} from './styles'

// import components
import { Stats, WelcomeBox } from '../functionals';
class NewsFooter extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <Grid container className={classes.root}>
          <Grid item md={6}> 
            <Avatar shape="square" size="large" src="http://sinopale.org/wp-content/themes/arras-theme/images/thumbnail.png" className={classes.thumbnil}/>
            <div className="info">
              <div> <h1 className="title"> Jan 1, 2018 - <span className="sub-title">Header Title 1</span> </h1> </div>
              <Button className="previous" size='large'> <Icon type="double-left" />Previous Article </Button>
            </div>
          </Grid>
          <Grid item md={6}> 
          <Avatar shape="square" size="large" src="http://sinopale.org/wp-content/themes/arras-theme/images/thumbnail.png" className={classes.thumbnil}/>
          <div className="info">
            <div> <h1 className="title"> Jan 1, 2018 - <span className="sub-title">Header Title 2</span> </h1> </div>
            <Button size='large'>Next Article <Icon type="double-right" /></Button>
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

export default connect(stateToProps, dispatchToProps)(withStyles(newsFooterStyle)(NewsFooter));
