import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';

// import style
import { newsDetailStyle } from './styles';

// import components
import {
  Stats,
  WelcomeBox,
  NewsHeader,
  NewsBody,
  NewsAbout,
  NewsFooter,
} from '../functionals';

const splitContent = content => {
  const image = content
    .slice(0, content.indexOf('" /></figure>'))
    .split('<figure><img alt="" src="')[1];
  //const image = splited[0].split('<figure><img alt="" src="')[1];
  const body = content.slice(content.indexOf('<p>'));
  const HTMLParser = new DOMParser();
  const bodyA = HTMLParser.parseFromString(bodyA, 'text/html');
  return { image, body };
};

class NewsDetail extends Component {
  render() {
    const { classes, post, channel, goBack } = this.props;
    const splittedContent = splitContent(post['content:encoded']);
    const header = {
      image: splittedContent.image,
      avatar: channel.image.url,
      name: post['dc:creator'],
      pubDate: post.pubDate.slice(0, -12),
      title: post.title,
    };
    const body = splittedContent.body;
    const about = {
      avatar: channel.image.url,
      text: channel.description,
    };
    return (
      <div className={classes.root}>
        <NewsHeader header={header} />
        <NewsBody body={body} />
        <NewsAbout about={about} />
        <NewsFooter goBack={goBack} />
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(newsDetailStyle)(NewsDetail)
);
