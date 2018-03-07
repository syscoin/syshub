/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import { doLogout } from '../../API/firebase';
import { Grid, withStyles } from 'material-ui';

//Import UI Framework components
import { Button } from 'antd';

//Import Styles
import { headerNavStyle } from './styles';

const ButtonGroup = Button.Group;

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
    const chatIcon = require('../../assets/img/png_menu_chat.png');
    return (
      <Grid item container md={5} className={classes.root}>
        <Grid item className="common">
          <span className="TxtRegular">{`Welcome  `}</span>
          <span className="TxtBold">
            {currentUser ? currentUser.displayName || currentUser.email : 'Guest'}
          </span>
        </Grid>
        <Grid item className="common">
          <ButtonGroup>
            <Button
              size={'large'}
              type="primary"
              ghost
              className="button"
              onClick={() => this.props.toggleChat()}
            >
              <img src={chatIcon} alt="chat icon" height="30" />
            </Button>

            {currentUser ? (
              <Button
                size="large"
                type="primary"
                ghost
                className="button logout-btn"
                onClick={() => this.doLogout()}
              >
                <div className="common">Logout</div>
              </Button>
            ) : (
                <Button
                  size="large"
                  type="primary"
                  ghost
                  className="button login-btn"
                  onClick={() => this.props.setPage('login')}
                >
                  <div className="common">Login</div>
                </Button>
              )}
          </ButtonGroup>
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

export default connect(stateToProps, dispatchToProps)(withStyles(headerNavStyle)(HeaderNav));
