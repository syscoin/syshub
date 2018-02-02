import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';
import { Icon } from 'antd';
import Paper from 'material-ui/Paper';
import { NewsList, NewsDetail } from '../containers';

// import style
import { newsStyle } from './styles';

// import components
import { Stats, WelcomeBox } from '../functionals';
class News extends Component {
  state = {
    readedList: [],
    showContainer: 'list',
    post: '',
  };

  //changing state with this function
  handleSelectNews(value) {
    const { app, channel } = this.props;
    const container = this.state.showContainer === 'list' ? 'details' : 'list';
    const posts = channel.item;
    const post = posts.find(p => p.guid === value);
    if (value) {
      this.setState({
        readedList: [...this.state.readedList, value],
      });
    }
    this.setState({
      showContainer: container,
      post,
    });
  }

  render() {
    const { classes, app, channel } = this.props;
    return (
      <div className={classes.root}>
        <h1 className="title">NEWS AND ANNOUNCEMENTS </h1>
        {this.state.showContainer === 'details' && (
          <div className="iconWraper" onClick={() => this.handleSelectNews()}>
            {/* <Icon type="backward" className="icon" /> */}
            <Icon type="double-left" className="icon" />
            <span className="iconTxt">{`  Back to List`}</span>
          </div>
        )}
        <Paper className="paper-container" elevation={4}>
          {
            {
              list: (
                <NewsList
                  deviceType={this.props.deviceType}
                  channel={channel}
                  readedList={this.state.readedList}
                  selectNews={guid => this.handleSelectNews(guid)}
                />
              ),
              details: (
                <NewsDetail
                  deviceType={this.props.deviceType}
                  channel={channel}
                  post={this.state.post}
                  goBack={() => this.handleSelectNews()}
                />
              ),
            }[this.state.showContainer]
          }
        </Paper>{' '}
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    channel: state.mediumPosts.posts.channel,
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(newsStyle)(News)
);
