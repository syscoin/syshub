/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import injectSheet from 'react-jss';
import  Grid  from '@material-ui/core/Grid';
import Menu from '@material-ui/icons/Menu';
import { Button } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import actions from '../../../redux/actions';

import { mHeaderNavStyle } from '../styles';

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
    const { classes } = this.props;
    //Platform style switcher
    const chatIcon = require('../../assets/img/png_menu_chat.png');
    const logo = require('../../assets/img/png_logo_white.png');
    return (
      <Grid container className={classes.mRoot}>
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
        <IconButton aria-label="Menu" onClick={() => this.props.toggleMenu()}>
          <Menu className="menu-icon" viewBox="5 2 20 20"/>
        </IconButton>
        </Grid>
        <Grid item xs={6} className="center-section">
          <img alt="a" src={logo} id="home" onClick={this.itemClick} />
        </Grid>
        <Grid
          item
          xs={3}
          className="right-section"
          style={
            this.props.showChat ? { backgroundColor: '#53a5cc' } : { backgroundColor: '#1991CC' }
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
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
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
export default connect(stateToProps, dispatchToProps)(injectSheet(mHeaderNavStyle)(MHeaderNav));
