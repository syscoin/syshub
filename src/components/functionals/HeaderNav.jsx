/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../redux/actions';
import { fire } from '../../firebase';

//Import UI Framework components
import { Button } from 'antd';

//Import Styles
import { headerNavStyle } from './styles';

const ButtonGroup = Button.Group;

class HeaderNav extends Component {
  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  doLogout() {
    const { currentUser } = this.props.app;
    if (currentUser) {
      fire
        .auth()
        .signOut()
        .then(() => {
          this.props.doLogout();
        });
    }
  }

  render() {
    const { currentUser } = this.props.app;
    return (
      <div style={headerNavStyle.wraper}>
        <div style={headerNavStyle.common}>
          <span style={headerNavStyle.TxtRegular}>{`Welcome  `}</span>
          <span style={headerNavStyle.TxtBold}>
            {currentUser
              ? currentUser.displayName || currentUser.email
              : 'Guest'}
          </span>
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
              onClick={this.doLogout}
            >
              <div style={headerNavStyle.common}>
                {currentUser ? 'logout' : 'Login'}
              </div>
            </Button>
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
  };
};

export default connect(stateToProps, dispatchToProps)(HeaderNav);
