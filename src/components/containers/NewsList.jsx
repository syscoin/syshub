import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

// import style
import { newsListStyle } from './styles';

import NewsCard from '../functionals/NewsCard';

class NewsList extends Component {
  render() {
    const { classes, selectNews, posts, readedList, deviceType } = this.props;
    console.log('ACZ --> ', posts);
    
    return (
      <div className={classes.root}>
        {posts.map((post, index) => {
          const readed = readedList.find(itm => itm === post.guid)
            ? true
            : false;

          return (
            <NewsCard
              deviceType={deviceType}
              readed={readed}
              key={index}
              index={index}
              post={post}
              selectNews={selectNews}
            />
          );
        })}
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
  return {};
};

NewsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(stateToProps, dispatchToProps)(
  injectSheet(newsListStyle)(NewsList)
);
