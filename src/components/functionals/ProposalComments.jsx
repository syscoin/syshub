/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



//import antd components
import { Divider } from 'antd';
import { Grid, Button, FormGroup, Input, withStyles } from 'material-ui';


// import firebase
import { fire, comments, commentReplies } from '../../firebase';

import { proposalCommentsStyle } from './styles';

class ProposalComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userComment: '',
      userReply: '',
      proposalID: this.props.data.proposalID,
      comments: []
    };

    this.addComment = this.addComment.bind(this);
    this.setComment = this.setComment.bind(this);
    this.renderReplies = this.renderReplies.bind(this);
    this.generateDate = this.generateDate.bind(this);
    this.loadReplies = this.loadReplies.bind(this);
    this.addReply = this.addReply.bind(this);
    this.setReply = this.setReply.bind(this);
  }


  // @params date: It will be number which represent data in string like (253453453245)
  // @method generateDate: It will convert date to readable date
  generateDate(date) {
    let today = new Date(),
      offset = -(today.getTimezoneOffset() / 60);
    //return (_date.getDay() + " / " + (_date.getMonth() + 1) + ' / ' + (_date.getFullYear()) + " ( " + _date.getHours() + ":" + _date.getMinutes() + " " + _date.getTimezoneOffset() + " ) ")

    return new Date(date + offset * 3600 * 1000).toUTCString().replace(/ GMT$/, "")
  }

  componentWillMount() {


    // Load comments from firebase in realtime
    // then set in state
    let _date = new Date();
    comments.child(this.props.data.proposalID)
      .orderByChild('createdAt')
      .on('value', (item) => {
        let commentsObjs = item.val(),
          commentsArray = []

        for (var key in commentsObjs) {
          commentsObjs[key]._id = key;
          commentsArray.unshift(commentsObjs[key]);
        }

        this.setState({
          comments: commentsArray
        }, () => {
          this.loadReplies(0);
        });
      });
  }

  // load replies
  loadReplies(index) {
    if (this.state.comments.length > index) {
      let _commentId = this.state.comments[index]._id,
        _comments = Object.assign(this.state.comments);

      commentReplies.child(_commentId).on('value', (item) => {
        let _replies = item.val(),
          _repliesArray = [];
        _comments[index].replies = [];
        if (index >= 0) {
          for (var key in _replies) {
            _comments[index].replies.push(_replies[key])
          }
          this.setState({ comments: _comments }, () => {
            this.loadReplies(index + 1);
          });
        }
      })
    }
  }

  renderReplies(replies) {
    return (
      replies.map((reply, key) => {
        return (
          <Grid container md={11} className="allReplies" key={key}>
            <Grid container md={12} className="replyHeading">
              <Grid item md={8} className="replyUserVeiw">
                <span className="replyUserName">
                  {' '} {reply.createdBy.name} {' '}
                </span>
                <div className="replyDate">{this.generateDate(reply.createdAt)}</div>
              </Grid>
            </Grid>
            <Grid item md={12} className="commentlHrView">
              <hr className="hr" />
            </Grid>
            <Grid item md={10} className="newYearView">
              {' '}
              {reply.message}
            </Grid>
          </Grid>
        )
      })

    )
  }



  setComment(e) {
    this.setState({
      userComment: e.target.value
    })
  }

  addReply(commentID) {
    let date = new Date;
    let _replyObj = {
      createdBy: {
        name: this.props.user.displayName,
        uid: this.props.user.uid,
      },
      createdAt: date.getTime(),
      updatedAt: date.getTime(),
      message: this.state.userReply,
    }
    commentReplies.child(commentID).push(_replyObj, () => {
      console.log('Successfully Reply');
    })
    this.setState({
      userReply: ''
    })
  }

  setReply(e) {
    this.setState({
      userReply: e.target.value
    })
  }


  addComment() {
    console.log("Comment", this.state.userComment)
    let date = new Date
    let _comment = {
      createdBy: {
        name: this.props.user.displayName,
        uid: this.props.user.uid,
      },
      createdAt: date.getTime(),
      updatedAt: date.getTime(),
      voteUpBy: [],
      voteDownBy: [],
      message: this.state.userComment,
      replies: []

    }
    console.log("New Comment", _comment)
    comments.child(this.state.proposalID).push(_comment, () => {
      console.log('Success')
    })
    this.setState({
      userComment: ''
    })
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

            <textarea rows="2" cols="75" className="userComment" defaultValue={this.state.userComment} onChange={this.setComment}>

            </textarea>
            <hr className="proposalDetailsHr" />

            <Button type="submit" color="primary" onClick={this.addComment}>
              Submit
            </Button>
          </Grid>
        </Grid>

        <Grid item md={9} className="section-separate">
          <hr className="separate-with-margin" />
        </Grid>


        {/* <Grid container md={10} className="topCommentWithReplyView">
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
              <textarea rows="1" cols="55" className="userComment">
                Having Fun ?
              </textarea>
              <hr className="proposalDetailsHr" />

              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button type="submit" color="primary">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid> */}

        {this.state.comments.map((comment, key) => {
          return (
            <Grid container md={10} className="topCommentWithReplyView">
              <Grid container md={12} className="commentHeading">
                <Grid item md={8} className="userView">
                  <span className="userName">
                    {' '}
                    {comment.createdBy.name}{' '}
                    <img
                      alt="a"
                      src={require('../../assets/img/png_icon_badge.png')}
                      className="badgeIcon"
                    />
                  </span>
                  <div className="commentDate">{this.generateDate(comment.createdAt)}</div>
                </Grid>
                <Grid item md={4} className="votesView">
                  <img
                    alt="a"
                    src={require('../../assets/img/png_button_up.png')}
                    className="upVoteICon"
                  />
                  <div className="votingNumber">{comment.voteUpBy ? comment.voteUpBy.length : 0}</div>
                  <img
                    alt="a"
                    src={require('../../assets/img/png_button_down.png')}
                    className="downVoteICon"
                  />
                  <div className="votingNumber">{comment.voteDownBy ? comment.voteDownBy.length : 0}</div>
                </Grid>
              </Grid>
              <Grid item md={12} className="commentlHrView">
                <hr className="hr" />
              </Grid>
              <Grid item md={10} className="newYearView">
                {' '}
                {comment.message}
              </Grid>
              {comment.replies ? this.renderReplies(comment.replies) : null
              }
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
                  <textarea rows="1" cols="55" className="userComment" defaultValue={this.state.userReply} onChange={this.setReply}>
                  </textarea>
                  <hr className="proposalDetailsHr" />

                  {/* <Button type="submit" color="primary" className="formSubmiButton"> */}
                  <Button onClick={() => this.addReply(comment._id)}> Submit </Button>
                  <Button > Cancel </Button>
                </Grid>
              </Grid>
            </Grid>
          )
        })}

      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.app.currentUser
  };
};

const dispatchToProps = dispatch => {
  return {};
};


export default connect(stateToProps, dispatchToProps)(withStyles(proposalCommentsStyle)(ProposalComments));
