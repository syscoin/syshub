/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Grid, Button, withStyles, Typography } from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import swal from 'sweetalert';


import actions from '../../redux/actions';
import CommentForm from './commentForm';

// import firebase
import { comments, commentReplies, commentReplies_V2 } from '../../API/firebase';

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
    // this.renderReplies = this.renderReplies.bind(this);
    this.generateDate = this.generateDate.bind(this);
    this.loadReplies = this.loadReplies.bind(this);
    // this.addReply = this.addReply.bind(this);
    // this.setReply = this.setReply.bind(this);
    this.voteForComment = this.voteForComment.bind(this);
    this.voteCount = this.voteCount.bind(this);
    this.setComment = this.setComment.bind(this);
    this.editedComment = this.editedComment.bind(this);
    this.setEditComment = this.setEditComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    // this.showAddReplyBtn = this.showAddReplyBtn.bind(this);
    // this.openCommentBox = this.openCommentBox.bind(this);
    this.commentReply = this.commentReply.bind(this);
    this.generateChildCommentsStructure = this.generateChildCommentsStructure.bind(this);
    this.renderChild = this.renderChild.bind(this);
    //this.loadChild = this.loadChild.bind(this);
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
    // Load comments from firebase in realtime
    // then set in state

    comments.child(this.props.data.proposalID)
      .orderByChild('createdAt')
      .on('value', (item) => {
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
    if (this.state.allComments.length > index) {
      let _commentId = this.state.allComments[index]._id,
        _comments = Object.assign(this.state.allComments),
        _allReplies = null,
        _childReplies = []

      commentReplies_V2.child(_commentId).on('value', (item) => {
        let _allReplies = item.val();
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

  renderChild(commentId, childs) {
    debugger;
    if (childs) {
      for (var key in childs) {
        let _commentReplies = this.state.allReplies[commentId],
          _replyIndex = -1;
        console.log(this.state.allReplies);
        if(_commentReplies && _commentReplies.length>0){
          _replyIndex = _commentReplies.map((item) => {
            return item._id;
          }).indexOf(childs[key]);
        }


        if (_replyIndex > -1) {
          console.log(' || ---------- KEYS: --------------- || ', key)
          console.log(' || ---------- CHILD: --------------- || ', _commentReplies[_replyIndex].child)
          return <Row className="reply__container">
            <Col xs={24} className="reply__wrapper">
              {/* Intro */}
              <Col xs={24} className="intro__wrapper">
                <span className="user-name">
                  <b>{_commentReplies[_replyIndex].createdBy.name}</b>
                </span>
                <span className="date"> {this.generateDate(_commentReplies[_replyIndex].createdAt)} </span>
              </Col>
              {/* Message */}
              <Col className="message__wrapper">
                <p>{_commentReplies[_replyIndex].text}</p>
                {this.state.replyBox == _commentReplies[_replyIndex]._id ?
                  <CommentForm parent={_commentReplies[_replyIndex]._id} comment={{ _id: commentId }} add={this.commentReply} cancel={() => { this.setState({ replyBox: "" }) }} /> :
                  <Button className="btn-clear" onClick={() => this.setState({ replyBox: _commentReplies[_replyIndex]._id })}> Reply </Button>
                }
              </Col>
            </Col>
            {_commentReplies[_replyIndex] && _commentReplies[_replyIndex].child && this.renderChild(commentId, _commentReplies[_replyIndex].child)}
          </Row>
        } else {
          console.log("Render Child Break")
          return "";
        }

      }
    }
  }

  // loadChild(commentIndex, replyIndex){
  //   if(this.state.allComments > commentIndex){
  //     if(this.state.allComments[commentIndex].replies && this.state.allComments[commentIndex].replies.length > replyIndex){

  //     }else{
  //       this.loadChild(commentIndex+1, replyIndex+1)  
  //     }
  //   }else{
  //     this.loadChild(commentIndex+1, 0)
  //   }
  // }

  // loadReplies(count){
  //   let _replies = [],
  //       _index = this.state.allComments.map((item)=>{
  //         return item._id
  //       }).indexOf(comment._id);

  //     commentReplies_V2.child(comment._id).once('value', (items)=>{
  //       let _items = items.val();
  //       for(var key in _items){
  //         if(_items[key].isRoot){
  //           _replies.push(_items[key]);
  //         }
  //       }

  //       this.setState(...this.state.allComments[_index], {replies: _replies},()=>{
  //         console.log(this.state.allComments);
  //       });
  //     });
  // }

  // renderReplies(replies) {

  //   return (
  //     replies.map((reply, key) => {
  //       return (
  //         <Grid item container md={11} className="allReplies" key={key}>
  //           <Grid item container md={12} className="replyHeading">
  //             <Grid item md={8} className="replyUserVeiw">
  //               <span className="replyUserName">
  //                 {' '} {reply.createdBy.name} {' '}
  //               </span>
  //               <div className="replyDate">{this.generateDate(reply.createdAt)}</div>
  //             </Grid>
  //           </Grid>
  //           <Grid item md={12} className="commentlHrView">
  //             <hr className="hr" />
  //           </Grid>
  //           <Grid item md={10} className="newYearView">
  //             {' '}
  //             <Typography gutterBottom>{reply.message +" "+ reply.showReplyBox} </Typography>
  //             {this.renderNestedReply(reply)}

  //           </Grid>
  //         </Grid>
  //       )
  //     })

  //   )
  // }



  setComment(e) {
    this.setState({
      userComment: e.target.value
    })
  }

  // addReply(commentID, message) {
  //   if (this.props.user && message.length > 0) {
  //     let date = new Date();
  //     let _replyObj = {
  //       createdBy: {
  //         name: this.props.user.displayName,
  //         uid: this.props.user.uid,
  //       },
  //       createdAt: date.getTime(),
  //       updatedAt: date.getTime(),
  //       message: message,
  //     }
  //     commentReplies.child(commentID).push(_replyObj, () => {
  //       this.showAddReplyBtn(commentID, false);
  //     })
  //     this.setState({
  //       userReply: ''
  //     })
  //   }

  // }

  // setReply(e) {
  //   this.setState({
  //     userReply: e.target.value
  //   })
  // }



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
      console.log('Comment Reply Saved', e);
      if (parentKey) {
        commentReplies_V2.child(id + '/' + parentKey).child('child').push(_uniqueID);
      }
      this.setState({ replyBox: null });
    });

    // comments.child(this.props.data.proposalID).child(id).once('value',(item)=>{
    //   let _item = item.val(),
    //     _uniqueID = comments.push().key; 

    //     if(_item.replies == undefined){
    //     _item.replies = []; 
    //   }

    //   _item.replies.push({
    //     parent: parentKey,
    //     text: text,
    //     createdAt: new Date().getTime(),
    //     createdBy: {
    //       name: this.props.user.displayName,
    //       uid: this.props.user.uid,
    //     },
    //     id: _uniqueID
    //   });

    //   // -- Update Comment
    //   comments.child(this.props.data.proposalID).child(id).set(_item,()=>{
    //     console.log("Successfully Write Comment");
    //     this.setState({replyBox: null});
    //   });
    // });
  }

  // Render Child Object
  generateChildCommentsStructure(reply, comment) {
    if (reply && reply.length) {
      return reply.map((item) => {
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
              {this.state.replyBox == item._id ?
                <CommentForm parent={item._id} comment={comment} add={this.commentReply} cancel={() => this.setState({ replyBox: "" })} /> :
                <Button className="btn-clear" onClick={() => this.setState({ replyBox: item._id })}> Reply </Button>
              }
            </Col>

          </Col>
          {item.child && this.renderChild(comment._id, item.child)}
        </Row>
      });
    } else {
      return <div>
        {this.state.replyBox === comment._id ?
          <CommentForm
            comment={comment}
            add={this.commentReply}
            parent-key="null">
          </CommentForm> :
          <Button className="btn-clear" onClick={() => {
            this.setState({ replyBox: comment._id });
          }}>Reply</Button>
        }</div>
    }
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
            <Row item container md={10} className="topCommentWithReplyView" key={comment._id}>
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
                  {this.state.replyBox == comment._id ?
                    <CommentForm comment={comment} add={this.commentReply} cancel={() => this.setState({ replyBox: "" })} /> :
                    <Button className="btn-clear" onClick={() => this.setState({ replyBox: comment._id })}> Reply </Button>
                  }
                </Col>
              </Col>
              {/* <Grid item container md={12} className="commentHeading">
                <Grid item md={8} className="userView">
                  <span className="userName">
                    {' '} {comment.createdBy.name} {' '}
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
              </Grid> */}
              {/* {this.state.editCommentState && this.state.selectedCommentID === comment._id ?
                <Grid item container md={8} className="commentSectionslView">
                  <Grid item md={12} className="commentHeading">
                    Edited Comment
                  </Grid>
                  <Grid item md={12} className="proposalDetails">

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
                  <Typography gutterBottom>
                    {comment.message}
                  </Typography>

                  {this.props.user && this.props.user.uid === comment.createdBy.uid &&
                    <Grid className="edit-delete-btn">
                      <EditIcon onClick={() => { this.editedComment(comment._id, comment.message) }} />
                      <DeleteIcon onClick={() => { this.deleteComment(comment._id) }} />
                    </Grid>
                  }
                  {comment.isEdited && <Button color="primary" className="show-edited"> Edited </Button>}
                </Grid>
              } */}
              {this.generateChildCommentsStructure(comment.replies, comment)}
              {/* { comment.replies && this.renderReplies(comment.replies) } */}
              {/* <Grid item md={10} className="replyView" onClick={() => { this.showAddReplyBtn(comment._id, true) }}> {' '} Reply </Grid> */}
              {/* { comment.showAddReply && <CommentForm comment={ comment } add={ this.addReply } cancel={ this.showAddReplyBtn } />} */}
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


export default connect(stateToProps, dispatchToProps)(withStyles(proposalCommentsStyle)(ProposalComments));
