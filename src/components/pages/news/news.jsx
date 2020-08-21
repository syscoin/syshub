import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import injectSheet from 'react-jss';
import { Icon } from 'antd';
import { NewsList, NewsDetail } from '../../containers';

// import style
import newsStyle from './news.style';

class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      readedList: [],
      showContainer: 'list',
      postList: '',
      post: ''
    };
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentWillMount() {
    this.props.getMediumPosts();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.props.cancelAllXHR.source.cancel('cancel token');
  }

  scrollToBottom = () => {
    const detailContainer = ReactDOM.findDOMNode(this.detailContainer);
    detailContainer.scrollTop = detailContainer.scrollHeight;
  };

  sortPostsList(postsList) {
    if (postsList.length > 0) {
      const sortedList = postsList.sort((a, b) => {
        const aPubTime = new Date(a.pubDate).getTime();
        const bPubTime = new Date(b.pubDate).getTime();
        return bPubTime - aPubTime;
      });
      return sortedList;
    }
  }

  //changing state with this function
  handleSelectNews(value) {
    const { posts } = this.props;
    const container = this.state.showContainer === 'list' ? 'details' : 'list';
    const post = posts.find(p => p.guid === value);
    if (value) {
      this.setState({
        readedList: [...this.state.readedList, value]
      });
    }
    this.setState({
      showContainer: container,
      post
    });
  }

  render() {
    const { classes, posts, deviceType } = this.props;
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const sortedPosts = this.sortPostsList(posts);

    return (
      <div className={style} >
        <h1 className="title">NEWS AND ANNOUNCEMENTS</h1>
          <div className="iconWraper" onClick={() => this.handleSelectNews()}>
            {this.state.showContainer === 'details' && 
            <div>
              <Icon type="double-left" className="icon" />
              <span className="iconTxt">{`  Back to List`}</span>
            </div>
            }
            {this.state.showContainer !== 'details' && (<span className="iconTxtHide">{`  Back to List`}</span>)}
          </div>
       
          <div className="paper-container" ref={el => this.detailContainer = el}>
            { sortedPosts &&
              {
                list: (
                  <NewsList
                    deviceType={this.props.deviceType}
                    posts={sortedPosts}
                    readedList={this.state.readedList}
                    selectNews={guid => this.handleSelectNews(guid)}
                  />
                ),
                details: (
                  <NewsDetail
                    deviceType={this.props.deviceType}
                    post={this.state.post}
                    goBack={() => this.handleSelectNews()}
                  />
                )
              }[this.state.showContainer]
            }
          </div>
        
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    posts: state.mediumPosts.posts,
    cancelAllXHR: state.cancelXHR.cancelToken
  };
};

const dispatchToProps = dispatch => {
  return {
    getMediumPosts: () => dispatch(actions.getMediumPosts())
  };
};

export default connect(stateToProps, dispatchToProps)(
  injectSheet(newsStyle)(News)
);
