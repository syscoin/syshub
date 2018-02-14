/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import injectSheet from 'react-jss';

//Import Styles
import { siderLogoStyle } from './styles';

class SiderLogo extends Component {
  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div className={classes.root}>
        <div>
          <img
            alt="a"
            src={require('../../assets/img/png_logo.png')}
            width="100%"
          />
        </div>
        <div className="txtArea">
        <Typography variant="body1" gutterBottom align='right'>
          brought to you by
        </Typography>
        <Typography variant="body2" gutterBottom align='right'>
          Blockchain Foundry
        </Typography>
        </div>
      </div>
    );
  }
}

export default injectSheet(siderLogoStyle)(SiderLogo);
