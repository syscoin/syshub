import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';
import { Avatar } from 'antd';

// import style
import { newsHeaderStyle } from './styles';

// import components
import { Stats, WelcomeBox } from '../functionals';
class NewsHeader extends Component {
  render() {
    const { classes, header, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div>
        <Grid container className={style}>
          <Grid md={12} className="new-header-grid">
            {/* Cover Image */}
            <div className="cover">
              <img
                alt="a"
                className="cover-img"
                src={header.image}
                //'https://www.cryptocoinsnews.com/wp-content/uploads/2016/09/Fb-cover2-X2-1440x548.png'
                //'https://cdn-images-1.medium.com/max/1024/1*YqNm0p75A84qf7szszQGEQ.png'

                alt="Cover Image"
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
  withStyles(newsHeaderStyle)(NewsHeader)
);
