/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import injectSheet from 'react-jss';
import { proposalDescriptionStyle } from '../styles';

class ProposalDescription extends Component {
  render() {
    const { classes, deviceType, description, url } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const urlLink = url.includes('http') ? url : `http://${url}`;
    console.log(urlLink, url);
    
    return (
      <Grid item md={12} className={style}>
        <Grid item className="approvalStatus">
          <div className="heading">
            <Typography variant="headline" gutterBottom>
              PROPOSAL DESCRIPTIONS
            </Typography>
          </div>
        </Grid>
        <Grid item md={11} className="no-margin">
          <hr />
        </Grid>
        <Grid item container md={12} className="proposalView">
          <Grid item md={11} className="proposalDetails">
            <Grid><div dangerouslySetInnerHTML={{ __html: description }} /></Grid>
          </Grid>
        </Grid>
        <Grid item container md={12} className="proposalUrl">
          <Typography variant="subheading" gutterBottom color='inherit'>
            More Info: &nbsp;
          </Typography>
          <div><a href={urlLink} target="_blank"> {url}</a></div>
        </Grid>
      </Grid>
    );
  }
}

ProposalDescription.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(proposalDescriptionStyle)(ProposalDescription);
