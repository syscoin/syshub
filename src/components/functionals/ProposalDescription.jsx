/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Divider } from 'antd';
import { Grid, FormGroup, Input, withStyles } from 'material-ui';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { proposalDescriptionStyle } from './styles';

class ProposalDescription extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes, deviceType, description } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid md={12} className={style}>
        <Grid item className="approvalStatus">
          <div className="heading">PROPOSAL DESCRIPTIONS </div>
        </Grid>
        <Grid item md={11} className="no-margin">
          <hr />
        </Grid>
        <Grid container md={12} className="proposalView">
          <Grid item md={11} className="proposalDetails">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProposalDescription.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(proposalDescriptionStyle)(ProposalDescription);
