/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Divider } from 'antd';
import { Grid, Button, FormGroup, Input, withStyles } from 'material-ui';


import { proposalCommentsStyle } from './styles';

class ProposalComments extends Component {
  constructor(props) {
    super(props);


  }
  render() {
    const classes = this.props.classes;

    return (
      <Grid md={12} className={classes.proposalCommentRoot}>


        <Grid item className="commentHeadingDiv">
          <div className="heading">COMMENTS SECTIONS </div>
        </Grid>
        <Grid item md={11} className="no-margin">
          <hr />
        </Grid>
        <Grid container md={8} className="commentSectionslView" >
          <Grid item md={12} className="commentHeading" >
            Add Comment
          </Grid>
          <Grid item md={12} className="proposalDetails" >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus eleifend velit, et dapibus nulla interdum tempor.
          <hr className="proposalDetailsHr" />

            <Button type="submit" color="primary" className="formSubmiButton">
              Submit
              </Button>

          </Grid>
        </Grid>


        <Grid item md={7} className="no-margin">
          <hr className="proposalHr" />
        </Grid>



        {/* <Grid container md={8} className="topCommentWithReplyView" >
          <Grid container md={12} className="commentHeading" >
            <Grid item md={8} className="userView" >
              user 6 Jan 1, 2018 - 10:21 A.M
          </Grid>
            <Grid item md={4} className="votesView" >
              user 6
            </Grid>
          </Grid>

          <Grid item md={7} className="no-margin">
            <hr className="proposalHr" />
          </Grid>

         <Grid item > Happy New Year!!!.. </Grid>
        </Grid> */}




      </Grid>

    )


  }
}

ProposalComments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(proposalCommentsStyle)(ProposalComments);
