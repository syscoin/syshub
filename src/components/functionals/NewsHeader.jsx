import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Avatar } from 'antd';

// import style
import injectSheet from 'react-jss';
import { newsHeaderStyle } from './styles';

class NewsHeader extends Component {
  render() {
    const { classes, header, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div>
        <Grid container className={style}>
          <Grid className="new-header-grid">
            {/* Cover Image */}
            <div className="cover">
              <img
                className="cover-img"
                src={header.image}
                //'https://www.cryptocoinsnews.com/wp-content/uploads/2016/09/Fb-cover2-X2-1440x548.png'
                //'https://cdn-images-1.medium.com/max/1024/1*YqNm0p75A84qf7szszQGEQ.png'
                alt="Cover"
              />
            </div>
            <div className="info">
              <h2 className="title">{header.title}</h2>
            </div>

            {/* About Auther */}
            <div className="author">
              <Avatar
                shape="square"
                size="large"
                icon="user"
                src={header.avatar}
              />
              <div className="info">
                <p className="date">{`Posted on ${header.pubDate}`}</p>
                <h5 className="by">{`by: ${header.name}`}</h5>
              </div>
            </div>
          </Grid>
        </Grid>
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
  injectSheet(newsHeaderStyle)(NewsHeader)
);
