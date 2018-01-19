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
    this.state = {
      userComment:' Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }


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

            {/* <textarea rows="4" cols="50" > Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus eleifend velit, et dapibus nulla interdum tempor.</textarea> */}
          <hr className="proposalDetailsHr" />

            <Button type="submit" color="primary" className="formSubmiButton">
              Submit
              </Button>

          </Grid>
        </Grid>


        <Grid item md={9} className="no-margin">
          <hr className="proposalHr" />
        </Grid>



        <Grid container md={10} className="topCommentWithReplyView" >
          <Grid container md={12} className="commentHeading" >
            <Grid item md={8} className="userView" >
              <span className="userName"> User 6 <img src={require('../../assets/img/png_icon_badge.png')} className="badgeIcon" /></span>
              <div className="commentDate">Jan 1, 2018 - 10:21 A.M </div>
          </Grid>
            <Grid item md={4} className="votesView" >
              <img src={require('../../assets/img/png_button_up.png')} className="upVoteICon" />
              11
              <img src={require('../../assets/img/png_button_down.png')} className="downVoteICon" />
              66
            </Grid>
          </Grid>
          <Grid item md={12} className="commentlHrView">
            <hr className="commentlHr" />
          </Grid>
          <Grid item md={10} className="newYearView"> Happy New Year!!! ..</Grid>
          <Grid item md={10} className="replyView"> Reply</Grid>

          <Grid container md={8} className="topcommentSectionslView" >
            <Grid item md={12} className="commentHeading" >
              Enter Reply
          </Grid>

            <Grid item md={12} className="proposalDetails" >
              Having Fun ?
          <hr className="proposalDetailsHr" />

              <Button type="submit" color="primary" className="formSubmiButton">
                Submit
              </Button>
              <Button type="submit" color="primary" className="formSubmiButton">
                Cancel
              </Button>

            </Grid>
          </Grid>
        </Grid>



        <Grid container md={10} className="commentWithReplyView" >
          <Grid container md={12} className="commentHeading" >
            <Grid item md={8} className="userView" >
              <span className="userName"> User 1 <img src={require('../../assets/img/png_stats_propposal_votes.png')} className="badgeIcon" /> </span>
              <div className="commentDate">Jan 5, 2018 - 12:21 A.M</div>
          </Grid>
            <Grid item md={4} className="votesView" >
              <img src={require('../../assets/img/png_button_up.png')} className="upVoteICon" />
              23
              <img src={require('../../assets/img/png_button_down.png')} className="downVoteICon" />
              8
            </Grid>
          </Grid>
          <Grid item md={12} className="commentlHrView">
            <hr className="commentlHr" />
          </Grid>
          <Grid item md={10} className="newYearView"> Did You Like my Proposal ?</Grid>
          <Grid item md={10} className="replyView"> Reply</Grid>

        </Grid>




      </Grid>

    )


  }
}

ProposalComments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(proposalCommentsStyle)(ProposalComments);
