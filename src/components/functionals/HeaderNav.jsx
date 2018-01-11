/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
<<<<<<< HEAD
import PropTypes from 'prop-types';

//Import UI Framework components
import { Button } from 'antd';

//Import Styles
import { headerNavStyle } from './styles';

const ButtonGroup = Button.Group;

class HeaderNav extends Component {
  state = {
    currentUser: 'Guest',
  };
  render() {
    return (
      <div style={headerNavStyle.wraper}>
        <div style={headerNavStyle.common}>
          <span style={headerNavStyle.TxtRegular}>{`Welcome  `}</span>
          <span style={headerNavStyle.TxtBold}>{this.state.currentUser}</span>
        </div>
        <div style={headerNavStyle.common}>
          <ButtonGroup>
            <Button
              size={'large'}
              type="primary"
              ghost
              style={headerNavStyle.button}
            >
              <img
                src={require('../../assets/img/png_menu_chat.png')}
                height="30"
              />
            </Button>
            <Button
              size={'large'}
              type="primary"
              ghost
              style={headerNavStyle.button}
            >
              <img
                src={require('../../assets/img/png_menu_home.png')}
                height="30"
              />
            </Button>
            <Button
              size={'large'}
              type="primary"
              ghost
              style={headerNavStyle.button}
            >
              <img
                src={require('../../assets/img/png_menu_contact.png')}
                height="30"
              />
            </Button>
            <Button
              size={'large'}
              type="primary"
              ghost
              style={headerNavStyle.button}
            >
              <div style={headerNavStyle.common}>{`Login  `}</div>
            </Button>
          </ButtonGroup>
        </div>
=======
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { statusStyle } from './styles';
import actions from '../../redux/actions';
import { fire } from '../../firebase';

class HeaderStats extends Component {
  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.currentUser(user);
      }
    });
  }

  render() {
    const { currentUser } = this.props.app;

    return (
      <div style={statusStyle.wraper}>
        {currentUser ? currentUser.displayName || currentUser.email : 'Status'}
>>>>>>> 6-connect-the-app-with-firebase-backend-and-set-up-firebase-project
      </div>
    );
  }
}

<<<<<<< HEAD
export default HeaderNav;
=======
const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {
    currentUser: user => dispatch(actions.currentUser(user))
  };
};

export default connect(stateToProps, dispatchToProps)(HeaderStats);
>>>>>>> 6-connect-the-app-with-firebase-backend-and-set-up-firebase-project
