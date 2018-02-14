/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mHeaderNavStyle } from './styles';
import injectSheet from 'react-jss';
import { Grid } from 'material-ui';
import { Icon } from 'antd';
import { Button } from 'antd';
import IconButton from 'material-ui/IconButton';
import actions from '../../redux/actions';

class MHeaderNav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.itemClick = this.itemClick.bind(this);
  }

  itemClick(e) {
    this.props.setPage(e.target.id);
  }

  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const chatIcon = require('../../assets/img/png_menu_chat.png');
    const logo = require('../../assets/img/png_logo_white.png');
    return (
      <Grid container className={style}>
        <Grid
          item
          xs={3}
          className="left-section"
          style={
            this.props.showMenu
              ? { backgroundColor: '#53a5cc' }
              : { backgroundColor: 'inherit' }
          }
        >
          {/* <Dropdown overlay={menu} placement="bottomRight"> */}
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => this.props.toggleMenu()}
          >
            <Icon type="bars" className="menu-icon" id="sidebar" />
          </IconButton>
          {/* </Dropdown> */}
        </Grid>
        <Grid item xs={6} className="center-section">
          <img
            alt="a"
            src={logo}
            height="35px"
            width="100px"
            id="home"
            onClick={this.itemClick}
          />
        </Grid>
        <Grid
          item
          xs={3}
          className="right-section"
          style={
            this.props.showChat
              ? { backgroundColor: '#53a5cc' }
              : { backgroundColor: '#1991CC' }
          }
        >
          <Button
            size={'large'}
            type="primary"
            ghost
            className="button"
            onClick={() => this.props.toggleChat()}
          >
            <img src={chatIcon} alt="chat icon" height="30" id="chatbox" />
            {/* Call function for toggle */}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    deviceType: state.app.platform.deviceType,
    showChat: state.app.showChat,
    showMenu: state.app.showMenu
  };
};

const dispatchToProps = dispatch => {
  return {
    setPage: page => dispatch(actions.setPage(page)),
    toggleChat: () => dispatch(actions.toggleChat()),
    toggleMenu: () => dispatch(actions.toggleMenu())
  };
};
export default connect(stateToProps, dispatchToProps)(
  injectSheet(mHeaderNavStyle)(MHeaderNav)
);
