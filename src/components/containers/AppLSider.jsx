/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    key: 'dash',
    icon: 'png_menu_proposals',
    iconSelected: 'png_menu_proposals_selected',
    title: 'Proposal Dashboard',
  },
  {
    key: 'create',
    icon: 'png_menu_create',
    iconSelected: 'png_menu_create_selected',
    title: 'Create Proposal',
  },
  {
    key: 'news',
    icon: 'png_menu_news',
    iconSelected: 'png_menu_news_selected',
    title: 'News and Announcements',
  },
  {
    key: 'account',
    icon: 'png_menu_account',
    iconSelected: 'png_menu_account_selected',
    title: 'Account Settings',
  },
  {
    key: 'faq',
    icon: 'png_menu_faq',
    iconSelected: 'png_menu_faq_selected',
    title: 'Faq',
  },
  {
    key: 'Masternode',
    icon: 'png_menu_proposals',
    iconSelected: 'png_menu_proposals_selected',
    title: 'Masternode Setting',
  },
];

class AppLSider extends Component {
  state = {
    pageActive: 'account',
  };

  itemClick(pageActive) {
    this.setState({ pageActive });
  }

  render() {
    return (
      <div style={appLSiderStyle.wraper}>
        <SiderMenu
          menuItems={menuItems}
          active={this.state.pageActive}
          onItemClick={pageActive => this.itemClick(pageActive)}
        />
      </div>
    );
  }
}

AppLSider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(AppLSider);
