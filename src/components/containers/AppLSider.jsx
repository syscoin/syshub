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
    private: false,
  },
  {
    key: 'newProposal',
    icon: 'png_menu_create',
    iconSelected: 'png_menu_create_selected',
    title: 'Create Proposal',
    private: false,
  },
  {
    key: 'news',
    icon: 'png_menu_news',
    iconSelected: 'png_menu_news_selected',
    title: 'News and Announcements',
    private: false,
  },
  {
    key: 'userAccount',
    icon: 'png_menu_account',
    iconSelected: 'png_menu_account_selected',
    title: 'Account Settings',
    private: true,
  },
  {
    key: 'faq',
    icon: 'png_menu_faq',
    iconSelected: 'png_menu_faq_selected',
    title: 'Faq',
    private: false,
  },
  {
    key: 'masterNode',
    icon: 'png_menu_proposals',
    iconSelected: 'png_menu_proposals_selected',
    title: 'Masternode Setting',
    private: false,
  },
];

class AppLSider extends Component {
  state = {
    pageActive: 'account',
  };

  itemClick(pageActive) {
    this.props.setPage(pageActive);
  }

  render() {
    return (
      <div style={appLSiderStyle.wraper}>
        <SiderMenu
          menuItems={menuItems}
          active={this.props.app.showPage}
          logged={this.props.logged}
          onItemClick={pageActive => this.itemClick(pageActive)}
        />
      </div>
    );
  }
}

AppLSider.propTypes = {
  classes: PropTypes.object.isRequired,
};

const stateToProps = state => {
  return {
    logged: state.app.currentUser ? true : false,
    app: state.app,
  };
};

const dispatchToProps = dispatch => {
  return {
    setPage: page => dispatch(actions.setPage(page)),
  };
};

export default connect(stateToProps, dispatchToProps)(withRoot(AppLSider));
