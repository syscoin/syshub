/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';

import { doLogout } from '../../../API/firebase';
import { Grid } from '@material-ui/core';

//Import Material-UI Framework components
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

//Import Styles
import injectSheet from 'react-jss';
import headerNavStyle from './headerNav.style';

// Imports Assets and more
import socialLinks from '../../../redux/constants/socialLinks';

// const chatIcon = require('../../../assets/img/png_menu_chat.png');



class HeaderNav extends Component {
  doLogout() {
    const { currentUser } = this.props.app;
    if (currentUser) {
      doLogout();
      this.props.doLogout();
    }
  }

  render() {
    const { classes } = this.props;

    const { currentUser } = this.props.app;
    return (
      <Grid item container md={5} className={classes.root}>
        <Grid item className="common">
          <span className="TxtRegular">{`Welcome  `}</span>
          <span className="TxtBold">
            {currentUser ? currentUser.displayName || currentUser.email : 'Guest'}
          </span>
        </Grid>
        <Grid item className="common">
          <div>
            {socialLinks.map( item => 
              <Tooltip key={item.name} title={item.name}>
                <IconButton  aria-label={item.name} className="socialChannel" href={item.link} target="_blank" rel="noopener noreferrer" >
                  <i className={item.icon}></i>
                </IconButton>
              </Tooltip>
            )}
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
                onClick={() => this.doLogout()}
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
    doLogout: () => dispatch(actions.doLogout()),
    setPage: page => dispatch(actions.setPage(page)),
    toggleChat: () => dispatch(actions.toggleChat())
  };
};

HeaderNav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(stateToProps, dispatchToProps)(injectSheet(headerNavStyle)(HeaderNav));
