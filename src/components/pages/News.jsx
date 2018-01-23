import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid, withStyles } from 'material-ui';
import { Icon } from 'antd';
import Paper from 'material-ui/Paper';
import NewsList from '../containers/NewsList';
import NewsDetial from '../functionals/NewsDetail';

// import style
import { newsStyle } from './styles';

// import components
import { Stats, WelcomeBox } from '../functionals';
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContainer: 'list',
      newID: '',
    };
    this.handleSelectNews = this.handleSelectNews.bind(this);
  }
  //changing state with this function
  handleSelectNews(value) {
    const container = this.state.showContainer === 'list' ? 'details' : 'list';
    this.setState({
      showContainer: container,
      newID: value,
    });
  }

  render() {
    const { classes, app } = this.props;
    // console.log('News -> Props:', this.props.app.showPage);
    return (
      <div className={classes.root}>
        <h1 className="title">NEWS AND ANNOUNCEMENTS </h1>
        {this.state.showContainer === 'details' && (
          <div className="iconWraper" onClick={() => this.handleSelectNews()}>
            <Icon type="backward" className="icon" />
            <span className="iconTxt">{`  Back to List`}</span>
          </div>
        )}
        <Paper className="paper-container" elevation={4}>
          {
            {
              list: <NewsList selectNews={this.handleSelectNews} />,
              details: <NewsDetial />,
            }[this.state.showContainer]
          }
        </Paper>{' '}
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
  withStyles(newsStyle)(News)
);
