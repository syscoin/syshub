/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Grid, Button, Typography } from '@material-ui/core';
import swal from 'sweetalert';


import actions from '../../redux/actions';
import CommentForm from './commentForm';

// import firebase
import { comments, commentReplies, commentReplies_V2 } from '../../API/firebase';

import injectSheet from 'react-jss';
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
      showAddComment: false,
      allReplies: {},
      replyBox: '' // replybox Id
    };
    this.commentsCounts = 0;
    this.addComment = this.addComment.bind(this);
    this.setComment = this.setComment.bind(this);
    this.generateDate = this.generateDate.bind(this);
    this.loadReplies = this.loadReplies.bind(this);
    this.voteForComment = this.voteForComment.bind(this);
    this.voteCount = this.voteCount.bind(this);
    this.setComment = this.setComment.bind(this);
    this.editedComment = this.editedComment.bind(this);
    this.setEditComment = this.setEditComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.commentReply = this.commentReply.bind(this);
    this.generateChildCommentsStructure = this.generateChildCommentsStructure.bind(this);
    this.renderChild2 = this.renderChild2.bind(this);
    this.loadComments = this.loadComments.bind(this);
    this.refreshComments = this.refreshComments.bind(this);
  }


  // @params date: It will be number which represent data in string like (253453453245)
  // @method generateDate: It will convert date to readable date
  generateDate(date) {
    let today = new Date(),
      offset = -(today.getTimezoneOffset() / 60);
    return new Date(date + offset * 3600 * 1000).toUTCString().replace(/ GMT$/, "")
  }

  componentWillMount() {

    let proposal = this.props.proposals.find((proposal) => { return proposal.Hash === this.props.data.proposalID })
    if (proposal) {
      this.setState({ proposal })
    }
    this.loadComments();
  }

  refreshComments() {
    this.loadComments();
  }

  // load Comments
  loadComments() {
    // Load comments from firebase
    // then set in state

    comments.child(this.props.data.proposalID)
      .orderByChild('createdAt')
      .once('value', (item) => {
        let commentsObjs = item.val(),
          commentsArray = [];
        for (var key in commentsObjs) {
          commentsObjs[key]._id = key;
          commentsObjs[key].showAddReply = false;
          commentsArray.unshift(commentsObjs[key]);
        }
        this.commentsCounts = commentsArray.length;
        this.setState({
          allComments: commentsArray
        }, () => {
          this.loadReplies(0);
          //this.commentsLimit = this.commentsLimit;
        });
      });
  }

  // load replies
  loadReplies(index) {
    // Load replies from firebase
    // then set in state

    if (this.state.allComments.length > index) {
      let _commentId = this.state.allComments[index]._id,
        _comments = Object.assign(this.state.allComments),
        _childReplies = []

      commentReplies_V2.child(_commentId).once('value', (item) => {
        let _allReplies = item.val();

        this.setState({ allRepliesRaw: _allReplies });

        _comments[index].replies = [];
        if (index >= 0) {
          for (var key in _allReplies) {
            _allReplies[key]._id = key;
            if (_allReplies[key].isRoot) {
              _comments[index].replies.push(_allReplies[key]);
            } else {
              _childReplies.push(_allReplies[key]);
            }
          }
          this.setState({
            allComments: _comments,
            allReplies: { ...this.state.allReplies, [_commentId]: _childReplies }
          }, () => {
            this.loadReplies(index + 1);
          });
        }
      })
    }
  }

  setComment(e) {
    this.setState({
      userComment: e.target.value
    })
  }

  addComment() {
    if (this.state.userComment && this.props.user) {
      let date = new Date();
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
      comments.child(this.state.proposalID).push(_comment, () => {
        this.setState({ showAddComment: false })
      })
      this.setState({
        userComment: ''
      }, () => this.refreshComments());
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
          else {
            var newVote = {
              by: {
                name: this.props.user.displayName,
                uid: this.props.user.uid,
              },
              action: action
            }
            _item.votes.push(newVote);
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
        if (_item.action === _for) {
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
      editCommentID, date = new Date();
    this.state.allComments.map((comment, key) => {
      if (id === comment._id) {
        comment.message = this.state.userEditComment
        editCommentID = comment._id;
        comment.updatedAt = date.getTime();
        comment.isEdited = true;
        delete comment._id;
        delete comment.showAddReply;
        editedCommentObj = comment;
      }
      return id;
    })
    comments.child(this.props.data.proposalID).child(editCommentID).set(editedCommentObj);
    this.setState({ editCommentState: !this.state.editCommentState })
  }

  deleteComment(id) {
    comments.child(this.state.proposalID).child(id).remove().then(() => {
      commentReplies.child(id).remove();
    });
  }

  showAddReplyBtn(_commentID, showAddReply) {
    if (this.props.user) {
      let allComments = this.state.allComments.map((comment) => {
        if (comment._id === _commentID) {
          comment.showAddReply = showAddReply;
          return comment;
        }
        return comment
      })
      this.setState({ allComments })
    } else {
      this.loginAlert();
    }
  }

  openCommentBox() {
    if (this.props.user) {
      this.setState({ showAddComment: true });
    } else {
      this.loginAlert();
    }
  }

  loginAlert() {
    swal({
      title: "Are You Login?",
      text: "Please Login first to add Comment",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.setPage('login')
        } else {
          // swal("Your imaginary file is safe!");
        }
      });
  }



  // -- Method call on reply Layer1
  commentReply(id, text, parentKey) {
    let _uniqueID = comments.push().key,
      _replyObject = {
        text: text,
        createdAt: new Date().getTime(),
        createdBy: {
          name: this.props.user.displayName,
          uid: this.props.user.uid,
        },
        child: [],
        isRoot: parentKey ? false : true
      }

    commentReplies_V2.child(id + '/' + _uniqueID).set(_replyObject, (e) => {
      if (parentKey) {
        commentReplies_V2.child(id + '/' + parentKey).child('child').push(_uniqueID);
      }
      this.setState({ replyBox: null }, () => this.refreshComments());
    });
  }

  // Render Child Object
  generateChildCommentsStructure(reply, comment) {
    if (reply && reply.length) {
      return reply.map((item, i) => {
        return <Row key={item._id} className="reply__container">
          <Col xs={24} className="reply__wrapper">
            {/* Intro */}
            <Col xs={24} className="intro__wrapper">
              <span className="user-name">
                <b>{item.createdBy.name}</b>
              </span>
              <span className="date"> {this.generateDate(item.createdAt)} </span>
            </Col>
            {/* Message */}
            <Col className="message__wrapper">
              <p>{item.text}</p>
              {this.state.replyBox === item._id ?
                <CommentForm parent={item._id} comment={comment} add={this.commentReply} cancel={() => this.setState({ replyBox: "" })} /> :
                <Button className="btn-clear" onClick={() => this.setState({ replyBox: item._id })}> Reply </Button>
              }
            </Col>

          </Col>
          {item.child && this.renderChild2(comment._id, item.child)}
        </Row>
      });
    }
  }

  renderChild2(commentId, childs) {
    const replies = this.state.allReplies[commentId];
    const childsId = Object.values(childs);
    const filteredReplies = replies.filter((item0) => childsId.find((item1) => item1 === item0._id));

    return filteredReplies.map((reply) => (
      <Row className="reply__container" key={reply._id}>
        <Col xs={24} className="reply__wrapper">
          {/* Intro */}
          <Col xs={24} className="intro__wrapper">
            <span className="user-name">
              <b>{reply.createdBy.name}</b>
            </span>
            <span className="date"> {this.generateDate(reply.createdAt)} </span>
          </Col>
          {/* Message */}
          <Col className="message__wrapper">
            <p>{reply.text}</p>
            {this.state.replyBox === reply._id ?
              <CommentForm parent={reply._id} comment={{ _id: commentId }} add={this.commentReply} cancel={() => { this.setState({ replyBox: "" }) }} /> :
              <Button className="btn-clear" onClick={() => this.setState({ replyBox: reply._id })}> Reply </Button>
            }
          </Col>
        </Col>
        {reply.child && this.renderChild2(commentId, reply.child)}
      </Row>
    ));
  }

  render() {
    const { classes, deviceType } = this.props;

    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid item md={12} className={style}>
        <Grid item className="commentHeadingDiv">
          <div className="heading">

            <Typography variant="headline" gutterBottom>
              COMMENTS SECTION
            </Typography>

          </div>
        </Grid>
        <Grid item md={11} className="section-separate">
          <hr />
        </Grid>
        {this.state.showAddComment ?
          <Grid item container md={8} className="commentSectionslView">
            <Grid item md={12} className="commentHeading">
              Add Comment
            </Grid>
            <Grid item md={12} className="proposalDetails">

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
          <Button className="add-comment-btn" color="primary" onClick={() => this.openCommentBox()}>
            Add Comment
          </Button>
        }

        <Grid item md={9} className="section-separate">
          <hr className="separate-with-margin" />
        </Grid>

        {this.state.allComments.map((comment, key) => {
          return (
            <Row item="true" container="true" md={10} className="topCommentWithReplyView" key={comment._id}>
              <Col xs={24} className="reply__wrapper">
                {/* Intro */}
                <Col xs={24} className="intro__wrapper">
                  <span className="user-name">
                    <b>{comment.createdBy.name}</b>
                  </span>
                  <span className="date"> {this.generateDate(comment.createdAt)} </span>
                  <Col className="votes-view">
                    <div className="wrapper">
                      <img
                        alt="up"
                        src={require('../../assets/img/png_button_up.png')}
                        onClick={() => { this.voteForComment('up', comment._id) }}
                      />
                      <p className="count">{this.voteCount('up', comment.votes)}</p>
                    </div>
                    <div className="wrapper">
                      <img
                        alt="down"
                        src={require('../../assets/img/png_button_down.png')}
                        onClick={() => { this.voteForComment('down', comment._id) }}
                      />
                      <p className="count">{this.voteCount('down', comment.votes)}</p>
                    </div>
                  </Col>
                </Col>
                {/* Message */}
                <Col className="message__wrapper">
                  <p>{comment.message}</p>
                  {this.state.replyBox === comment._id ?
                    <CommentForm comment={comment} add={this.commentReply} cancel={() => this.setState({ replyBox: "" })} /> :
                    <Button className="btn-clear" onClick={() => this.setState({ replyBox: comment._id })}> Reply </Button>
                  }
                </Col>
              </Col>
              {this.generateChildCommentsStructure(comment.replies, comment)}
            </Row>
          )
        })}
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
  return {
    setPage: page => dispatch(actions.setPage(page)),
  };
};


export default connect(stateToProps, dispatchToProps)(injectSheet(proposalCommentsStyle)(ProposalComments));
