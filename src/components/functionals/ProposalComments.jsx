/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



//import antd components
import { Divider, Pagination } from 'antd';
import { Grid, Button, FormGroup, Input, withStyles } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import Icon from 'material-ui/Icon';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import CommentForm from './commentForm';

// import firebase
import { fire, comments, commentReplies } from '../../API/firebase';

import { proposalCommentsStyle } from './styles';

class ProposalComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userComment: '',
      userReply: '',
      proposalID: this.props.data.proposalID,
      allComments: [],
      proposal: null,
      editCommentState: false,
      userEditComment: '',
      selectedCommentID: null,
      showAddComment: false
    };
    this.commentsCounts = 0;
    this.addComment = this.addComment.bind(this);
    this.setComment = this.setComment.bind(this);
    this.renderReplies = this.renderReplies.bind(this);
    this.generateDate = this.generateDate.bind(this);
    this.loadReplies = this.loadReplies.bind(this);
    this.addReply = this.addReply.bind(this);
    this.setReply = this.setReply.bind(this);
    this.voteForComment = this.voteForComment.bind(this);
    this.voteCount = this.voteCount.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setComment = this.setComment.bind(this);
    this.editedComment = this.editedComment.bind(this);
    this.setEditComment = this.setEditComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.showAddReplyBtn = this.showAddReplyBtn.bind(this);
  }


  // @params date: It will be number which represent data in string like (253453453245)
  // @method generateDate: It will convert date to readable date
  generateDate(date) {
    let today = new Date(),
      offset = -(today.getTimezoneOffset() / 60);
    return new Date(date + offset * 3600 * 1000).toUTCString().replace(/ GMT$/, "")
  }

  componentWillMount() {

    let proposal = this.props.proposals.find((proposal) => { return proposal.Hash == this.props.data.proposalID })
    if (proposal) {
      this.setState({ proposal })
    }
    // Load comments from firebase in realtime
    // then set in state
    let _date = new Date();

    comments.child(this.props.data.proposalID)
      .orderByChild('createdAt')
      .on('value', (item) => {
        let commentsObjs = item.val(),
          commentsArray = [];
        console.log("commentsObjs", commentsObjs)
        for (var key in commentsObjs) {
          commentsObjs[key]._id = key;
          commentsObjs[key].showAddReply = false;
          commentsArray.unshift(commentsObjs[key]);
        }
        this.commentsCounts = commentsArray.length;
        console.log('commentsCounts', this.commentsCounts)
        this.setState({
          allComments: commentsArray
        }, () => {
          this.loadReplies(0);
          this.commentsLimit = this.commentsLimit;
        });
      });
  }

  // load replies
  loadReplies(index) {
    if (this.state.allComments.length > index) {
      let _commentId = this.state.allComments[index]._id,
        _comments = Object.assign(this.state.allComments);

      commentReplies.child(_commentId).on('value', (item) => {
        let _replies = item.val(),
          _repliesArray = [];
        _comments[index].replies = [];
        if (index >= 0) {
          for (var key in _replies) {
            _comments[index].replies.push(_replies[key])
          }
          this.setState({ allComments: _comments }, () => {
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

  addReply(commentID, message) {
    if (this.props.user && message.length > 0) {
      let date = new Date;
      let _replyObj = {
        createdBy: {
          name: this.props.user.displayName,
          uid: this.props.user.uid,
        },
        createdAt: date.getTime(),
        updatedAt: date.getTime(),
        message: message,
      }
      commentReplies.child(commentID).push(_replyObj, () => {
        console.log('Successfully Reply');
        this.showAddReplyBtn(commentID, false);
      })
      this.setState({
        userReply: ''
      })
    }

  }

  setReply(e) {
    this.setState({
      userReply: e.target.value
    })
  }


  addComment() {
    console.log("Comment", this.state.userComment)
    if (this.state.userComment && this.props.user) {
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
        replies: [],
        isEdited: false

      }
      console.log("New Comment", _comment)
      comments.child(this.state.proposalID).push(_comment, () => {
        console.log('Success')
        this.setState({ showAddComment: false })
      })
      this.setState({
        userComment: ''
      })
    }

  }

  voteForComment(action, commentID) {
    if (this.props.user) {
      let itemIndex = null,
        _item;

      itemIndex = this.state.allComments.map((_item) => {
        return _item._id;
      }).indexOf(commentID);

      if (itemIndex > -1) {
        _item = Object.assign(this.state.allComments[itemIndex]);
        let date = new Date();
        _item.updatedAt = date.getTime();
        if (!_item.votes) {
          _item.votes = [{
            by: {
              name: this.props.user.displayName,
              uid: this.props.user.uid,
            },
            action: action
          }];
        } else {
          let _voteIndex = _item.votes.map((__item) => {
            return __item.by.uid;
          }).indexOf(this.props.user.uid);
          if (_voteIndex > -1) {
            _item.votes[_voteIndex].action = action;
          }
        }
        comments.child(this.props.data.proposalID).child(commentID).set(_item);
      }
    }

  }

  voteCount(_for, _array) {
    let counts = 0;
    if (_array) {
      _array.forEach((_item) => {
        if (_item.action == _for) {
          counts++
        }
      })

    }
    return counts;
  }

  setEditComment(e) {
    this.setState({ userEditComment: e.target.value })
  }

  editedComment(id, message) {
    this.setState({ editCommentState: !this.state.editCommentState, selectedCommentID: id, userEditComment: message });
  }

  editComment(id) {
    var editedCommentObj,
      editCommentID, date = new Date;
    this.state.allComments.map((comment, key) => {
      if (id == comment._id) {
        comment.message = this.state.userEditComment
        editCommentID = comment._id;
        comment.updatedAt = date.getTime();
        comment.isEdited = true;
        delete comment._id;
        delete comment.showAddReply;
        editedCommentObj = comment;
      }
    })
    comments.child(this.props.data.proposalID).child(editCommentID).set(editedCommentObj);
    this.setState({ editCommentState: !this.state.editCommentState })
    console.log("editedCommentObj", editedCommentObj)
  }

  deleteComment(id) {
    comments.child(this.state.proposalID).child(id).remove();
  }


  changePage(page, pageSize) {
    console.log("page", page, "pageSize", pageSize)
  }

  showAddReplyBtn(_commentID, showAddReply) {
    let allComments = this.state.allComments.map((comment) => {
      if (comment._id == _commentID) {
        comment.showAddReply = showAddReply;
        console.log(comment);
        return comment;
      }
      return comment
    })
    console.log(allComments);
    this.setState({ allComments })
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
        {this.state.showAddComment ?
          <Grid container md={8} className="commentSectionslView">
            <Grid item md={12} className="commentHeading">
              Add Comment
          </Grid>
            <Grid item md={12} className="proposalDetails">
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus eleifend velit, et dapibus nulla interdum tempor. */}

              <textarea rows="2" cols="75" className="userComment" value={this.state.userComment} onChange={this.setComment}>

              </textarea>
              <hr className="proposalDetailsHr" />
              <Button type="submit" color="primary" onClick={this.addComment}>
                Submit
              </Button>
              <Button color="primary" onClick={() => { this.setState({ showAddComment: false }) }} >
                Cancel
              </Button>
            </Grid>
          </Grid>
          :
          <Button className="add-comment-btn" color="primary" onClick={() => { this.setState({ showAddComment: true }) }}>
            Add Comment
          </Button>
        }

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

        {this.state.allComments.map((comment, key) => {
          return (
            <Grid container md={10} className="topCommentWithReplyView" key={comment._id}>
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
                    onClick={() => { this.voteForComment('up', comment._id) }}
                  />
                  <div className="votingNumber">{this.voteCount('up', comment.votes)}</div>
                  <img
                    alt="a"
                    src={require('../../assets/img/png_button_down.png')}
                    className="downVoteICon"
                    onClick={() => { this.voteForComment('down', comment._id) }}
                  />
                  <div className="votingNumber">{this.voteCount('down', comment.votes)}</div>
                </Grid>
              </Grid>
              <Grid item md={12} className="commentlHrView">
                <hr className="hr" />
              </Grid>
              {this.state.editCommentState && this.state.selectedCommentID == comment._id ?
                <Grid container md={8} className="commentSectionslView">
                  <Grid item md={12} className="commentHeading">
                    Edited Comment
                  </Grid>
                  <Grid item md={12} className="proposalDetails">
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus eleifend velit, et dapibus nulla interdum tempor. */}

                    <textarea rows="2" cols="75" className="userComment" value={this.state.userEditComment} onChange={this.setEditComment}>

                    </textarea>
                    <hr className="proposalDetailsHr" />
                    <Button type="submit" color="primary" onClick={() => this.editComment(comment._id)}>
                      Submit
                    </Button>
                    <Button color="primary" onClick={() => { this.setState({ editCommentState: !this.state.editCommentState }) }}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
                :
                <Grid item md={8} className="newYearView">
                  {' '}
                  {comment.message}
                  {this.props.user && this.props.user.uid === comment.createdBy.uid ?
                    <Grid className="edit-delete-btn">
                      <EditIcon onClick={() => { this.editedComment(comment._id, comment.message) }} />
                      <DeleteIcon onClick={() => { this.deleteComment(comment._id) }} />
                    </Grid> : null}
                  {comment.isEdited ?
                    <Button color="primary" className="show-edited">
                      Edited
                    </Button> : null}

                </Grid>

              }

              {comment.replies ? this.renderReplies(comment.replies) : null
              }
              <Grid item md={10} className="replyView" onClick={() => { this.showAddReplyBtn(comment._id, true) }}>
                {' '}
                Reply
              </Grid>
              {comment.showAddReply ?
                // <Grid container md={8} className="topcommentSectionslView">
                //   <Grid item md={12} className="commentHeading">
                //     Enter Reply
                //   </Grid>

                //   <Grid item md={12} className="proposalDetails">
                //     {/* Having Fun ? */}
                //     <textarea rows="1" cols="55" className="userComment" value={this.state.userReply} onChange={this.setReply}>
                //     </textarea>
                //     <hr className="proposalDetailsHr" />

                //     {/* <Button type="submit" color="primary" className="formSubmiButton"> */}
                //     <Button onClick={() => this.addReply(comment._id)}> Submit </Button>
                //     <Button onClick={() => { this.showAddReplyBtn(comment, false) }}> Cancel </Button>
                //   </Grid>
                // </Grid>
                <CommentForm comment={comment} add={this.addReply} cancel={this.showAddReplyBtn} />
                : null}
            </Grid>
          )
        })}
        <Grid className="pagination" md={10}>
          <Pagination defaultCurrent={1} total={this.commentsCounts} onChange={(page, pageSize) => { this.changePage(page, pageSize) }} />
        </Grid>
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.app.currentUser,
    proposals: state.proposals.list
  };
};

const dispatchToProps = dispatch => {
  return {};
};


export default connect(stateToProps, dispatchToProps)(withStyles(proposalCommentsStyle)(ProposalComments));
