import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';
import { Avatar } from 'antd';


// import style
import { newsHeaderStyle } from './styles'

// import components
import { Stats, WelcomeBox } from '../functionals';
class NewsHeader extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container className={classes.root}>
          <Grid md={12} className='new-header-grid'>
            {/* Cover Image */}
            <div className="cover">
              <img
                className="cover-img"
                src="https://www.cryptocoinsnews.com/wp-content/uploads/2016/09/Fb-cover2-X2-1440x548.png"
                alt="Cover Image" />
              <div className="info">
                <h2 className="title">Header Title</h2>
                <h3 className="sub-title">Header Subtitle</h3>
              </div>
            </div>
            
            {/* About Auther */}
            <div className="author">
              <Avatar shape="square" size="large" icon="user" />
              <div className="info">
                <h4 className="date">Posted on JAN 02,2016</h4>
                <h5 className='by'>by: Author</h5>
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

export default connect(stateToProps, dispatchToProps)(withStyles(newsHeaderStyle)(NewsHeader));
