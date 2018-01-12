/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Menu, Icon, Button } from 'antd';

import SiderLogo from './SiderLogo';

import { siderMenuStyle } from './styles';

class SiderMenu extends Component {
  tests(pageActive) {
    this.props.onItemClick(pageActive);
  }

  render() {
    return (
      <div style={siderMenuStyle.wraper}>
        <SiderLogo />
        {this.props.menuItems.map(item => {
          const icon =
            item.key === this.props.active ? item.iconSelected : item.icon;
          const txt =
            item.key === this.props.active
              ? siderMenuStyle.menuTxtActive
              : siderMenuStyle.menuTxt;
          const btnStyle =
            item.key === this.props.active
              ? siderMenuStyle.buttonActive
              : siderMenuStyle.button;
          return (
            <button
              key={item.key}
              style={btnStyle}
              onClick={() => this.tests(item.key)}
            >
              <img src={require(`../../assets/img/${icon}.png`)} width="25" />
              <span style={txt}>{`${item.title.toUpperCase()}`}</span>
            </button>
          );
        })}
        <div style={siderMenuStyle.lastBorder} /> {/*Last border*/}
        <div />
      </div>
    );
  }
}

export default SiderMenu;
