/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import injectSheet from 'react-jss';

//Import Styles
import { siderLogoStyle } from './styles';

class SiderLogo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <img
            alt="a"
            src={require('../../assets/img/png_menu_logo.png')}
            width="100%"
          />
        </div>
        {/* <div className="txtArea">
          <Typography variant="body1" gutterBottom align='right'>
            brought to you by
        </Typography>
          <Typography variant="body2" gutterBottom align='right'>
            Blockchain Foundry
        </Typography>
        </div> */}
      </div>
    );
  }
}

export default injectSheet(siderLogoStyle)(SiderLogo);
