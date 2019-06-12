/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

// Import provider HOC's
import { withFirebase } from '../../../providers/firebase';

import actions from '../../../redux/actions';

//Import Material-UI Framework components
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

//Import Styles
import injectSheet from 'react-jss';
import headerNavStyle from './headerNav.style';

// Imports Assets and more
import socialLinks from '../../../redux/constants/socialLinks';

// const chatIcon = require('../../../assets/img/png_menu_chat.png');

class HeaderNav extends Component {
  // add Firebase as global var in component
  firebase = this.props.firebase;

  logout() {
    const { app } = this.props;
    if (app.currentUser) {
      this.firebase.doSignOut();
      this.props.doAppLogout();
    }
  }

  showUserName(currentUser) {
    const nameMaxLength = 20;
    let userName = 'Guest';
    if (currentUser) {
      userName = currentUser.displayName || currentUser.email;
    }

    if (userName.length > nameMaxLength) {
      return (
        <Tooltip title={userName}>
          <span className="TxtBold">
            {`${userName.substring(0, nameMaxLength - 3)}...`}
          </span>
        </Tooltip>
      );
    }
    userName = `${userName.charAt(0).toUpperCase()}${userName.slice(1)}`;
    return <span className="TxtBold">{userName}</span>;
  }

  render() {
    const { classes } = this.props;
    const { currentUser } = this.props.app;

    return (
      <Grid item container md={5} className={classes.root}>
        <Grid item className="common">
          <span className="TxtRegular">{`Welcome  `}</span>
          {this.showUserName(currentUser)}
        </Grid>
        <Grid item className="common">
          <div>
            {socialLinks.map(item => (
              <Tooltip key={item.name} title={item.name}>
                <IconButton
                  aria-label={item.name}
                  className="socialChannel"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={item.icon} />
                </IconButton>
              </Tooltip>
            ))}
            {/* <Button
              size={'large'}
              type="primary"
              ghost
              className="button"
              onClick={() => this.props.toggleChat()}
            >
              <img src={chatIcon} alt="chat icon" height="30" />
            </Button> */}
            {currentUser ? (
              <Button
                size="large"
                type="primary"
                className="button logout-btn"
                onClick={() => this.logout()}
              >
                <div>Logout</div>
              </Button>
            ) : (
              <Button
                size="large"
                type="primary"
                className="button login-btn"
                onClick={() => this.props.setPage('login')}
              >
                <div>Login</div>
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {
    doAppLogout: () => dispatch(actions.doLogout()),
    setPage: page => dispatch(actions.setPage(page)),
    toggleChat: () => dispatch(actions.toggleChat())
  };
};

HeaderNav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withFirebase,
  connect(
    stateToProps,
    dispatchToProps
  ),
  injectSheet(headerNavStyle)
)(HeaderNav);
