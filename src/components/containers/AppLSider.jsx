/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../redux/actions';
import { withRoot } from '../HOC';

//Import functional components
import { SiderMenu } from '../functionals';

// import Antd components
import { Layout, Menu, Icon } from 'antd';

// Styles
import { appLSiderStyle } from './styles';

//constants
const { SubMenu } = Menu;
const { Sider } = Layout;

const menuItems = [
  {
    key: 'dashBoard',
    icon: 'png_menu_proposals',
    iconSelected: 'png_menu_proposals_selected',
    title: 'Proposal Dashboard',
    showWhen: 'always',
  },
  {
    key: 'newProposal',
    icon: 'png_menu_create',
    iconSelected: 'png_menu_create_selected',
    title: 'Create Proposal',
    showWhen: 'always',
  },
  {
    key: 'news',
    icon: 'png_menu_news',
    iconSelected: 'png_menu_news_selected',
    title: 'News and Announcements',
    showWhen: 'always',
  },
  {
    key: 'userAccount',
    icon: 'png_menu_account',
    iconSelected: 'png_menu_account_selected',
    title: 'Account Settings',
    showWhen: 'login',
  },
  {
    key: 'register',
    icon: 'png_menu_register',
    iconSelected: 'png_menu_register_selected',
    title: 'Register',
    showWhen: 'logout',
  },
  {
    key: 'faq',
    icon: 'png_menu_faq',
    iconSelected: 'png_menu_faq_selected',
    title: 'Faq',
    showWhen: 'always',
  },
  {
    key: 'masterNode',
    icon: 'png_menu_masternodes',
    iconSelected: 'png_menu_masternodes_selected',
    title: 'Masternode Setting',
    showWhen: 'login',
  },
];

class AppLSider extends Component {
  itemClick(pageActive) {
    this.props.setPage(pageActive);
    this.props.toggleMenu();
  }

  render() {

    const { deviceType } = this.props;
    const style = deviceType === 'mobile' ? appLSiderStyle.mWraper : appLSiderStyle.wraper

    return (
      <div style={style}>
        <SiderMenu
          menuItems={menuItems}
          active={this.props.app.showPage}
          logged={this.props.logged}
          onItemClick={pageActive => this.itemClick(pageActive)}
          deviceType={deviceType}
        />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    logged: state.app.currentUser ? true : false,
    app: state.app,
  };
};

const dispatchToProps = dispatch => {
  return {
    setPage: page => dispatch(actions.setPage(page)),
    toggleMenu: () => dispatch(actions.toggleMenu()),
  };
};

export default connect(stateToProps, dispatchToProps)(withRoot(AppLSider));
