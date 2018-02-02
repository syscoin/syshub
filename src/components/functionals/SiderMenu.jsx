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
    const { classes, active } = this.props;
    return (
      <div className={classes.root}>
        <SiderLogo />
        {this.props.menuItems.map((item, i) => {
          const icon = item.key === active ? item.iconSelected : item.icon;
          const txt =
            item.key === active ? classes.menuTxtActive : classes.menuTxt;
          const btnStyle =
            item.key === active ? classes.buttonActive : classes.button;
          let showMe = item.private;
          switch (item.showWhen) {
            case 'always':
              showMe = true;
              break;
            case 'login':
              showMe = this.props.logged;
              break;
            case 'logout':
              showMe = !this.props.logged;
              break;
            default:
              showMe = true;
          }
          console.log('ACZ (txt) --> ', txt);
          return showMe ? (
            <button
              key={i}
              className={btnStyle}
              onClick={() => this.tests(item.key)}
            >
              <img
                alt="a"
                src={require(`../../assets/img/${icon}.png`)}
                width="25"
              />
              <span className={txt}>{`${item.title.toUpperCase()}`}</span>
            </button>
          ) : null;
        })}
        <div className="lastBorder" /> {/*Last border*/}
        <div />
      </div>
    );
  }
}

export default injectSheet(siderMenuStyle)(SiderMenu);
