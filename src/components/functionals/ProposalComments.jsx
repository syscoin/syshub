/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Grid, Button, withStyles } from 'material-ui';

import { proposalCommentsStyle } from './styles';

class ProposalComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userComment: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };
  }
  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid md={12} className={style}>
        <Grid item className="commentHeadingDiv">
          <div className="heading">COMMENTS SECTIONS </div>
        </Grid>
        <Grid item md={11} className="section-separate">
          <hr />
        </Grid>
        <Grid container md={8} className="commentSectionslView">
          <Grid item md={12} className="commentHeading">
            Add Comment
          </Grid>
          <Grid item md={12} className="proposalDetails">
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus eleifend velit, et dapibus nulla interdum tempor. */}

            <textarea rows="2" cols="75" className="userComment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus
              eleifend velit, et dapibus nulla interdum tempor.
            </textarea>
            <hr className="proposalDetailsHr" />

            <Button type="submit" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>

        <Grid item md={9} className="section-separate">
          <hr className="separate-with-margin" />
        </Grid>

        <Grid container md={10} className="topCommentWithReplyView">
          <Grid container md={12} className="commentHeading">
            <Grid item md={8} className="userView">
              <span className="userName">
                {' '}
                User 6{' '}
                <img
                  alt="a"
                  src={require('../../assets/img/png_icon_badge.png')}
                  className="badgeIcon"
                />
              </span>
              <div className="commentDate">Jan 1, 2018 - 10:21 A.M </div>
            </Grid>
            <Grid item md={4} className="votesView">
              <img
                alt="a"
                src={require('../../assets/img/png_button_up.png')}
                className="upVoteICon"
              />
              <div className="votingNumber">11</div>
              <img
                alt="a"
                src={require('../../assets/img/png_button_down.png')}
                className="downVoteICon"
              />
              <div className="votingNumber">66</div>
            </Grid>
          </Grid>
          <Grid item md={12} className="commentlHrView">
            <hr className="hr" />
          </Grid>
          <Grid item md={10} className="newYearView">
            {' '}
            Happy New Year!!! ..
          </Grid>
          <Grid item md={10} className="replyView">
            {' '}
            Reply
          </Grid>

          <Grid container md={8} className="topcommentSectionslView">
            <Grid item md={12} className="commentHeading">
              Enter Reply
            </Grid>

            <Grid item md={12} className="proposalDetails">
              {/* Having Fun ? */}
              <textarea rows="1" cols="55" className="userComment">
                Having Fun ?
              </textarea>
              <hr className="proposalDetailsHr" />

              {/* <Button type="submit" color="primary" className="formSubmiButton"> */}
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button type="submit" color="primary">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid container md={10} className="commentWithReplyView">
          <Grid container md={12} className="commentHeading">
            <Grid item md={8} className="userView">
              <span className="userName">
                {' '}
                User 1{' '}
                <img
                  alt="a"
                  src={require('../../assets/img/png_stats_propposal_votes.png')}
                  className="badgeIcon"
                />{' '}
              </span>
              <div className="commentDate">Jan 5, 2018 - 12:21 A.M</div>
            </Grid>
            <Grid item md={4} className="votesView">
              <img
                alt="a"
                src={require('../../assets/img/png_button_up.png')}
                className="upVoteICon"
              />
              <div className="votingNumber">23</div>
              <img
                alt="a"
                src={require('../../assets/img/png_button_down.png')}
                className="downVoteICon"
              />
              <div className="votingNumber">8</div>
            </Grid>
          </Grid>
          <Grid item md={12} className="commentlHrView">
            <hr className="commentlHr" />
          </Grid>
          <Grid item md={10} className="newYearView">
            {' '}
            Did You Like my Proposal ?
          </Grid>
          <Grid item md={10} className="replyView">
            {' '}
            Reply
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProposalComments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(proposalCommentsStyle)(ProposalComments);
