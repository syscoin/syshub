/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import injectSheet from 'react-jss';
import proposalDescriptionStyle from './proposalDescription.style';

class ProposalDescription extends Component {
  render() {
    const {
      classes,
      deviceType,
      description,
      moreInfoUrl,
      proposalUrl
    } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const urlLink = proposalUrl.includes('http')
      ? proposalUrl
      : `http://${proposalUrl}`;

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
            <Grid>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </Grid>
          </Grid>
        </Grid>
        {moreInfoUrl && (
          <Grid item container md={12} className="proposalUrl">
            <Typography variant="subheading" gutterBottom color="inherit">
              More Info: &nbsp;
            </Typography>
            <div>
              <a href={moreInfoUrl} target="_blank" rel="noopener noreferrer">
                {moreInfoUrl}
              </a>
            </div>
          </Grid>
        )}
        <Grid item container md={12} className="proposalUrl">
          <Typography variant="subheading" gutterBottom color="inherit">
            Proposal Url: &nbsp;
          </Typography>
          <div>
            <a href={urlLink} target="_blank" rel="noopener noreferrer">
              {proposalUrl}
            </a>
          </div>
        </Grid>
      </Grid>
    );
  }
}

ProposalDescription.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(proposalDescriptionStyle)(ProposalDescription);
