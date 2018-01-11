/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Import UI Framework components
import { Button } from 'antd';

//Import Styles
import { headerNavStyle } from './styles';

const ButtonGroup = Button.Group;

class HeaderStats extends Component {
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
      </div>
    );
  }
}

export default HeaderStats;
