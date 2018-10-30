import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import injectSheet from 'react-jss';
import { Icon } from 'antd';
import Paper from '@material-ui/core/Paper';
import { NewsList, NewsDetail } from '../containers';

// import style
import { newsStyle } from './styles';

class News extends Component {
  state = {
    readedList: [],
    showContainer: 'list',
    post: ''
  };
  componentWillMount() {
    this.props.getMediumPosts();
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
    return (
      <div className={style}>
        <h1 className="title">NEWS AND ANNOUNCEMENTS</h1>
        {this.state.showContainer === 'details' && (
          <div className="iconWraper" onClick={() => this.handleSelectNews()}>
            <Icon type="double-left" className="icon" />
            <span className="iconTxt">{`  Back to List`}</span>
          </div>
        )}
        {posts && (
          <Paper className="paper-container" elevation={4}>
            {
              {
                list: (
                  <NewsList
                    deviceType={this.props.deviceType}
                    posts={posts}
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
          </Paper>
        )}
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    posts: state.mediumPosts.posts
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
