/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

// Frameworks Import
import { Menu, Icon, Button } from 'antd';

import SiderLogo from './SiderLogo';

import { siderMenuStyle } from './styles';

class SiderMenu extends Component {
  tests(pageActive) {
    this.props.onItemClick(pageActive);
  }

  render() {
    const { classes } = this.props;
    console.log('ACZ (classes) --> ', classes);
    return (
      <div className={classes.wraper}>
        <SiderLogo />
        {this.props.menuItems.map(item => {
          const icon =
            item.key === this.props.active ? item.iconSelected : item.icon;
          const txt =
            item.key === this.props.active
              ? classes.menuTxtActive
              : classes.menuTxt;
          const btnStyle =
            item.key === this.props.active
              ? classes.buttonActive
              : classes.button;
          return (
            <button
              key={item.key}
              className={btnStyle}
              onClick={() => this.tests(item.key)}
            >
              <img src={require(`../../assets/img/${icon}.png`)} width="25" />
              <span className={txt}>{`${item.title.toUpperCase()}`}</span>
            </button>
          );
        })}
        <div className={classes.lastBorder} /> {/*Last border*/}
        <div />
      </div>
    );
  }
}

export default injectSheet(siderMenuStyle)(SiderMenu);
