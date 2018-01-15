/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import { doLogout } from '../../firebase';
import { withStyles } from 'material-ui';

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
    }
  }

  setPage(Page) {
    this.props.setPage(Page);
  }

  render() {
    const  classes  = this.props.classes;
    const { currentUser } = this.props.app;
    const { chatIcon } =  require('../../assets/img/png_menu_chat.png');
    const { homeIcon } = require('../../assets/img/png_menu_home.png');
    const { contectIcon } = require('../../assets/img/png_menu_contact.png');
    console.log(currentUser);
    return (
      <div className={classes.root}>
        <div className="common">
          <span className="TxtRegular">{`Welcome  `}</span>
          <span className="TxtBold">
            {currentUser
              ? currentUser.displayName || currentUser.email
              : 'Guest'}
          </span>
        </div>
        <div className="common">
          <ButtonGroup>
            <Button
              size={'large'}
              type="primary"
              ghost
              className="button"
              onClick={() => this.props.toggleChat()}
            >
              <img  src={chatIcon}  height="30" />
            </Button>
            <Button
              size={'large'}
              type="primary"
              ghost
              className="button"
              onClick={() => this.props.setPage('home')}
            >
              <img src={homeIcon}  height="30" />
            </Button>
            <Button

              size={'large'}
              type="primary"
              ghost
              className="button"
            >
              <img src={contectIcon} height="30" />
            </Button>
            {currentUser ? (
              <Button
                size={'large'}
                type="primary"
                ghost
                className="button"
                onClick={() => this.doLogout()}
              >
                <div className={headerNavStyle.common}>Logout</div>
              </Button>
            ) : (
              <Button
                size={'large'}
                type="primary"
                ghost
                className="button"
                onClick={() => this.setPage('login')}
              >
                <div className="common">Login</div>
              </Button>
            )}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app,
  };
};

const dispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(actions.doLogout()),
    setPage: page => dispatch(actions.setPage(page)),
    toggleChat: page => dispatch(actions.toggleChat()),
  };
};


HeaderNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(stateToProps, dispatchToProps)(withStyles(headerNavStyle)(HeaderNav));

